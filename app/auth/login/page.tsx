"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthForm } from "../../../components/auth/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => toast.success("Back online! 🎉");
    const handleOffline = () => toast.error("You're offline! 😟");
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const navigate = (path: string) => {
    toast.success(`Navigating to ${path}...`);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-center space-y-6 sm:space-y-8 lg:space-y-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white font-comic tracking-tight drop-shadow-md">
          Sign In ✨
        </h1>
        <p className="text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-comic leading-relaxed">
          Welcome back! Log in to connect with friends.
        </p>
        <div role="region" aria-label="Login form">
          <AuthForm type="login" />
        </div>
        <p className="text-xs sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-comic">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/auth/signup")}
            className="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 text-blue-700 font-comic font-medium text-xs sm:text-base rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
            aria-label="Navigate to sign up page"
          >
            Sign Up
          </button>
        </p>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
