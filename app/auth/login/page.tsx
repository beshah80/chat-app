"use client";

import Link from "next/link";
import { AuthForm } from "../../../components/auth/AuthForm";

export default function LoginPage() {
  return (
    // The container now has a vibrant gradient background to match the home page.
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl text-center">
        {/* The AuthForm component is a separate part of the app, so we can't style it directly here,
            but we can style the container around it. */}
        <AuthForm type="login" />
        <p className="mt-6 text-center text-gray-600 font-medium">
          Don&apos;t have an account?{" "}
          {/* Link to the signup page, now with a more playful primary color and a hover effect. */}
          <Link
            href="/auth/signup"
            className="text-blue-600 font-bold hover:underline"
          >
            Join the fun!
          </Link>
        </p>
      </div>
    </div>
  );
}
