"use client";

import { motion } from "framer-motion";
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
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../ui/imageWithFallback";
import { Input } from "../ui/input";

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

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
  const diffInHours =
    Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return minutes < 1 ? "now" : `${minutes}m`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  } else {
    const days = Math.floor(diffInHours / 24);
    return days === 1 ? "1d" : `${days}d`;
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
    return `Yesterday ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

function MessageStatusIcon({ status }: { status: string }) {
  switch (status) {
    case "sent":
      return <Clock className="h-3 w-3 text-blue-100" />;
    case "delivered":
      return <Check className="h-3 w-3 text-blue-100" />;
    case "read":
      return <CheckCheck className="h-3 w-3 text-blue-400" />;
    default:
      return null;
  }
}

interface MessageBubbleProps {
  message: Message;
  previousMessage?: Message;
}

function MessageBubble({ message, previousMessage }: MessageBubbleProps) {
  const { currentUser } = useChatStore();

  const showAvatar =
    !message.isOwn &&
    (!previousMessage ||
      previousMessage.senderId !== message.senderId ||
      new Date(message.timestamp).getTime() -
        new Date(previousMessage.timestamp).getTime() >
        5 * 60 * 1000);

  return (
    <motion.div
      className={`flex ${
        message.isOwn ? "justify-end" : "justify-start"
      } mb-1.5`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div
        className={`flex items-end space-x-1.5 max-w-[70%] ${
          message.isOwn ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {showAvatar && !message.isOwn && (
          <ImageWithFallback
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              message.senderId
            )}&background=0088cc&color=fff`}
            alt="Sender"
            className="w-5 h-5 rounded-full flex-shrink-0"
          />
        )}
        {!showAvatar && !message.isOwn && <div className="w-5" />}
        <div
          className={`px-2.5 py-1.5 rounded-2xl relative shadow-sm ${
            message.isOwn
              ? "bg-[#0088cc] text-white"
              : "bg-white text-foreground border border-gray-200"
          }`}
        >
          <p className="text-xs leading-tight break-words">{message.content}</p>
          <div
            className={`flex items-center justify-end space-x-1 mt-0.5 text-[10px] ${
              message.isOwn ? "text-blue-100" : "text-gray-500"
            }`}
          >
            <span>{formatMessageTime(message.timestamp)}</span>
            {message.isOwn && <MessageStatusIcon status={message.status} />}
          </div>
          <div
            className={`absolute bottom-0 w-2.5 h-2.5 ${
              message.isOwn
                ? "-right-1 bg-[#0088cc] rounded-bl-full"
                : "-left-1 bg-white border-l border-b border-gray-200 rounded-br-full"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ChatSidebar() {
  const {
    chats,
    activeChat,
    setActiveChat,
    sidebarOpen,
    toggleSidebar,
    currentUser,
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!activeChat && chats.length > 0) {
      setActiveChat(chats[0].id);
    }
  }, [activeChat, chats, setActiveChat]);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {sidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}
      <motion.aside
        className={`fixed sm:static inset-y-0 left-0 z-50 w-64 bg-[#f0f2f5] border-r border-gray-200 flex flex-col h-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-[#0088cc] to-[#33b5e5]">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center space-x-2 hover:bg-white/20 rounded-lg p-1.5 transition-colors"
            >
              <ImageWithFallback
                src={
                  currentUser?.avatar ||
                  "https://ui-avatars.com/api/?name=User&background=0088cc&color=fff"
                }
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-sm text-white">
                {currentUser?.name}
              </span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-200" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-gray-200 text-xs rounded-full h-9 text-gray-800"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                className={`px-3 py-2 rounded-lg cursor-pointer transition-colors border-t border-divider first:border-t-0 ${
                  activeChat === chat.id ? "bg-[#e1f5fe]" : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveChat(chat.id);
                  if (sidebarOpen) toggleSidebar();
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <ImageWithFallback
                      src={
                        chat.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          chat.name
                        )}&background=0088cc&color=fff`
                      }
                      alt={chat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-semibold text-sm truncate ${
                          activeChat === chat.id
                            ? "text-[#0088cc]"
                            : "text-gray-800"
                        }`}
                      >
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <motion.div
                          className="ml-2 px-1.5 py-0.5 bg-[#0088cc] text-white rounded-full text-xs font-medium min-w-[20px] text-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredChats.length === 0 && (
              <div className="p-6 text-center text-gray-500 text-sm">
                No chats found
              </div>
            )}
          </div>
        </div>
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Chat App</span>
            <span>v1.0</span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export function ChatWindow() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { chats, messages, activeChat, sendMessage, toggleSidebar } =
    useChatStore();

  const currentChat = chats.find((chat) => chat.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && activeChat) {
        sendMessage(activeChat, message.trim());
        setMessage("");
      }
    }
  };

  if (!activeChat || !currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
            <Send className="w-8 h-8 text-[#0088cc]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Start a conversation
            </h3>
            <p className="text-xs text-gray-600">
              Select a chat from the sidebar to begin messaging
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f0f2f5]">
      <motion.header
        className="p-3 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="hamburger-button w-10 h-10 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              title="Toggle Sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
          <div className="relative">
            <ImageWithFallback
              src={
                currentChat.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  currentChat.name
                )}&background=0088cc&color=fff`
              }
              alt={currentChat.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            {currentChat.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border border-white rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-sm text-gray-800">
              {currentChat.name}
            </h2>
            <p className="text-xs text-gray-600">
              {currentChat.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-200">
            <Phone className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-200">
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </motion.header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin bg-[#f0f2f5]">
        {chatMessages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            previousMessage={chatMessages[index - 1]}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <motion.form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-gray-200 bg-white shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-end space-x-2">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="resize-none min-h-[40px] max-h-24 bg-white border-gray-200 rounded-full text-sm"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="bg-[#0088cc] hover:bg-[#0066cc]"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
