"use client";

import { motion } from "framer-motion";
import { Mail, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/ui/imageWithFallback";
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
      className="min-h-screen bg-background flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-card rounded-2xl p-6 space-y-6 shadow-sm"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/chat")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <ImageWithFallback
            src={
              currentUser?.avatar ||
              "https://ui-avatars.com/api/?name=User&background=0ea5e9&color=fff"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center">
            <h3 className="font-semibold text-foreground">
              {currentUser?.name}
            </h3>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Contact Information</h4>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-foreground">{currentUser?.name}</p>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-foreground">{currentUser?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <span className="mr-2">Sign Out</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
