"use client";

import {
  Check,
  CheckCheck,
  Clock,
  Menu,
  MoreVertical,
  Phone,
  Search,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"; // Corrected path to the Textarea component

// Refined, friendly color palette with dark mode support
const friendlyColors = {
  background: "#F0F4F8", // Soft gray (light mode)
  darkBackground: "#1F2937", // Gray-800 (dark mode)
  chatBackground: "#FFFFFF", // Clean white (light mode)
  darkChatBackground: "#111827", // Gray-900 (dark mode)
  myBubble: "#8A2BE2", // Bright Blue Violet
  darkMyBubble: "#A78BFA", // Lavender (dark mode)
  otherBubble: "#E8F0FE", // Light Sky Blue
  darkOtherBubble: "#374151", // Gray-700 (dark mode)
  myText: "#FFFFFF",
  darkMyText: "#FFFFFF",
  otherText: "#1F2937",
  darkOtherText: "#D1D5DB",
  header: "#FFFFFF",
  darkHeader: "#111827", // Gray-900 (dark mode)
  border: "#E5E7EB",
  darkBorder: "#4B5563",
  secondaryText: "#6B7280",
  darkSecondaryText: "#9CA3AF",
  unreadBadge: "#F97316", // Warm Orange
  darkUnreadBadge: "#FBBF24", // Amber (dark mode)
  sentIcon: "#9CA3AF", // Gray
  deliveredIcon: "#3B82F6", // Blue
  readIcon: "#10B981", // Emerald Green
  accent: "#A78BFA", // Lavender accent
  darkAccent: "#C4B5FD", // Lighter lavender (dark mode)
};

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
  senderId: string;
}

function formatTime(date: Date) {
  const now = new Date();
  const diffInMinutes = Math.abs(now.getTime() - date.getTime()) / (1000 * 60);

  if (diffInMinutes < 1) {
    return "now";
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m ago`;
  } else if (diffInMinutes < 60 * 24) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / (60 * 24))}d ago`;
  }
}

function formatMessageTime(date: Date) {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday =
    new Date(date.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
    today.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (isYesterday) {
    return `Yesterday`;
  } else {
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
    });
  }
}

function MessageStatusIcon({
  status,
  isOwn,
}: {
  status: string;
  isOwn: boolean;
}) {
  if (!isOwn) return null;
  switch (status) {
    case "sent":
      return (
        <Clock
          className={`h-3 w-3 text-[${friendlyColors.sentIcon}]`}
          aria-hidden="true"
        />
      );
    case "delivered":
      return (
        <Check
          className={`h-3 w-3 text-[${friendlyColors.deliveredIcon}]`}
          aria-hidden="true"
        />
      );
    case "read":
      return (
        <CheckCheck
          className={`h-3 w-3 text-[${friendlyColors.readIcon}]`}
          aria-hidden="true"
        />
      );
    default:
      return null;
  }
}

interface MessageBubbleProps {
  message: Message;
  previousMessage?: Message;
}

