"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthForm } from "../../../components/auth/AuthForm";

export default function SignupPage() {
  const router = useRouter();

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

  const navigate = (path: string) => {
    toast.success(`Navigating to ${path}...`);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl text-center space-y-8">
        <h1 className="text-6xl font-black text-gray-900 dark:text-white font-comic tracking-tight drop-shadow-md">
          Sign Up ✨
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 font-comic leading-relaxed">
          Join the fun! Create an account to start chatting.
        </p>
        <div role="region" aria-label="Signup form">
          <AuthForm type="signup" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-comic">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="inline-flex items-center px-4 py-2 text-blue-700 font-comic font-medium text-lg rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
            aria-label="Navigate to sign in page"
          >
            Sign In
          </button>
        </p>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
