import { Analytics } from "@vercel/analytics/react";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

/*
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
*/

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

export const metadata = {
  title: "Haiku | Write a haiku, together.",
  description: "Drop a word, get an haiku inspired by the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair_display.variable}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
