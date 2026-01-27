"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/providers";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/30">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-3xl font-black font-roboto">Alternus</h3>
            <p className="text-sm text-muted-foreground">
              An exclusive art gallery where every piece tells a unique story.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E4405F] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF0000] transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("gallery")}
                </Link>
              </li>
              <li>
                <Link href="/virtual-gallery" className="inline-block py-1 hover:text-foreground transition-colors">
                  Virtual Gallery
                </Link>
              </li>
              <li>
                <Link href="/pre-order" className="inline-block py-1 hover:text-foreground transition-colors">
                  Pre-Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider">{t("customerService")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/commissions" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("commissions")}
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("giftCards")}
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("careGuide")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider">{t("shipping")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shipping" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("shipping")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("returns")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="inline-block py-1 hover:text-foreground transition-colors">
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider">{t("contact")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                info@alternus.com
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +1 (212) XXX-XXXX
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                New York, NY
              </li>
            </ul>
          </div>

          {/* Help Center */}
          <div className="space-y-4">
            <h4 className="font-semibold tracking-wider">{t("helpCenter")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="inline-block py-1 hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {t("liveChat")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="inline-block py-1 hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1 hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {t("emailSupport")}
                </Link>
              </li>
              <li>
                <Link href="/help" className="inline-block py-1 hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                  {t("trackOrder")}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <Separator className="my-8" />

        {/* Download App Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-sm text-muted-foreground font-medium">Download Our App</p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* App Store Button - Coming Soon */}
            <div className="relative">
              <div
                className="inline-flex items-center gap-2 bg-gray-800 text-white/70 px-4 py-2.5 rounded-lg cursor-not-allowed"
                aria-label="App Store - Coming Soon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">Download on the</span>
                  <span className="text-sm font-semibold leading-tight">App Store</span>
                </div>
              </div>
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                COMING SOON
              </span>
            </div>
            {/* Play Store Button - Coming Soon */}
            <div className="relative">
              <div
                className="inline-flex items-center gap-2 bg-gray-800 text-white/70 px-4 py-2.5 rounded-lg cursor-not-allowed"
                aria-label="Google Play - Coming Soon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">GET IT ON</span>
                  <span className="text-sm font-semibold leading-tight">Google Play</span>
                </div>
              </div>
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* Trustpilot Section */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <svg width="100" height="24" viewBox="0 0 126 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.605 11.616h8.893v2.301h-3.22v9.847h-2.453v-9.847h-3.22v-2.301zm8.398 4.337h2.164v1.339h.032c.08-.237.208-.458.384-.662.176-.203.38-.381.613-.534.232-.152.49-.272.773-.358.282-.087.573-.13.873-.13.224 0 .39.005.496.016.107.011.2.024.28.04v2.1a3.556 3.556 0 0 0-.401-.064 4.054 4.054 0 0 0-.45-.024c-.32 0-.617.056-.89.168a2.07 2.07 0 0 0-.718.478c-.202.206-.362.454-.478.742-.117.289-.176.61-.176.965v3.435H42.003v-7.511zm11.623 7.511h-2.164v-1.068h-.032a1.893 1.893 0 0 1-.305.406 2.293 2.293 0 0 1-.486.379 2.877 2.877 0 0 1-.63.277 2.568 2.568 0 0 1-.737.104c-.534 0-.99-.087-1.367-.261a2.463 2.463 0 0 1-.906-.71 2.844 2.844 0 0 1-.502-1.037 4.878 4.878 0 0 1-.152-1.227v-4.374h2.501v3.883c0 .513.103.913.31 1.197.207.285.524.427.954.427.352 0 .64-.056.865-.168.224-.112.403-.26.538-.446.134-.186.229-.397.285-.634.056-.237.084-.486.084-.75v-3.51h2.501v7.512h-.757zm3.36-2.597c.053.406.2.702.441.89.242.187.546.28.914.28.128 0 .277-.013.449-.04a1.65 1.65 0 0 0 .461-.136.945.945 0 0 0 .354-.277c.091-.117.133-.269.125-.454-.01-.192-.092-.348-.244-.47a2.03 2.03 0 0 0-.558-.302 5.095 5.095 0 0 0-.73-.2 9.632 9.632 0 0 1-.762-.185 6.853 6.853 0 0 1-.762-.269 2.557 2.557 0 0 1-.73-.437 2.136 2.136 0 0 1-.558-.69c-.144-.277-.216-.626-.216-1.044 0-.427.096-.79.288-1.092.192-.3.44-.546.745-.737.304-.19.649-.33 1.036-.42a5.083 5.083 0 0 1 1.163-.132c.384 0 .756.044 1.116.132.36.088.686.229.978.422.293.194.534.445.726.754.192.31.304.69.337 1.14h-2.405c-.075-.352-.216-.586-.425-.702a1.526 1.526 0 0 0-.778-.176c-.096 0-.21.008-.345.024a1.208 1.208 0 0 0-.35.096.714.714 0 0 0-.268.2.484.484 0 0 0-.108.317c0 .17.072.31.216.422.144.112.328.208.55.288.222.08.473.152.753.216.28.064.558.14.834.23.288.084.564.188.826.31.262.123.494.28.694.47.2.19.36.42.478.69.117.27.176.593.176.97 0 .463-.1.866-.3 1.21-.2.345-.465.63-.793.858a3.61 3.61 0 0 1-1.116.518 5.008 5.008 0 0 1-1.283.168c-.448 0-.877-.052-1.287-.156a3.304 3.304 0 0 1-1.1-.478 2.556 2.556 0 0 1-.781-.81c-.2-.326-.312-.714-.337-1.163h2.389v-.001zm6.016-1.595v-3.32h1.235v-1.884h2.501v1.884h1.476v1.644h-1.476v2.645c0 .15.008.29.024.422.016.133.053.25.112.35.059.102.144.182.256.241.112.059.264.088.457.088.128 0 .256-.005.385-.016.128-.01.25-.037.368-.08v1.756a4.69 4.69 0 0 1-.634.096 6.082 6.082 0 0 1-.666.032c-.405 0-.754-.04-1.048-.12a1.824 1.824 0 0 1-.73-.37 1.538 1.538 0 0 1-.429-.625 2.612 2.612 0 0 1-.144-.898v-2.845h-1.187zm6.463 4.192v-10.08h2.501v3.635h.032c.203-.336.49-.598.862-.786.373-.187.773-.28 1.2-.28.554 0 1.027.099 1.419.297.392.199.71.466.954.802.245.336.422.726.53 1.171.11.446.164.914.164 1.407 0 .47-.056.922-.168 1.355a3.448 3.448 0 0 1-.518 1.14c-.23.33-.522.594-.874.79a2.567 2.567 0 0 1-1.252.293c-.234 0-.46-.024-.678-.072a2.506 2.506 0 0 1-.606-.208 2.09 2.09 0 0 1-.506-.334 1.793 1.793 0 0 1-.365-.446h-.032v.915h-2.163v.401zm6.463-3.811c0-.235-.03-.47-.088-.706a1.85 1.85 0 0 0-.277-.618 1.475 1.475 0 0 0-.49-.438 1.47 1.47 0 0 0-.722-.168c-.554 0-.966.19-1.235.57-.27.38-.405.878-.405 1.495 0 .288.035.562.104.822.07.261.176.49.32.686.145.197.328.354.55.47.223.117.49.176.802.176.32 0 .585-.062.794-.184a1.49 1.49 0 0 0 .506-.478 2 2 0 0 0 .265-.658c.05-.24.076-.48.076-.718v-.25zm3.69-3.701h2.501v7.511h-2.501v-7.511zm0-2.9h2.501v2.012h-2.501V12.052zm4.106 0h2.501v10.712h-2.501V12.052zm8.96 9.812c-.512.768-1.302 1.152-2.373 1.152-.49 0-.93-.085-1.319-.256a2.772 2.772 0 0 1-.994-.714 3.201 3.201 0 0 1-.626-1.092 4.255 4.255 0 0 1-.216-1.387c0-.48.07-.93.208-1.347.139-.418.341-.782.606-1.092.266-.31.589-.554.97-.73.382-.177.814-.265 1.296-.265.49 0 .912.091 1.264.273.352.182.642.43.87.742.227.312.394.673.502 1.084.107.41.16.846.16 1.307v.626h-4.29c.032.405.165.728.4.97.235.241.554.362.958.362.299 0 .544-.07.734-.208.19-.139.337-.328.44-.566h2.21zm-1.916-3.01c0-.32-.112-.59-.337-.81a1.19 1.19 0 0 0-.842-.33c-.234 0-.44.04-.617.12a1.39 1.39 0 0 0-.442.318 1.33 1.33 0 0 0-.269.45c-.059.166-.091.338-.096.514h2.603v-.262zm4.235-2.901h2.164v1.339h.032c.08-.237.208-.458.384-.662.176-.203.38-.381.614-.534.232-.152.49-.272.773-.358.28-.087.572-.13.873-.13.224 0 .389.005.496.016.106.011.2.024.28.04v2.1a3.572 3.572 0 0 0-.402-.064 4.063 4.063 0 0 0-.449-.024c-.32 0-.617.056-.89.168a2.07 2.07 0 0 0-.718.478c-.203.206-.362.454-.478.742-.117.289-.176.61-.176.965v3.435h-2.502v-7.511z" fill="#191919"/>
                <path d="M21.488 11.616l-2.014 6.163-1.603-6.163H14.27l3.28 9.49-.126.39c-.115.358-.243.625-.382.802-.14.176-.298.3-.475.37-.176.07-.38.105-.609.105-.15 0-.3-.013-.449-.04a4.01 4.01 0 0 1-.441-.104l-.312 1.916c.203.043.418.08.646.112.229.032.466.048.71.048.47 0 .89-.059 1.26-.176.37-.118.7-.302.99-.554.29-.25.541-.57.753-.957.213-.387.4-.853.562-1.395l3.8-10.007h-2.988z" fill="#191919"/>
                <path d="M0 12.41l3.926 2.741-1.5 4.442L0 12.41z" fill="#00B67A"/>
                <path d="M8.416 8.088H5.212l1.602-4.742L8.416 8.088z" fill="#00B67A"/>
                <path d="M6.814 3.346L5.212 8.088H0l4.207 2.906-1.604 4.742 4.21-2.906 2.604-1.82-2.603-7.664z" fill="#00B67A"/>
                <path d="M6.814 3.346l1.602 4.742h5.212l-4.208 2.906 1.604 4.742-4.21-2.906-2.604 1.82 2.604-8.304z" fill="#005128"/>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              {/* 5 Stars */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#00B67A"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span className="ml-2 text-sm font-medium text-foreground">4.9</span>
            </div>
            <p className="text-xs text-muted-foreground">Based on 127 reviews</p>
          </a>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Alternus Art Gallery. {t("allRights")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="inline-block py-2 hover:text-foreground transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="inline-block py-2 hover:text-foreground transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
