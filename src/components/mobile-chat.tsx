"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MobileChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME_MESSAGE = `Hello! I'm Artie, your AI art assistant at Alternus Gallery. I can help you with:

• Discovering artworks and artists
• Learning about art styles and techniques
• Finding the perfect piece for your space
• Getting recommendations based on your taste

How can I assist you today?`;

const AI_RESPONSES: { [key: string]: string } = {
  default: "That's an interesting question! At Alternus Gallery, we specialize in connecting art lovers with talented artists from around the world. Is there something specific about our collection or artists you'd like to know?",
  greeting: "Hello! Welcome to Alternus Gallery. I'm Artie, your AI art assistant. How can I help you explore the world of art today?",
  about: "Alternus Gallery is a premium online art marketplace that connects collectors with talented artists worldwide. We feature original paintings, prints, and commissioned works across various styles - from contemporary abstract to classical realism.",
  artists: "We have a diverse community of talented artists at Alternus! Each artist goes through a careful selection process to ensure quality. You can browse artist profiles in our Gallery section.",
  buy: "Buying art at Alternus is simple and secure! Browse our Gallery, find a piece you love, and add it to your cart. We offer secure checkout with multiple payment methods.",
  commission: "Yes! Many of our artists accept custom commissions. You can contact them directly through their profile page.",
  shipping: "We ship worldwide! Artworks are carefully packaged with protective materials. Orders over $100 qualify for free shipping.",
  returns: "We offer a 14-day return policy for most items. The artwork must be in its original condition.",
  styles: "Alternus features Abstract, Contemporary, Impressionism, Realism, Minimalist, and Pop Art styles. Use our filters to explore!",
  price: "Our artworks range from affordable prints starting at around $50 to original masterpieces. Use the price filter in our Gallery.",
  contact: "You can reach us at support@alternusart.com or through our Contact page. We typically respond within 24 hours.",
  recommend: "I'd love to help! What style appeals to you? What colors and size are you looking for?",
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return AI_RESPONSES.greeting;
  }
  if (lowerMessage.includes("about") || lowerMessage.includes("what is alternus")) {
    return AI_RESPONSES.about;
  }
  if (lowerMessage.includes("artist")) {
    return AI_RESPONSES.artists;
  }
  if (lowerMessage.includes("buy") || lowerMessage.includes("purchase") || lowerMessage.includes("order")) {
    return AI_RESPONSES.buy;
  }
  if (lowerMessage.includes("commission") || lowerMessage.includes("custom")) {
    return AI_RESPONSES.commission;
  }
  if (lowerMessage.includes("ship") || lowerMessage.includes("delivery")) {
    return AI_RESPONSES.shipping;
  }
  if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
    return AI_RESPONSES.returns;
  }
  if (lowerMessage.includes("style") || lowerMessage.includes("type")) {
    return AI_RESPONSES.styles;
  }
  if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return AI_RESPONSES.price;
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("email")) {
    return AI_RESPONSES.contact;
  }
  if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest") || lowerMessage.includes("find")) {
    return AI_RESPONSES.recommend;
  }
  if (lowerMessage.includes("thank")) {
    return "You're welcome! Feel free to ask if you have any other questions!";
  }
  if (lowerMessage.includes("bye")) {
    return "Goodbye! Thank you for visiting Alternus Gallery. Happy collecting!";
  }

  return AI_RESPONSES.default;
}

export function MobileChat({ isOpen, onClose }: MobileChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What is Alternus?",
    "How do I buy art?",
    "Shipping info",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Full Screen Chat Container */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 flex flex-col">
        {/* Header - Fixed */}
        <header className="flex-shrink-0 bg-gray-900 px-4 py-3 flex items-center justify-between safe-area-top">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=artie&backgroundColor=transparent"
                  alt="Artie AI"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Artie</h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 active:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        {/* Messages - Scrollable */}
        <main className="flex-1 overflow-y-auto overscroll-contain bg-gray-100 dark:bg-gray-800">
          <div className="p-4 space-y-3 min-h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-gray-900 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-[10px] mt-1.5 ${message.role === "user" ? "text-white/50" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="flex-shrink-0 px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => {
                    const userMessage: Message = {
                      id: Date.now().toString(),
                      role: "user",
                      content: question,
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, userMessage]);
                    setIsTyping(true);
                    setTimeout(() => {
                      const response = getAIResponse(question);
                      const assistantMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: response,
                        timestamp: new Date(),
                      };
                      setMessages((prev) => [...prev, assistantMessage]);
                      setIsTyping(false);
                    }, 800);
                  }}
                  className="flex-shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 active:bg-gray-200 rounded-full text-xs text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input - Fixed at bottom */}
        <footer className="flex-shrink-0 p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 bg-gray-900 active:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
