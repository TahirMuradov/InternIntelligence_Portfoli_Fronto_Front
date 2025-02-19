import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import "../components/education/education.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "@/components/header/Header";
import BackToTopButton from "@/components/backToTop/BackToTop";
config.autoAddCss=true;
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata:Metadata = {
  title: "Muradov Tahir Full-Stack Web Development(c#|NextJs)",
  description: "Muradov Tahir",
 
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Provider>

        {children}
        <BackToTopButton/>
        </Provider>
      </body>
    </html>
  );
}
