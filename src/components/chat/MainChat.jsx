"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaRegTrashCan,
  FaMicrophoneLines,
  FaPaperPlane,
  FaDownload,
} from "react-icons/fa6";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
function MainChat(props) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);

  useEffect(() => {
    if (props?.freqPrompt) {
      inputRef.current.value = props?.freqPrompt;
      btnRef.current?.click();
    }
  }, [props?.freqPrompt]);
  useEffect(() => {
    setIsStreaming(false);
    setLoading(false);
    setMessageList([]);
    const historyData = sessionStorage.getItem(`messages${props.docId}`);
    if (historyData) {
      const parseData = JSON.parse(historyData);
      setMessageList(parseData);
    } else {
      setMessageList([]);
    }
  }, [props.docId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messageList]);

  const clearChat = () => {
    setMessageList([]);
    sessionStorage.setItem(`messages${props.docId}`, [[]]);
  };

  const handleMessage = async (e) => {
    setLoading(true);
    setIsStreaming(true);
    e.preventDefault();
    const userMessage = e.target.message.value;
    e.target.message.value = "";
    const messageId = Date.now();
    setStreamingMessageId(messageId);
    const newMessage = {
      id: messageId,
      userMessage,
      response: null,
    };
    setMessageList([...messageList, newMessage]);
    sessionStorage.setItem(
      `messages${props.docId}`,
      JSON.stringify([...messageList, newMessage])
    );

    const response = await fetchBackendResponse(userMessage);
    const updatedMessage = { userMessage, response };
    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, response } : msg
      )
    );
    const historyData = sessionStorage.getItem(`messages${props.docId}`);
    if (historyData) {
      const parseData = JSON.parse(historyData);

      sessionStorage.setItem(
        `messages${props.docId}`,
        JSON.stringify(
          parseData?.map((msg) =>
            msg.id === messageId ? { ...msg, response } : msg
          )
        )
      );
    }
    setLoading(false);
  };

  const fetchBackendResponse = async (message) => {
    try {
      const response = await fetch(`${BASEURL}/ask`, {
        body: JSON.stringify({
          prompt: message,
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response?.json();
      if (!response.ok && !data?.detail?.status) {
        throw new Error(data?.detail?.message || "Network response was not ok");
      }

      let result = data;
      if (result?.llm2_response) {
        const cleanedText = result?.llm2_response?.replace(/^"|"$/g, "");
        // const parsedText = JSON.parse(cleanedText);
        result = { ...result, llm2_response: cleanedText };
      }
      if (result?.table) {
        const cleanedTable = result?.table
          .replace(/^"|"$/g, "") // Remove the outer double quotes
          .replace(/\\"/g, '"') // Replace escaped double quotes with regular quotes
          .replace(/\\n/g, ""); // Remove new line characters

        const parsedTable = JSON.parse(cleanedTable);

        result = {
          ...result,
          table: parsedTable,
        };
      }
      if (
        result?.success === "image generated successfully" ||
        result?.llm2_response?.success === "image generated successfully"
      ) {
        const res = await getImage();
        return res;
      } else {
        return result;
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
        theme: "colored",
        autoClose: 5000,
      });
      return { llm2_response: "Sorry, something went wrong." };
    }
  };

  const convertResponseToArray = (table) => {
    return Object.entries(table).map(([key, value]) => ({
      " ": key,
      "": value,
    }));
  };

  const getImage = async () => {
    try {
      const response = await fetch(`${BASEURL}/get_plot`);
      const data = await response?.json();
      if (!response.ok && !data?.detail?.status) {
        throw new Error(data?.detail?.message || "Network response was not ok");
      }
      return data;
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
        theme: "colored",
        autoClose: 5000,
      });
    }
  };

  const renderResponse = (response, id) => {
    if (response) {
      let updatedTable = [];
      // if (props.chatType === 'chatgene' && typeof response !== "object" ) {
      //   return (
      //     <div className="rtl bg-indigo-200 text-white p-4 rounded-[10px] w-fit max-w-[100%] md:max-w-[50%]">
      //       {(isStreaming && id === streamingMessageId) ? <StreamingResponse response={response} /> : <p>{response}</p>}
      //     </div>
      //   );
      // }
      if (response.table && Object.keys(response.table).length === 0) {
        return (
          <div className="bg-indigo-200 p-3 rounded-[10px] w-fit max-w-[50%]">
            <p className="font-medium text-white ps-3">
              No relevant data was returned. Please refine your request.
            </p>
          </div>
        );
      } else if (response.table && response.table !== "None") {
        if (!Array.isArray(response?.table)) {
          updatedTable = convertResponseToArray(response?.table);
        } else {
          updatedTable = response.table;
        }
        return (
          <div className="bg-indigo-200 text-gray-900 p-4 rounded-lg w-full max-w-[100%] md:max-w-[50%] h-[50%] overflow-hidden">
            <div className="overflow-auto max-h-[40vh] rounded-lg table-container">
              <table className="min-w-full divide-y divide-gray-300 border  border-gray-300">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    {updatedTable.length !== 0 &&
                      Object.keys(updatedTable[0])?.map((column, index) =>
                        column.trim() ? (
                          <th
                            className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b border-e border-indigo-200 bg-white text-black-600 sticky top-[-1%] z-10 whitespace-nowrap"
                            key={index}
                          >
                            {" "}
                            {column}{" "}
                          </th>
                        ) : null
                      )}
                  </tr>
                </thead>
                <tbody className="bg-gray-600 divide-y divide-gray-300">
                  {updatedTable.length !== 0 &&
                    updatedTable?.map((item, index) => (
                      <tr key={index}>
                        {Object.keys(updatedTable[0])?.map(
                          (column, colIndex) => (
                            <td
                              className="px-4 py-2 whitespace-nowrap text-sm text-white border-e border-b border-gray-300"
                              key={colIndex}
                            >
                              {item[column]}{" "}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-white">{response.llm2_response}</p>
          </div>
        );
      } else if (response.image) {
        return (
          <div className="bg-indigo-200 text-white p-4 rounded-[10px] w-fit max-w-[100%] md:max-w-[50%] relative group">
            <Image
              src={`data:image/png;base64,${response.image}`}
              alt="Generated Image"
              layout="responsive"
              width={100}
              height={75}
              style={{ marginRight: "12px" }}
              className="w-full h-auto rounded-lg"
            />
            <a
              href={`data:image/png;base64,${response.image}`}
              download="generated-image.png"
              className="absolute top-2 right-2 bg-black rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-700 transform scale-0 group-hover:scale-110"
            >
              <FaDownload className="text-white text-xl" />
            </a>
            <p className="mt-3">{response.llm2_response}</p>
          </div>
        );
      } else if (response.llm2_response) {
        return (
          <div className="bg-indigo-200 text-white p-4 rounded-[10px] w-fit max-w-[100%] md:max-w-[50%]">
            <p>{String(response.llm2_response)}</p>
            <p className="font-medium font-bold text-black-300 ps-3">
              <Markdown
                options={{
                  forceBlock: true, // Ensures that newlines are respected
                  overrides: {
                    p: {
                      props: {
                        className: "mb-3", // Adds margin between paragraphs
                      },
                    },
                    ol: {
                      props: {
                        className: "list-decimal pl-5", // Ensures proper ordered list styling
                      },
                    },
                    ul: { props: { className: "list-disc pl-5" } }, // Properly style unordered lists
                    strong: {
                      props: {
                        className: "font-bold", // Ensures bold text is rendered correctly
                      },
                    },
                  },
                }}
              >
                {response.text && response.text !== "None"
                  ? String(response.text)
                  : ""}
              </Markdown>
            </p>
          </div>
        );
      } else {
        return (
          <div className="bg-indigo-200 p-3 rounded-[10px] w-fit max-w-[50%]">
            {response === "" ? (
              <p className="font-medium font-bold text-black-300 ps-3">
                No results found for your request.{" "}
              </p>
            ) : (
              <Markdown>{response && response}</Markdown>
            )}
          </div>
        );
      }
    }
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
        />
      </div>

      {/* Message List */}
      {messageList?.length > 0 ? (
        <div className="relative z-10 min-h-[85%] max-h-[85%] pt-3">
          <div className="chat-box flex flex-col gap-5 max-w-[90vw] md:max-w-[80vw] h-full  overflow-y-auto">
            {messageList?.map((message, index) => (
              <div key={index} className="w-full max-w-[100%]">
                <div className="w-full">
                  <p className="p-3 bg-gray-700 text-gray-200 text-[14px] md:text-[15px] rounded-[10px] w-fit max-w-[100%] md:max-w-[50%] min-w-[20%]">
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
                    renderResponse(message.response, message.id)
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
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaPaperPlane className="text-white cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainChat;
