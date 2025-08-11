"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useChatStore } from "../store/chatStore";

export default function Home() {
  const router = useRouter();
  const { currentUser, hydrated } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    setIsLoading(false);
    if (currentUser) {
      router.push("/chat");
    }
  }, [currentUser, hydrated, router]);

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600 font-comic animate-pulse">Loading...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-1">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span
            role="img"
            aria-label="waving-hand"
            className="text-4xl animate-wiggle"
          >
            👋
          </span>
          <h1 className="text-5xl font-bold text-gray-900 font-comic tracking-tight">
            Chat App
          </h1>
          <span
            role="img"
            aria-label="sparkles"
            className="text-4xl animate-bounce"
          >
            ✨
          </span>
        </div>
        <p className="text-lg text-gray-600 font-comic leading-relaxed">
          Ready to get your chat on? Join the fun and connect with friends in an
          instant!
        </p>
        <div className="space-y-4">
          <Button
            className="w-full bg-blue-500 text-white font-bold text-lg rounded-full py-6 shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 font-comic"
            onClick={() => router.push("/auth/login")}
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            className="w-full text-blue-500 border-2 border-blue-500 bg-white hover:bg-blue-50 font-bold text-lg rounded-full py-6 transition-colors duration-300 font-comic"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
