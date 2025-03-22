import type { Metadata } from "next";
import "./globals.css";
import { shareTechMono } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Vortex",
    absolute: "Vortex",
  },
  description: "An online shopping store for futre clothing and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${shareTechMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
