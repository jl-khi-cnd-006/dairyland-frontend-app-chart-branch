"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaRegTrashCan,
  FaMicrophoneLines,
  FaPaperPlane,
  FaDownload,
  FaChartPie,
  FaChartBar,
  FaChartLine,
  FaTable,
} from "react-icons/fa6";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import LineChart from "../chart/LineChart";
import TableChart from "../chart/TableChart";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
function MainChat(props) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (props?.freqPrompt) {
      inputRef.current.value = props?.freqPrompt;
      btnRef.current?.click();
    }
  }, [props?.freqPrompt]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const historyData = sessionStorage.getItem(`messages${props.docId}`);
      if (historyData) {
        setMessageList(JSON.parse(historyData));
      }
    }
  }, [props.docId]);

  useEffect(() => {
    if (chatEndRef.current) {
      // Scroll only if the last message has changed
      const lastMessage = messageList[messageList.length - 1];
      if (lastMessage?.response === null || messageList.length === 1) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messageList]);

  const clearChat = () => {
    setMessageList([]);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`messages${props.docId}`, JSON.stringify([]));
    }
    setView(null);
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userMessage = e.target.message.value;
    e.target.message.value = "";

    const newMessage = {
      id: crypto.randomUUID(),
      userMessage,
      response: null,
      view: "default",
    };
    setMessageList((prev) => [...prev, newMessage]);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `messages${props.docId}`,
        JSON.stringify([...messageList, newMessage])
      );
    }

    const response = await fetchBackendResponse(userMessage);

    // console.log("response after fetching", response);
    setViewDynamically(response);

    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === newMessage.id
          ? {
              ...msg,
              response,
              view: response.pie
                ? "pie"
                : response.bar
                ? "bar"
                : response.table
                ? "table"
                : "default",
            }
          : msg
      )
    );

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `messages${props.docId}`,
        JSON.stringify(
          messageList.map((msg) =>
            msg.id === newMessage.id ? { ...msg, response } : msg
          )
        )
      );
    }
    setLoading(false);
  };

  const fetchBackendResponse = async (message) => {
    try {
      const response = await fetch(`${BASEURL}/ask`, {
        body: JSON.stringify({ prompt: message }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail?.message || "Network response was not ok");
      }
      // console.log("data", data);
      return data;
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
        theme: "colored",
        autoClose: 5000,
      });
      return { answer: "Sorry, something went wrong." };
    }
  };

  const setViewDynamically = (response, messageId) => {
    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              view: response?.pie
                ? "pie"
                : response?.bar
                ? "bar"
                : response?.table
                ? "table"
                : "default",
            }
          : msg
      )
    );
    setView(
      response?.pie
        ? "pie"
        : response?.bar
        ? "bar"
        : response?.table
        ? "table"
        : "default"
    );
  };

  const handleViewChange = (messageId, newView) => {
    console.log("veiw", newView);
    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, view: newView } : msg
      )
    );
  };

  const renderResponse = (message) => {
    const response = message.response;
    // console.log("res", response);
    if (!response || response === "") {
      return (
        <p className="bg-indigo-200 p-3 rounded-[10px] text-white">
          No results found for your request.
        </p>
      );
    }

    if (typeof response === "string" || response.answer) {
      return (
        <p className="bg-indigo-200 text-white p-4 rounded-[10px] w-fit max-w-[100%] md:max-w-[45%] min-w-[20%]">
          {response.answer}
        </p>
      );
    }

    let chartData;

    if (response.pie || response.bar || response.table) {
      chartData = response.pie || response.bar || response.table;
      // console.log(chartData)
    }

    return (
      <div className="bg-[#679ebf] bg-opacity-60 px-4 py-4 rounded-[10px] md:w-[45%] w-[80%]">
        <div
          className={`${
            message.view === "table" ? "" : "bg-white"
          } text-black p-1 rounded-[10px] relative` }
        >
          <div
            className={` flex gap-2 justify-start w-full   ${
              message.view === "table" ? "text-gray-200" : "text-gray-300"
            }`}
          >
            <FaChartPie
              title="show pie chart"
              onClick={() => handleViewChange(message.id, "pie")}
              className={`cursor-pointer ${
                message.view === "pie" ? "text-blue-600" : ""
              } hover:text-gray-500 ${
                (response.table || response.bar) && "hidden"
              }`}
            />
            <FaChartBar
              title="show bar chart"
              onClick={() => handleViewChange(message.id, "bar")}
              className={`cursor-pointer ${
                message.view === "bar" ? "text-blue-600" : ""
              } hover:text-gray-500`}
            />

            <FaTable
              title="show table"
              onClick={() => handleViewChange(message.id, "table")}
              className={`cursor-pointer ${
                message.view === "table" ? "text-blue-200" : ""
              } hover:text-gray-500`}
            />
          </div>

          {/* Render the selected chart */}
          {message.view === "pie" ? (
            <PieChart data={chartData.data} labels={chartData.columns} />
          ) : message.view === "bar" ? (
            <div className="">
              <BarChart
                response={chartData}
                isBar={response.bar || response.pie}
              />
            </div>
          ) : (
            message.view === "table" && (
              <TableChart data={chartData} view={response.table} />
            )
          )}

          <p className="mt-3">{response.llm2_response}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-[92%] md:min-w-[92%] max-w-[92%] md:max-w-[92%] lg:min-w-[80%] md:max-w-[80%] h-full px-[10px] md:px-[30px] py-[10px] md:py-[30px] bg-black-600 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="top-bar flex pb-3 px-5 justify-between items-center border-b-[1px] border-white-100 min-h-[7%] max-h-[7%]">
        <h1 className="text-[14px] md:text-[20px] font-bold text-white">
          Ask Anything About Your
          <span className="text-indigo-200"> Uploaded Doc</span>
        </h1>
        <FaRegTrashCan
          className={`text-white text-[30px] md:text-[40px] bg-gray-700 p-2 rounded-[7px] ${
            messageList?.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={messageList?.length === 0}
          onClick={() => clearChat()}
          title="delete chats"
        />
      </div>

      {/* Message List */}
      {messageList?.length > 0 ? (
        <div className="relative z-10 min-h-[85%] max-h-[85%] pt-3">
          <div className="chat-box flex flex-col gap-5 max-w-[90vw] md:max-w-[80vw] h-full  overflow-y-auto">
            {messageList?.map((message, index) => (
              <div key={index} className="w-full max-w-[100%]">
                <div className="w-full">
                  <p className="p-3 bg-gray-700 text-gray-200 text-[14px] md:text-[15px] rounded-[10px] w-fit max-w-[100%] md:max-w-[45%] min-w-[20%]">
                    {message.userMessage}
                  </p>
                </div>
                <div className="flex justify-end m-2">
                  {message.response === null ? (
                    <div className="bg-indigo-200 p-3 rounded-[10px] w-fit max-w-[100%] md:max-w-[50%]">
                      <BeatLoader
                        size={10}
                        color="#000000"
                        className="bg-transparent w-full"
                      />
                    </div>
                  ) : (
                    renderResponse(message)
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
            <Image
              width={400}
              height={400}
              src={`/assets/images/Chatgene.png`}
              alt="chat-bg"
              className="absolute inset-0 m-auto opacity-[10%] z-[-10] pointer-events-none"
            />
          </div>
        </div>
      ) : (
        <div className="chat-box flex flex-col justify-center items-center h-[50vh] md:h-[60vh] gap-5 ">
          <Image
            width={300}
            height={300}
            src={`/assets/images/Chatgene.png`}
            alt="chat-bg"
            className="w-[250px] md:w-[350px] h-auto filter grayscale"
          />
          <p className="text-indigo-200 text-[16px] md:text-[18px] text-center">
            Model is trained based on uploaded document <br /> Now ask anything
          </p>
        </div>
      )}

      {/* Chat Footer */}
      <div className="chat-footer mt-3 min-h-[7%] max-h-[7%] w-full flex items-center">
        <form
          onSubmit={handleMessage}
          className="flex justify-between items-center gap-2 md:gap-3 w-full"
        >
          <div className="flex justify-between items-center w-full bg-gray-700 p-2 md:p-3 rounded-[7px] text-white gap-2">
            <input
              name="message"
              ref={inputRef}
              disabled={loading}
              className={`w-full text-white bg-transparent focus:outline-none ${
                loading ? " cursor-not-allowed" : ""
              }`}
              placeholder="Ask Anything"
              autoComplete="off"
              required
            />
            <FaMicrophoneLines
              className={`text-gray-800 cursor-pointer ${
                loading ? "text-gray-500" : ""
              }`}
            />
          </div>
          <button
            type="submit"
            ref={btnRef}
            disabled={loading}
            className={`bg-indigo-200 p-3 md:p-4 rounded-[7px] ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <FaPaperPlane className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainChat;