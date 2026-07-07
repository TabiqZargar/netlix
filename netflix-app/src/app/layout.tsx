import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/layout/ToastContainer";

export const metadata: Metadata = {
  title: "Netflix Clone - Watch Movies & TV Shows Online",
  description:
    "Watch your favorite movies and TV shows online. A Netflix-inspired streaming platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
