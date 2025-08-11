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

  // This useEffect block handles authentication and routing.
  // It checks if the user is already signed in and redirects them to the chat page.
  useEffect(() => {
    if (!hydrated) return;
    setIsLoading(false);
    if (currentUser) {
      router.push("/chat");
    }
  }, [currentUser, hydrated, router]);

  // Displays a loading screen while the user's authentication state is being determined.
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    // The main container with a vibrant, animated gradient background.
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* The main card container with a floating animation and pronounced shadow. */}
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-1">
        {/* A header with the app name and fun emojis. */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span
            role="img"
            aria-label="waving-hand"
            className="text-4xl animate-wiggle"
          >
            👋
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
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

        {/* The updated, playful description. */}
        <p className="text-lg text-gray-600 font-medium leading-relaxed">
          Ready to get your chat on? Join the fun and connect with friends in an
          instant!
        </p>

        {/* Action buttons with custom styling and hover effects. */}
        <div className="space-y-4">
          <Button
            className="w-full bg-blue-600 text-white font-bold text-lg rounded-full py-6 shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
            onClick={() => router.push("/auth/login")}
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            className="w-full text-blue-600 border-2 border-blue-600 bg-white hover:bg-blue-50 font-bold text-lg rounded-full py-6 transition-colors duration-300"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
