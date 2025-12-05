import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const oswald = localFont({
  src: [
    {
      path: "../../public/Oswald/static/Oswald-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/Oswald/static/Oswald-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Oswald/static/Oswald-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Oswald/static/Oswald-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Oswald/static/Oswald-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Oswald/static/Oswald-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-oswald",
});

export const metadata = {
  title: "IAXKSA",
  description: "IAXKSA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${oswald.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
