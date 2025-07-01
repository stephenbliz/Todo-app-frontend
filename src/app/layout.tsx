import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "./components/nav";
// import { Provider } from "react-redux";
import { Providers } from "./provider";
// import store from "./redux/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Write out all the tasks you want to perform and track your progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <nav
            className="fixed top-0 left-0 w-full h-[14vh] lg-[12vh] z-[1000]"
          >
            <Nav />
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
