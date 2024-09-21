import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";

const interTight = localFont({
  src: "./fonts/InterTight.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FocalPoint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable}`}>{children}</body>
    </html>
  );
}
