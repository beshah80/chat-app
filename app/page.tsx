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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-sm text-center space-y-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome to Chat App
        </h1>
        <p className="text-sm text-muted-foreground">
          Connect with friends and start chatting in a secure, Telegram-inspired
          app.
        </p>
        <div className="space-y-4">
          <Button className="w-full" onClick={() => router.push("/auth/login")}>
            Sign In
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
