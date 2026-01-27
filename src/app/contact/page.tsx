"use client";

import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";

function ContactFormSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
      <div className="space-y-6 animate-pulse">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-10 bg-gray-100 rounded-lg" />
        <div className="h-32 bg-gray-100 rounded-lg" />
        <div className="h-12 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4">Get in Touch</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Have questions or want to purchase a piece? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Contact Options */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-sm text-gray-500 mb-3">We&apos;ll respond within 24 hours</p>
              <a href="mailto:info@alternus.com" className="text-blue-600 font-medium hover:underline">
                info@alternus.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-sm text-gray-500 mb-3">Mon-Fri, 9am-6pm EST</p>
              <span className="text-emerald-600 font-medium">+383 48 466 061</span>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-sm text-gray-500 mb-3">Visit our gallery</p>
              <span className="text-purple-600 font-medium">Prishtinë, Kosovo</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Follow Us */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-black transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-black transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-black transition-colors"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-black transition-colors"
                    aria-label="YouTube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                      <path d="m10 15 5-3-5-3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Saturday</span>
                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="text-gray-900 font-medium">Closed</span>
                  </li>
                </ul>
              </div>

              {/* Response Time */}
              <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Response Time</span>
                </div>
                <p className="text-lg font-semibold">Within 24 Hours</p>
                <p className="text-sm text-gray-400 mt-2">
                  We aim to respond to all inquiries within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
