"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useChatStore } from "../store/chatStore";

export default function Home() {
  const router = useRouter();
  const { currentUser, hydrated } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    setIsLoading(false);
    if (currentUser) router.push("/chat");
  }, [currentUser, hydrated, router]);

  useEffect(() => {
    const handleOnline = () => toast.success("Back online!");
    const handleOffline = () => toast.error("You're offline!");
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        aria-live="polite"
      >
        <p className="text-gray-700 dark:text-gray-200 font-comic text-2xl font-medium">
          Loading your chat experience...
        </p>
      </div>
    );
  }

  const navigate = (path: string) => {
    toast.success(`Navigating to ${path}...`);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-3xl p-14 shadow-2xl text-center space-y-16">
        {/* Header */}
        <div>
          <h1 className="text-7xl font-black text-gray-900 dark:text-white font-comic tracking-tight drop-shadow-md">
            Chat App ✨
          </h1>
          <p className="mt-5 text-2xl text-gray-600 dark:text-gray-300 font-comic leading-relaxed max-w-3xl mx-auto">
            Connect with friends and share moments in a vibrant, seamless chat
            experience!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className="flex flex-col items-center p-10 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            role="region"
            aria-label="Effortless Chatting Feature"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-700 dark:text-blue-300 mb-6"
              aria-hidden="true"
            >
              <path d="M7.9 20A9.3 9.3 0 0 1 4 16.1L2 22l6-2" />
              <path d="M14.5 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
            <h3 className="font-bold text-3xl font-comic text-gray-900 dark:text-white">
              Effortless Chatting
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              Enjoy a seamless, intuitive interface for chatting with friends
              anytime, anywhere.
            </p>
          </div>

          <div
            className="flex flex-col items-center p-10 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            role="region"
            aria-label="Group Chats Feature"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-700 dark:text-purple-300 mb-6"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3 className="font-bold text-3xl font-comic text-gray-900 dark:text-white">
              Connect with Groups
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              Create lively group chats to stay connected with everyone you
              love.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-6 pt-12 max-w-md mx-auto">
          <button
            className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-comic font-bold text-2xl py-5 rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
            onClick={() => navigate("/auth/login")}
            aria-label="Sign in to your account"
          >
            Sign In
          </button>
          <button
            className="w-full text-blue-700 border-2 border-blue-700 bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-800 font-comic font-bold text-2xl py-5 rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
            onClick={() => navigate("/auth/signup")}
            aria-label="Create a new account"
          >
            Sign Up
          </button>
          <button
            className="w-full text-purple-700 hover:text-purple-900 font-comic text-xl py-4 rounded-full underline transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-purple-600"
            onClick={() => navigate("/about")}
            aria-label="Learn more about us"
          >
            About Us
          </button>
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
