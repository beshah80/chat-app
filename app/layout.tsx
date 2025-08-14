import "./globals.css";

export const metadata = {
  title: "Chat App",
  description: "A fun, vibrant Telegram-like chat application",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 antialiased font-comic">
        {children}
      </body>
    </html>
  );
}
