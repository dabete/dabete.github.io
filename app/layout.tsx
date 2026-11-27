import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VimKeys from "@/components/VimKeys";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Diego Abete | Portfolio", // used by pages that don't set a title
    template: "%s | Diego Abete", // %s is replaced by each page's own title
  },
  description: "Computer Science student at King's College London",
  // Link previews need absolute URLs; the og:image itself comes from app/opengraph-image.tsx
  metadataBase: new URL("https://dabete.github.io"),
  openGraph: {
    title: "Diego Abete | Portfolio",
    description: "Computer Science student at King's College London",
    url: "/",
    siteName: "Diego Abete",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {/* Every page renders inside this, so pages don't repeat the width/padding */}
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
          {children}
        </main>
        <Footer />
        <VimKeys />
      </body>
    </html>
  );
}
