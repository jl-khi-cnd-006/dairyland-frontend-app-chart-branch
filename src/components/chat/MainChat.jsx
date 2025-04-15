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
  FaBars,
} from "react-icons/fa6";
import { HiOutlineBars3 } from "react-icons/hi2";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import LineChart from "../chart/LineChart";
import TableChart from "../chart/TableChart";
import Button from "../themeToggle/Button";
import { useTheme } from "next-themes";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
function MainChat(props) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [view, setView] = useState(null);
  const [openDownloadDropdown, setOpenDownloadDropdown] = useState(false);
  const { theme } = useTheme();
  const prevMessageCountRef = useRef(0);
  const prevLastMessageIdRef = useRef(null);
  const prevLastResponseRef = useRef(null);

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
    const prevCount = prevMessageCountRef.current;
    const currentCount = messageList.length;
    const lastMessage = messageList[messageList.length - 1];

    const lastId = lastMessage?.id;
    const lastResponse = lastMessage?.response;

    const shouldScroll =
      // New message added
      currentCount > prevCount ||
      // Response updated (but same message id)
      (lastId === prevLastMessageIdRef.current &&
        lastResponse !== prevLastResponseRef.current);

    if (shouldScroll && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Update refs
    prevMessageCountRef.current = currentCount;
    prevLastMessageIdRef.current = lastId;
    prevLastResponseRef.current = lastResponse;
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
    // console.log("veiw", newView);
    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, view: newView } : msg
      )
    );
  };

  const handleDownloadTable = (messageId) => {
    setOpenDownloadDropdown(!openDownloadDropdown);
    setMessageId(messageId);
  };

  const generateRandomFilename = () => {
    return Math.random().toString(36).substring(2, 10); // Extracts 8 random lowercase letters
  };

  const handleDownloadCSV = (message) => {
    // console.log(message.columns);
    setOpenDownloadDropdown(false);
    if (!message.data.length) return;

    const csvHeaders = message.columns.join(",");
    const csvRows = message.data.map((row) => Object.values(row).join(","));
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${generateRandomFilename()}.csv`; // Set random filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    }

    return (
      <div className="bg-[#679ebf] bg-opacity-60 px-4 py-4 rounded-[10px] md:w-[45%] w-[80%]">
        <div
          className={`${
            message.view === "table" ? "" : "bg-white"
          } text-black p-1 rounded-[10px] relative`}
        >
          <div
            className={` flex items-center justify-between w-full   ${
              message.view === "table" ? "dark:text-gray-200 text-[#e6edf5]" : "text-gray-300"
            }`}
          >
            <div className="flex gap-2 w-full">
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
                  message.view === "table" ? "dark:text-blue-200 text-blue-500" : ""
                } hover:text-gray-500`}
              />
            </div>
            {/* <div className="relative w-full flex justify-end">
              {message.view === "table" && (
                <FaBars
                  className="cursor-pointer"
                  title="Menu"
                  onClick={() => handleDownloadTable(message.id)}
                />
              )}
              {message.view === "table" &&
                openDownloadDropdown &&
                message.id == messageId && (
                  <div className=" absolute top-[20px] right-2 z-50 bg-white text-gray-600 text-[12px] rounded-sm">
                    <ul className="*:px-3">
                      <li
                        className=" py-2 cursor-pointer"
                        title="Download CSV"
                        onClick={() =>
                          handleDownloadCSV(message.response.table)
                        }
                      >
                        Download CSV
                      </li>
                      <li className=" pb-2 cursor-pointer" title="Download PDF">
                        Download PDF
                      </li>
                    </ul>
                  </div>
                )}
            </div> */}
          </div>

          {/* Render the selected chart */}
          {message.view === "pie" ? (
            <PieChart data={chartData.data} labels={chartData.columns} />
          ) : message.view === "bar" ? (
            <BarChart
              response={chartData}
              isBar={response.bar || response.pie}
            />
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
    <div className="min-w-[92%] md:min-w-[92%] max-w-[92%] lg:min-w-[80%] md:max-w-[80%] h-full px-[10px] md:px-[30px] py-[10px] md:py-[30px] dark:bg-black-600 bg-[#d0cfcfe3] flex flex-col justify-between">
      {/* Top Bar */}
      <div className="top-bar flex pb-3 px-5 justify-between items-center border-b-[1px] dark:border-white-100 border-gray-300  min-h-[7%] max-h-[7%]">
        <h1 className="text-[14px] md:text-[20px] font-bold dark:text-white text-gray-600">
          Ask Anything About Your
          <span className="text-indigo-200"> Uploaded Doc</span>
        </h1>
        <div className="flex gap-4 items-center">
          <Button />
          <FaRegTrashCan
            className={`dark:text-white text-[30px] md:text-[40px] dark:bg-gray-600 bg-[#eeebe8] text-gray-100 p-2 rounded-[7px] ${
              messageList?.length === 0 ? "hidden" : "cursor-pointer"
            }`}
            disabled={messageList?.length === 0}
            onClick={() => clearChat()}
            title="delete chats"
          />
        </div>
      </div>

      {/* Message List */}
      {messageList?.length > 0 ? (
        <div className="relative z-10 min-h-[85%] max-h-[85%] pt-3">
          <div className="chat-box flex flex-col gap-5 max-w-[90vw] md:max-w-[80vw] h-full  overflow-y-auto">
            {messageList?.map((message, index) => (
              <div key={index} className="w-full max-w-[100%]">
                <div className="w-full">
                  <p className="p-3 dark:bg-gray-700 bg-[#eeebe8] dark:text-gray-200 text-[14px] md:text-[15px] rounded-[10px] w-fit max-w-[100%] md:max-w-[45%] min-w-[20%]">
                    {message.userMessage}
                  </p>
                </div>
                <div className="flex justify-end m-2">
                  {message.response === null ? (
                    <div className="bg-indigo-200 p-3 rounded-[10px] w-fit max-w-[100%] md:max-w-[50%]">
                      <BeatLoader
                        size={10}
                        color={theme === "dark" ? "#000000" : "#ffffff"}
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
            className="w-[250px] md:w-[350px] h-auto filter dark:grayscale dark:opacity-50 "
          />
          <p className="text-indigo-200 text-[16px] md:text-[18px] text-center">
            Model is trained based on uploaded document <br /> Now ask anything
          </p>
        </div>
      )}

      {/* Chat Footer */}
      <div className="chat-footer mt-3  w-full flex items-center">
        <form
          onSubmit={handleMessage}
          className="flex justify-between items-center gap-2 md:gap-3 w-full"
        >
          <div className="flex justify-between items-center w-full dark:bg-gray-700 bg-[#eeebe8] dark:border-0 border border-gray-400 focus-within:border-gray-100 px-2 md:px-3 rounded-[7px] text-white gap-2 transition-colors duration-200">
            <textarea
              name="message"
              ref={inputRef}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form.requestSubmit();
                }
              }}
              className={`placeholder-gray-500 dark:placeholder-gray-100 w-full resize-none overflow-y-auto dark:text-white pt-2 text-black bg-transparent focus:outline-none dark:caret-gray-400 caret-indigo-200
  min-h-[24px] max-h-[90px] ${loading ? "cursor-not-allowed" : ""}`}
              placeholder="Ask Anything..."
              autoComplete="off"
              required
            />
            {/* <FaMicrophoneLines
              title="record"
              size={20}
              className={`text-gray-800 cursor-pointer dark:hover:text-blue-300 hover:text-gray-500 ${
                loading ? "text-gray-500" : ""
              }`}
            /> */}
          </div>

          <button
            type="submit"
            ref={btnRef}
            disabled={loading}
            className={`bg-indigo-200 p-3 md:p-[18px] rounded-[7px] ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <FaPaperPlane className="text-white" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainChat;
