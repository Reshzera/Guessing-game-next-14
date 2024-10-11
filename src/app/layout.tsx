import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guessing Game",
  description: "Pokemon guessing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
