"use client";

import { Mail, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/ui/imageWithFallback";
import { Input } from "../../components/ui/input";
import { useChatStore } from "../../store/chatStore";

export default function ProfilePage() {
  const {
    currentUser,
    logout,
    updateProfile,
    privacySettings,
    updatePrivacySettings,
  } = useChatStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    toast.success(`Switched to ${newTheme} mode!`);
  };

  const handleSave = () => {
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }
    updateProfile(name, avatar, bio);
    setIsEditing(false);
    toast.success("Profile updated!");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      logout();
      toast.success("Account deleted!");
      router.push("/auth/login");
    }
  };

  const navigate = (path: string) => {
    toast.success(`Navigating to ${path}...`);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-6xl font-black text-gray-900 dark:text-white font-comic tracking-tight drop-shadow-md">
            Profile ✨
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/chat")}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Return to chat"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-2xl text-base p-3 font-comic focus:bg-white dark:focus:bg-gray-900 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
              aria-label="Edit name"
            />
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your Bio"
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-2xl text-base p-3 font-comic focus:bg-white dark:focus:bg-gray-900 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
              aria-label="Edit bio"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setAvatar(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-2xl text-base font-comic focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
              aria-label="Upload avatar image"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 text-white font-comic font-bold text-lg rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
                aria-label="Save profile changes"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="w-full text-blue-700 border-2 border-blue-700 bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-800 font-comic font-bold text-lg rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
                aria-label="Cancel editing"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                {avatar ? (
                  <ImageWithFallback
                    src={avatar}
                    alt="User avatar"
                    className="w-28 h-28 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-blue-700 dark:bg-blue-300 text-white dark:text-gray-900 flex items-center justify-center text-3xl font-bold font-comic shadow-lg">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-comic">
                  {currentUser?.name || "User"}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 font-comic leading-relaxed">
                  {currentUser?.bio || "Hello, I’m using Chat App!"}
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300 font-comic">
                  {privacySettings.showOnlineStatus ? "Online" : "Offline"}
                </p>
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 text-white font-comic font-bold text-lg rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
                aria-label="Edit profile"
              >
                Edit Profile
              </Button>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white font-comic">
                Contact Information
              </h4>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <User
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  aria-hidden="true"
                />
                <p className="text-base text-gray-800 dark:text-gray-200 font-comic">
                  {currentUser?.name || "User"}
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                <Mail
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  aria-hidden="true"
                />
                <p className="text-base text-gray-800 dark:text-gray-200 font-comic">
                  {currentUser?.email || "email@example.com"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white font-comic">
                Privacy Settings
              </h4>
              <label className="flex items-center space-x-3 font-comic">
                <input
                  type="checkbox"
                  checked={privacySettings.showOnlineStatus}
                  onChange={(e) =>
                    updatePrivacySettings({
                      showOnlineStatus: e.target.checked,
                    })
                  }
                  className="h-5 w-5 text-blue-700 focus:ring-blue-400 dark:focus:ring-blue-600 rounded"
                  aria-label="Toggle show online status"
                />
                <span className="text-base text-gray-800 dark:text-gray-200">
                  Show Online Status
                </span>
              </label>
              <label className="flex items-center space-x-3 font-comic">
                <input
                  type="checkbox"
                  checked={privacySettings.showLastSeen}
                  onChange={(e) =>
                    updatePrivacySettings({ showLastSeen: e.target.checked })
                  }
                  className="h-5 w-5 text-blue-700 focus:ring-blue-400 dark:focus:ring-blue-600 rounded"
                  aria-label="Toggle show last seen"
                />
                <span className="text-base text-gray-800 dark:text-gray-200">
                  Show Last Seen
                </span>
              </label>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white font-comic">
                Theme
              </h4>
              <Button
                onClick={toggleTheme}
                className="w-full bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 dark:from-purple-600 dark:to-purple-500 dark:hover:from-purple-700 dark:hover:to-purple-600 text-white font-comic font-bold text-lg rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-purple-600"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
              >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full text-red-500 border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950 font-comic font-bold text-lg rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-600"
              onClick={handleDeleteAccount}
              aria-label="Delete account"
            >
              Delete Account
            </Button>
          </>
        )}

        <Button
          variant="outline"
          className="w-full text-red-500 border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950 font-comic font-bold text-lg rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-600"
          onClick={() => {
            logout();
            toast.success("Signed out!");
            navigate("/auth/login");
          }}
          aria-label="Sign out"
        >
          Sign Out
        </Button>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
