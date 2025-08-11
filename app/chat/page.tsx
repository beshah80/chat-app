"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatSidebar, ChatWindow } from "../../components/chat/ChatComponents";
import { useChatStore } from "../../store/chatStore";

export default function ChatPage() {
  const router = useRouter();
  const { currentUser, hydrated } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    setIsLoading(false);
    if (!currentUser) {
      router.push("/auth/login");
    }
  }, [currentUser, hydrated, router]);

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
      className="flex h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ChatSidebar />
      <ChatWindow />
    </motion.div>
  );
}
