import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoSearch, IoSend } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";
import PageHeading from "../../shared/PageHeading";
function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! Finally found the time to write to you:) I need your help in creating interactive animations for my mobile application.",
      sender: "contact",
      timestamp: "4 days ago",
    },
    {
      id: "2",
      content: "Can I send you files?",
      sender: "contact",
      timestamp: "4 days ago",
    },
    {
      id: "3",
      content: "Hey! Okay, send out.",
      sender: "user",
      timestamp: "4 days ago",
    },
    {
      id: "4",
      content: "",
      sender: "contact",
      timestamp: "4 days ago",
      file: {
        name: "Style.zip",
        size: "41.36 MB",
      },
    },
    {
      id: "5",
      content:
        "Hello! I tweaked everything you asked. I am sending the finished file.",
      sender: "user",
      timestamp: "3 days ago",
      file: {
        name: "NEW_Style.zip",
        size: "52.05 MB",
      },
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          content: input,
          sender: "user",
          timestamp: "Just now",
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Support" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-orange-500 py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
          />
          <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>
      <div className="flex h-screen max-w-xl flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://avatar.iran.liara.run/public/20"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />

            <div>
              <h2 className="font-medium">Nika Jerrardo</h2>
              <p className="text-xs text-orange-500">last online 5 hours ago</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "contact" && (
                  <div className="mr-2 mt-1">
                    <img
                      src="https://avatar.iran.liara.run/public/21"
                      alt="Contact"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="max-w-[70%]">
                  <div
                    className={`relative rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-white text-gray-800"
                        : "bg-orange-400 text-white"
                    }`}
                  >
                    {message.content && <p>{message.content}</p>}

                    {message.file && (
                      <div
                        className={`mt-2 flex items-center rounded-md ${
                          message.sender === "user"
                            ? "bg-gray-100"
                            : "bg-orange-300"
                        } p-2`}
                      >
                        <LuFileText className="mr-2 h-5 w-5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {message.file.name}
                          </p>
                          <p className="text-xs">{message.file.size}</p>
                        </div>
                        {message.sender === "user" && (
                          <div className="ml-2 rounded-full bg-white p-1">
                            <FaCheck className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      className="absolute -right-10 top-0 h-8 w-8 text-gray-400"
                      style={{ background: "none", border: "none" }}
                    >
                      <FiMoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 text-right text-xs text-gray-500">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message here"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              className="h-10 w-10 rounded-full bg-orange-400 text-white hover:bg-orange-500"
            >
              <IoSend className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
