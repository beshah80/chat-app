"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useChatStore();
  const router = useRouter();

  const passwordStrength = useMemo(() => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }, [password]);

  const passwordStrengthLabel = useMemo(() => {
    return ["Weak", "Fair", "Good", "Strong"][passwordStrength - 1] || "Weak";
  }, [passwordStrength]);

  const validateForm = () => {
    if (type === "signup" && name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (type === "signup" && password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (type === "signup" && !acceptTerms) {
      return "You must accept the terms and privacy policy";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setIsLoading(true);
    let success = false;

    try {
      if (type === "login") {
        success = await login(email, password);
        if (!success) throw new Error("Invalid email or password");
      } else {
        success = await signup(name, email, password);
        if (!success) throw new Error("Email already exists or invalid input");
      }

      toast.success(
        type === "login" ? "Signed in successfully!" : "Signed up successfully!"
      );
      router.push("/chat");
    } catch (err: unknown) {
      // Change 'Error' to 'unknown'
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-comic text-center">
        {type === "login" ? "Welcome Back!" : "Join the Fun!"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === "signup" && (
          <>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 rounded-lg"
              disabled={isLoading}
              aria-invalid={error.includes("Name") ? "true" : "false"}
            />
          </>
        )}

        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 rounded-lg"
          disabled={isLoading}
          aria-invalid={error.includes("email") ? "true" : "false"}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 rounded-lg"
            disabled={isLoading}
            aria-invalid={error.includes("Password") ? "true" : "false"}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {type === "signup" && password && (
          <div className="text-sm font-comic dark:text-gray-300">
            Password Strength: {passwordStrengthLabel}
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${passwordStrength * 25}%`,
                  background: `linear-gradient(to right, #e74c3c, #e67e22, #3498db, #2ecc71)`,
                }}
              />
            </div>
          </div>
        )}

        {type === "signup" && (
          <div className="flex items-center gap-2 text-sm dark:text-gray-300">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 accent-blue-500"
            />
            <label>
              I accept the{" "}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        )}

        {type === "signup" && (
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 rounded-lg"
            disabled={isLoading}
            aria-invalid={error.includes("match") ? "true" : "false"}
          />
        )}

        {error && (
          <p
            className="text-sm text-red-500 dark:text-red-400 font-comic"
            role="alert"
          >
            {error}
          </p>
        )}

        {type === "login" && (
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-500 hover:underline font-comic dark:text-blue-400"
          >
            Forgot Password?
          </Link>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white font-bold text-lg rounded-full py-3 shadow-lg hover:bg-blue-600 transition-colors font-comic dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : type === "login" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            onClick={() => alert("Google login coming soon!")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.24 10.667V14.4h3.818c-.182 1.09-1.364 3.273-3.818 3.273-2.291 0-4.182-1.891-4.182-4.218s1.891-4.218 4.182-4.218c1.309 0 2.182.545 2.727 1.091l1.818-1.818C15.273 6.545 13.818 5.818 12.24 5.818c-3.273 0-5.818 2.545-5.818 5.818s2.545 5.818 5.818 5.818c3.273 0 5.455-2.182 5.455-5.818 0-.364-.036-.727-.091-1.091h-5.364z"
              />
            </svg>
            Google
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
