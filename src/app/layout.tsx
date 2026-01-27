import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { CartModal } from "@/components/cart-modal";
import { ArtLoverModal } from "@/components/art-lover-modal";
import { CookieModal } from "@/components/cookie-modal";
import { AIChat } from "@/components/ai-chat";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Exclusive Original Artworks",
  description: "Exclusive art gallery - Discover and purchase unique artworks",
  icons: {
    icon: "/icon.ico",
  },
  other: {
    "trustpilot-one-time-domain-verification-id": "97339bc2-345b-49c2-a68e-f83d09f259c1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <CartModal />
          <CookieModal />
          <ArtLoverModal />
          <AIChat />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