const MessageBubble = React.memo(
  ({ message, previousMessage }: MessageBubbleProps) => {
    const showAvatar =
      !message.isOwn &&
      (!previousMessage ||
        previousMessage.senderId !== message.senderId ||
        new Date(message.timestamp).getTime() -
          new Date(previousMessage.timestamp).getTime() >
          3 * 60 * 1000);

    const bubbleClass = message.isOwn
      ? `bg-[${friendlyColors.myBubble}] dark:bg-[${friendlyColors.darkMyBubble}] text-[${friendlyColors.myText}] dark:text-[${friendlyColors.darkMyText}] rounded-br-md shadow-lg shadow-purple-200 dark:shadow-purple-900 border border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}]`
      : `bg-[${friendlyColors.otherBubble}] dark:bg-[${friendlyColors.darkOtherBubble}] text-[${friendlyColors.otherText}] dark:text-[${friendlyColors.darkOtherText}] rounded-bl-md shadow-lg shadow-gray-200 dark:shadow-gray-800 border border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}]`;

    return (
      <div
        className={`flex ${
          message.isOwn ? "justify-end" : "justify-start"
        } mb-2`}
      >
        <div
          className={`flex items-end space-x-2 max-w-[75%] ${
            message.isOwn ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          {showAvatar && !message.isOwn && (
            <div className="w-8 h-8 rounded-full bg-blue-700 dark:bg-blue-300 text-white dark:text-gray-900 flex items-center justify-center text-sm font-bold flex-shrink-0 mb-3">
              {message.senderId.charAt(0).toUpperCase()}
            </div>
          )}
          {!showAvatar && !message.isOwn && <div className="w-8" />}
          <div
            className={`px-4 py-3 rounded-2xl relative ${bubbleClass}`}
            role="article"
            aria-label={`Message from ${
              message.isOwn ? "you" : message.senderId
            } at ${formatMessageTime(message.timestamp)}`}
          >
            <p className="text-base leading-tight break-words whitespace-pre-wrap font-comic">
              {message.content}
            </p>
            <div
              className={`flex items-center justify-end space-x-1 mt-1.5 text-xs ${
                message.isOwn
                  ? "text-white/80"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span>{formatMessageTime(message.timestamp)}</span>
              {message.isOwn && (
                <MessageStatusIcon
                  status={message.status}
                  isOwn={message.isOwn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = "MessageBubble";

export function ChatSidebar() {
  const { chats, activeChat, setActiveChat, sidebarOpen, toggleSidebar } =
    useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        useChatStore.getState().setViewMode("chats");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-[${
          friendlyColors.border
        }] dark:border-[${
          friendlyColors.darkBorder
        }] flex flex-col h-full md:static md:flex md:w-72 md:min-w-[288px] md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`p-4 border-b border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}] bg-white dark:bg-gray-900 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
              aria-label="Navigate to profile"
            >
              <div className="w-10 h-10 rounded-full bg-blue-700 dark:bg-blue-300 text-white dark:text-gray-900 flex items-center justify-center text-base font-bold">
                P
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white font-comic">
                Profile
              </span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
            <Input
              placeholder="Search for buddies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}] text-base rounded-2xl h-11 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-400 dark:focus:border-blue-600 font-comic"
              aria-label="Search chats"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="space-y-2 p-4">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-800 border border-[${
                  friendlyColors.border
                }] dark:border-[${friendlyColors.darkBorder}] shadow-lg ${
                  activeChat === chat.id
                    ? "bg-blue-50 dark:bg-blue-900 shadow-inner"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveChat(chat.id);
                  if (sidebarOpen) toggleSidebar();
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select chat with ${chat.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveChat(chat.id);
                    if (sidebarOpen) toggleSidebar();
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-700 dark:bg-blue-300 text-white dark:text-gray-900 flex items-center justify-center text-base font-bold">
                      {chat.name.charAt(0).toUpperCase()}
                    </div>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-bold text-base truncate font-comic ${
                          activeChat === chat.id
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 font-comic">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate font-comic">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <div
                          className={`ml-2 px-2 py-0.5 bg-[${friendlyColors.unreadBadge}] dark:bg-[${friendlyColors.darkUnreadBadge}] text-white rounded-full text-xs font-bold min-w-[24px] text-center`}
                        >
                          {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-base font-comic">
                No chats found. Start a conversation!
              </div>
            )}
          </div>
        </div>
        <div
          className={`p-4 border-t border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}] bg-white dark:bg-gray-900 shadow-inner`}
        >
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 font-comic">
            <span>Chat App 💜</span>
            <span>v1.0.3</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export function ChatWindow() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    chats,
    messages,
    activeChat,
    sendMessage,
    toggleSidebar,
    setActiveChat,
  } = useChatStore();

  useEffect(() => {
    if (activeChat === undefined) {
      setActiveChat(null);
    }
  }, [activeChat, setActiveChat]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        useChatStore.getState().setViewMode("chats");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentChat = chats.find((chat) => chat.id === activeChat);
  const chatMessages = useMemo(
    () => (activeChat ? messages[activeChat] || [] : []),
    [activeChat, messages]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [chatMessages]);

  useEffect(() => {
    if (activeChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;
    sendMessage(activeChat, message.trim());
    setMessage("");
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && activeChat) {
        sendMessage(activeChat, message.trim());
        setMessage("");
      }
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (e.target.value.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  if (!activeChat || !currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center space-y-6">
          <div className="w-28 h-28 mx-auto bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-2xl">
            <Send
              className="w-12 h-12 text-blue-700 dark:text-blue-300"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-comic">
              Your Friendly Chat App!
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-sm mx-auto font-comic">
              Select a friend from the sidebar to start chatting.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col h-full bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950`}
    >
      <header
        className={`p-4 border-b border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}] bg-white dark:bg-gray-900 flex items-center justify-between shadow-lg`}
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-700 dark:bg-blue-300 text-white dark:text-gray-900 flex items-center justify-center text-base font-bold">
              {currentChat.name.charAt(0).toUpperCase()}
            </div>
            {currentChat.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900 dark:text-white font-comic">
              {currentChat.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-comic">
              {isTyping
                ? "is typing..."
                : currentChat.isOnline
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Start a call"
          >
            <Phone className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="More options"
          >
            <MoreVertical className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-thin">
        {chatMessages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            previousMessage={chatMessages[index - 1]}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className={`p-4 border-t border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}] bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="flex items-end space-x-3">
          <Textarea
            ref={inputRef}
            value={message}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            placeholder="Type your friendly message here..."
            className="resize-none min-h-[44px] max-h-36 bg-gray-50 dark:bg-gray-800 border-[${friendlyColors.border}] dark:border-[${friendlyColors.darkBorder}] rounded-2xl text-base p-3 font-comic focus:bg-white dark:focus:bg-gray-900 focus:border-blue-400 dark:focus:border-blue-600 transition-colors"
            aria-label="Type a message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="w-12 h-12 flex-shrink-0 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 rounded-full shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
            aria-label="Send message"
          >
            <Send className="h-6 w-6 text-white" />
          </Button>
        </div>
      </form>
    </div>
  );
}
