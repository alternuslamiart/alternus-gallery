"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE = `Hello! I'm Artie, your AI art assistant at Alternus Gallery. I can help you with:

- Discovering artworks and artists
- Learning about art styles and techniques
- Finding the perfect piece for your space
- Understanding art history and movements
- Getting recommendations based on your taste

How can I assist you today?`;

const AI_RESPONSES: { [key: string]: string } = {
  default: "That's an interesting question! At Alternus Gallery, we specialize in connecting art lovers with talented artists from around the world. Is there something specific about our collection or artists you'd like to know?",

  greeting: "Hello! Welcome to Alternus Gallery. I'm Artie, your AI art assistant. How can I help you explore the world of art today?",

  about: "Alternus Gallery is a premium online art marketplace that connects collectors with talented artists worldwide. We feature original paintings, prints, and commissioned works across various styles - from contemporary abstract to classical realism. Our mission is to make fine art accessible to everyone while supporting independent artists.",

  artists: "We have a diverse community of talented artists at Alternus! Each artist goes through a careful selection process to ensure quality. You can browse artist profiles in our Gallery section, where you'll find their portfolios, bios, and available works. Many of our artists also accept custom commissions!",

  buy: "Buying art at Alternus is simple and secure! Browse our Gallery, find a piece you love, select your preferred frame option if available, and add it to your cart. We offer secure checkout with multiple payment methods. All artworks come with a certificate of authenticity and are carefully packaged for safe delivery.",

  commission: "Yes! Many of our artists accept custom commissions. You can contact them directly through their profile page using the 'Message' button. Describe your vision, preferred size, colors, and style, and they'll work with you to create your perfect piece. Commission prices vary by artist and complexity.",

  shipping: "We ship worldwide! Artworks are carefully packaged with protective materials to ensure safe delivery. Shipping costs depend on the size of the artwork and destination. Orders over $100 qualify for free shipping. You can track your order through your account dashboard.",

  returns: "We want you to love your art! If you're not completely satisfied, we offer a 14-day return policy for most items. The artwork must be in its original condition. Custom commissions and certain items may have different policies. Contact our support team for assistance.",

  styles: "Alternus features a wide range of art styles including:\n\n- **Abstract** - Expressive, non-representational works\n- **Contemporary** - Modern artistic expressions\n- **Impressionism** - Light and color focused pieces\n- **Realism** - Detailed, lifelike representations\n- **Minimalist** - Clean, simple compositions\n- **Pop Art** - Bold, vibrant cultural commentary\n\nUse our filters in the Gallery to explore each style!",

  price: "Our artworks range from affordable prints starting at around $50 to original masterpieces in the thousands. We believe great art should be accessible to everyone. Use the price filter in our Gallery to find pieces within your budget. We also offer payment plans for larger purchases.",

  original: "Yes, we sell both original artworks and high-quality prints! Original pieces are one-of-a-kind works created by the artist. Prints are museum-quality reproductions on archival paper or canvas. Each listing clearly indicates whether it's an original or print, along with edition information for limited prints.",

  frame: "We offer professional framing options for many artworks! When viewing a piece, you can select from frame styles including:\n\n- **No Frame** - Canvas or paper only\n- **Black Frame** - Classic, modern look\n- **White Frame** - Clean, gallery style\n- **Natural Wood** - Warm, organic feel\n\nFrame prices vary by size and are added to the artwork cost.",

  artist_apply: "Want to sell your art on Alternus? We're always looking for talented artists! Visit our 'Apply as Artist' page to submit your portfolio. We review applications based on quality, originality, and professionalism. Accepted artists get their own profile page, access to our collector base, and dedicated support.",

  contact: "You can reach us through:\n\n- **Email**: support@alternusart.com\n- **Contact Form**: Visit our Contact page\n- **Live Chat**: I'm here to help!\n\nFor artist-specific questions, message them directly through their profile. Our team typically responds within 24 hours.",

  recommend: "I'd love to help you find the perfect artwork! To give you better recommendations, could you tell me:\n\n1. What style appeals to you? (abstract, realistic, minimalist, etc.)\n2. What colors would complement your space?\n3. What size are you looking for?\n4. Is it for a specific room or occasion?\n\nWith this info, I can suggest pieces from our collection!",
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|salut|pershendetje|miredita)/)) {
    return AI_RESPONSES.greeting;
  }

  // About Alternus
  if (lowerMessage.includes("about") || lowerMessage.includes("what is alternus") || lowerMessage.includes("tell me about")) {
    return AI_RESPONSES.about;
  }

  // Artists
  if (lowerMessage.includes("artist") && (lowerMessage.includes("who") || lowerMessage.includes("find") || lowerMessage.includes("browse"))) {
    return AI_RESPONSES.artists;
  }

  // Apply as artist
  if (lowerMessage.includes("apply") || lowerMessage.includes("sell my art") || lowerMessage.includes("become an artist")) {
    return AI_RESPONSES.artist_apply;
  }

  // Buying
  if (lowerMessage.includes("buy") || lowerMessage.includes("purchase") || lowerMessage.includes("order") || lowerMessage.includes("how to get")) {
    return AI_RESPONSES.buy;
  }

  // Commission
  if (lowerMessage.includes("commission") || lowerMessage.includes("custom") || lowerMessage.includes("personalized")) {
    return AI_RESPONSES.commission;
  }

  // Shipping
  if (lowerMessage.includes("ship") || lowerMessage.includes("delivery") || lowerMessage.includes("deliver")) {
    return AI_RESPONSES.shipping;
  }

  // Returns
  if (lowerMessage.includes("return") || lowerMessage.includes("refund") || lowerMessage.includes("exchange")) {
    return AI_RESPONSES.returns;
  }

  // Styles
  if (lowerMessage.includes("style") || lowerMessage.includes("type") || lowerMessage.includes("kind of art") || lowerMessage.includes("genre")) {
    return AI_RESPONSES.styles;
  }

  // Price
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive") || lowerMessage.includes("cheap") || lowerMessage.includes("affordable")) {
    return AI_RESPONSES.price;
  }

  // Original vs Print
  if (lowerMessage.includes("original") || lowerMessage.includes("print") || lowerMessage.includes("authentic")) {
    return AI_RESPONSES.original;
  }

  // Frame
  if (lowerMessage.includes("frame") || lowerMessage.includes("framing")) {
    return AI_RESPONSES.frame;
  }

  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help") || lowerMessage.includes("email")) {
    return AI_RESPONSES.contact;
  }

  // Recommendations
  if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest") || lowerMessage.includes("looking for") || lowerMessage.includes("find me")) {
    return AI_RESPONSES.recommend;
  }

  // Thank you
  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    return "You're welcome! I'm always here to help you discover amazing art at Alternus. Feel free to ask if you have any other questions!";
  }

  // Goodbye
  if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye") || lowerMessage.includes("see you")) {
    return "Goodbye! Thank you for visiting Alternus Gallery. Come back anytime to explore more beautiful artworks. Happy collecting!";
  }

  return AI_RESPONSES.default;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
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
      inputRef.current.focus();
    }
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

    // Simulate AI thinking time
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
    }, 1000 + Math.random() * 1000);
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
    "Do you ship internationally?",
    "Can I commission custom art?",
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open AI Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />

        {/* Tooltip */}
        <span className="absolute right-20 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Artie AI
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Container */}
          <div className="relative w-full max-w-md h-[600px] max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="bg-black px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Image
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=artie&backgroundColor=transparent"
                      alt="Artie AI"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Artie</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    AI Art Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-purple-600 text-white rounded-br-md"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm rounded-bl-md"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M12 8V4H8" />
                            <rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" />
                            <path d="M20 14h2" />
                            <path d="M15 13v2" />
                            <path d="M9 13v2" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Artie</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-[10px] mt-2 ${message.role === "user" ? "text-white/60" : "text-gray-400"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M12 8V4H8" />
                          <rect width="16" height="12" x="4" y="8" rx="2" />
                          <path d="M2 14h2" />
                          <path d="M20 14h2" />
                          <path d="M15 13v2" />
                          <path d="M9 13v2" />
                        </svg>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (show only if few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
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
                        }, 1000 + Math.random() * 1000);
                      }}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about art..."
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Powered by Alternus AI
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
