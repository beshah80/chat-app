"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AuthForm } from "../../../components/auth/AuthForm";

export default function SignupPage() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl text-center">
        <AuthForm type="signup" />
        <p className="mt-6 text-center text-gray-600 font-comic">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 font-bold hover:underline"
          >
            Hop back in!
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
