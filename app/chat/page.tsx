"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatSidebar, ChatWindow } from "../../components/chat/ChatComponents";
import { useChatStore } from "../../store/chatStore";

export default function ChatPage() {
  const router = useRouter();
  const { currentUser, hydrated } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    setIsLoading(false);
    if (!currentUser) {
      router.push("/auth/login");
    }
  }, [currentUser, hydrated, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading || !currentUser) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600 font-semibold animate-pulse">Loading...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 md:flex md:flex-col md:w-1/4 lg:w-1/5`}
      >
        <ChatSidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col w-full md:ml-0">
        <ChatWindow />
      </div>
    </motion.div>
  );
}
