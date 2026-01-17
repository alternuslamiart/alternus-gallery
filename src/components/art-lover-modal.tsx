"use client";

import { useState, useEffect } from "react";

export function ArtLoverModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal was already shown this session
    const hasSeenModal = sessionStorage.getItem("artLoverModalShown");

    if (!hasSeenModal) {
      // Show modal only once per session after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Mark as shown so it won't appear again this session
    sessionStorage.setItem("artLoverModalShown", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>

          {/* Content */}
          <div className="p-8 pt-12 text-center">
            {/* Heart Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" className="drop-shadow-sm">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Are you an Art lover?
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 mb-8">
              I love art.
            </p>

            {/* Button */}
            <button
              onClick={handleClose}
              className="w-full py-3 px-8 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              I Love Art
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
