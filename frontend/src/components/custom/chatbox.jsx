import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Spinner from "./Spinner";
import AIButton from "./AIButton";
import AIInput from "./AIInput";
import Cookies from "js-cookie";
import { apiUrl } from "@/lib/api";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you today?" },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    const token = Cookies.get("token");
    e.preventDefault();
    setLoading(true);
    if (input.trim() === "") return;
    const newMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      const response = await axios.post(
        `${apiUrl}/api/talkToAI`,
        {
          prompt: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newAIResponse = { sender: "ai", text: response.data.output };
      setMessages((prev) => [...prev, newAIResponse]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col bg-slate-50 font-inter dark:bg-transparent">
      <div className="mx-auto flex h-[70vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-950">
        <header className="rounded-t-2xl border-b border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            AI Assistant
          </h1>
        </header>

        {/* Message Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && <Spinner />}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 rounded-b-2xl border-t border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
        >
          <AIInput
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <AIButton
            type="submit"
            className="bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            Send
          </AIButton>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
