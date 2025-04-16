import type { Metadata } from "next";
import "./globals.css";
import { shareTechMono } from "@/fonts/fonts";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Vortex",
    absolute: "Vortex",
  },
  description: "An online shopping store for future clothing and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${shareTechMono.className} antialiased`}>
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
