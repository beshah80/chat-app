import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat App",
  description: "A Telegram-like chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The body tag now has a clean background color and uses antialiasing for smoother fonts. */}
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
