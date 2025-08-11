"use client";

import { motion } from "framer-motion";
import { Mail, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { useChatStore } from "../../store/chatStore";

export default function ProfilePage() {
  const { currentUser, logout } = useChatStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl p-6 space-y-6 shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 font-comic">
            Profile
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/chat")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-green-500 text-white flex items-center justify-center text-2xl font-bold animate-bounce">
            {currentUser?.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-800 font-comic">
              {currentUser?.name}
            </h3>
            <p className="text-sm text-gray-600 font-comic">Online</p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800 font-comic">
            Contact Information
          </h4>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100">
            <User className="h-4 w-4 text-gray-600" />
            <p className="text-sm text-gray-800 font-comic">
              {currentUser?.name}
            </p>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100">
            <Mail className="h-4 w-4 text-gray-600" />
            <p className="text-sm text-gray-800 font-comic">
              {currentUser?.email}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-red-500 hover:text-red-600 font-comic"
          onClick={handleLogout}
        >
          <span className="mr-2">Sign Out</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
