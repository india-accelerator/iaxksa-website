import { Geist, Geist_Mono, Poppins, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});

// Roboto across the board: body copy, display headings and the tracked labels.
const roboto = Roboto({
  variable: "--font-aa-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const robotoDisplay = Roboto({
  variable: "--font-aa-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-aa-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Arabian Accelerator",
  description: "India Accelerator launches specialized program expanding in Saudi Arabia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable} ${robotoDisplay.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
