import { useState, useRef, useEffect } from "react";
import { X, Send, Mic, Volume2, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function MessageCircle({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

export function AIChatbot({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am your AI Health Assistant. Please describe your symptoms, and I will help you understand them better.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Mock AI response - In production, this would call Google Gemini API
    setTimeout(() => {
      const mockResponse = generateMockResponse(input);
      const assistantMessage = { role: "assistant", content: mockResponse };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("fever") ||
      lowerInput.includes("बुखार") ||
      lowerInput.includes("ताप")
    ) {
      return `Based on your symptoms of fever, here are some recommendations:

1. Monitor your temperature regularly
2. Stay hydrated - drink plenty of water
3. Rest adequately
4. Take paracetamol if temperature exceeds 100°F
5. If fever persists for more than 3 days, please visit a nearby health camp

Would you like me to help you find nearby health camps or report this case?`;
    } else if (
      lowerInput.includes("cough") ||
      lowerInput.includes("खांसी") ||
      lowerInput.includes("खोकला")
    ) {
      return `For cough symptoms, I recommend:

1. Stay hydrated with warm liquids
2. Avoid cold beverages
3. Use steam inhalation
4. Get adequate rest
5. If cough persists for more than a week or is accompanied by blood, seek immediate medical attention

I can help you create a case or find nearby medical camps. What would you prefer?`;
    } else if (
      lowerInput.includes("headache") ||
      lowerInput.includes("सिरदर्द") ||
      lowerInput.includes("डोकेदुखी")
    ) {
      return `For headache relief:

1. Rest in a quiet, dark room
2. Stay hydrated
3. Apply cold compress on forehead
4. Avoid screen time
5. If headache is severe or accompanied by vision problems, seek immediate medical attention

Would you like me to log this symptom or find a nearby health facility?`;
    } else {
      return `Thank you for sharing your symptoms. To better assist you, I recommend:

1. Creating a detailed case with all your symptoms
2. Visiting a nearby government health camp for proper diagnosis
3. Maintaining a health record for tracking

Please note: This is for informational purposes only. Always consult with healthcare professionals for proper diagnosis and treatment.

API Integration Note: Connect with Google Gemini API key in production for advanced symptom analysis.`;
    }
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    // Mock voice recognition - In production, use Web Speech API
    setTimeout(() => {
      setInput("Sample voice input: I have fever and headache");
      setIsListening(false);
    }, 2000);
  };

  const speakResponse = (text) => {
    setIsSpeaking(true);
    // Mock text-to-speech - In production, use Web Speech API with language support
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      language === "en"
        ? "en-US"
        : language === "hi"
          ? "hi-IN"
          : language === "mr"
            ? "mr-IN"
            : language === "gu"
              ? "gu-IN"
              : "ta-IN";
    utterance.onend = () => setIsSpeaking(false);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-green-600 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{t("aiChatbot")}</h3>
              <p className="text-sm text-blue-100">Powered by Google Gemini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                {message.role === "assistant" && (
                  <button
                    onClick={() => speakResponse(message.content)}
                    disabled={isSpeaking}
                    className="mt-2 flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={startVoiceRecognition}
              disabled={isListening}
              className={`p-3 rounded-lg transition-colors ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Describe your symptoms..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Note: Connect your Google Gemini API key in production for real-time
            AI analysis
          </p>
        </div>
      </div>
    </div>
  );
}
