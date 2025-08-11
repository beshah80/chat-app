"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useChatStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (type === "signup" && name.length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    let success;
    if (type === "login") {
      success = login(email, password);
      if (!success) {
        setError("Invalid email or password");
        return;
      }
    } else {
      success = signup(name, email, password);
      if (!success) {
        setError("Email already exists or invalid input");
        return;
      }
    }

    router.push("/chat");
  };

  return (
    // The main container is now a vibrant card with pronounced rounded corners and a shadow.
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {type === "login" ? "Welcome Back!" : "Join the Fun!"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === "signup" && (
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
        )}
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>
        {/* Error message styling is updated for better visibility. */}
        {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}
        {/* The button now has a more vibrant color, rounded shape, and shadow. */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold text-lg rounded-full py-3 shadow-lg hover:bg-blue-700 transition-colors"
        >
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </motion.div>
  );
}
