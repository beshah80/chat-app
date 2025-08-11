"use client";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}
