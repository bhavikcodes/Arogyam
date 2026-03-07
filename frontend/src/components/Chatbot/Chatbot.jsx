import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hello! I am your Arogyam Assistant. How can I help you with your health today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Create a simplified history to send to backend (excluding the current user message)
      const historyMsg = messages.map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      const response = await axios.post("http://localhost:3000/api/chat", {
        message: userMsg,
        history: historyMsg,
      });

      setMessages([
        ...newMessages,
        { role: "model", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "model",
          text: "Sorry, I am having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[550px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[650px] max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-5 flex justify-between items-center shadow-md pb-6 rounded-t-2xl">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2.5 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-base leading-tight">
                    Arogyam Assistant
                  </h3>
                  <p className="text-blue-100 text-[11px] mt-0.5">
                    Online & ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="hover:bg-blue-700 p-2 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-end space-x-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}
                    >
                      {msg.role === "user" ? (
                        <User size={20} />
                      ) : (
                        <Bot size={20} />
                      )}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                      }`}
                    >
                      <div className="text-[13px] leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-strong:font-bold prose-strong:text-inherit">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                    <div className="bg-white p-4 py-5 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex space-x-2 items-center">
                      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t border-gray-100"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-full pl-5 pr-14 py-3.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2.5 p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className={`${isOpen ? "hidden" : "flex"} items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
};

export default Chatbot;
