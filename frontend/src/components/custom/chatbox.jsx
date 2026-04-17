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
    <div className="flex flex-col  bg-gray-50 font-inter">
      <div className="flex flex-col h-[70vh] w-full max-w-2xl mx-auto border border-gray-200 rounded-2xl shadow-lg bg-white">
        <header className="p-5 border-b border-gray-200 bg-white rounded-t-2xl">
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
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
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
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
          className="p-5 border-t border-gray-200 flex items-center gap-2 bg-white rounded-b-2xl"
        >
          <AIInput
            className="flex-1 px-4 py-2 text-gray-700"
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
