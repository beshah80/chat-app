// D:\Education\Projects\ChatApp\chat-app\app\auth\login\page.tsx
// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { AuthForm } from "../../../components/auth/AuthForm";

// export default function LoginPage() {
//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl text-center">
//         <AuthForm type="login" />
//         <p className="mt-6 text-center text-gray-600 dark:text-gray-300 font-comic">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/auth/signup"
//             className="text-blue-500 dark:text-blue-400 font-bold hover:underline"
//           >
//             Join the fun!
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\app\auth\signup\page.tsx
// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link"; // ✅ Added import
// import { AuthForm } from "../../../components/auth/AuthForm";

// export default function SignupPage() {
//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl text-center">
//         <AuthForm type="signup" />
//         <p className="mt-6 text-center text-gray-600 dark:text-gray-300 font-comic">
//           Already have an account?{" "}
//           <Link
//             href="/auth/login"
//             className="text-blue-500 dark:text-blue-400 font-bold hover:underline"
//           >
//             Sign in!
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\app\chat\page.tsx
// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ChatSidebar, ChatWindow } from "../../components/chat/ChatComponents";
// import { useChatStore } from "../../store/chatStore";

// export default function ChatPage() {
//   const { currentUser, hydrated } = useChatStore();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!hydrated) return;
//     setIsLoading(false);
//     if (!currentUser) {
//       router.push("/auth/login");
//     }
//   }, [currentUser, hydrated, router]);

//   if (isLoading) {
//     return (
//       <motion.div
//         className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <p className="text-gray-600 dark:text-gray-300 font-comic animate-pulse">
//           Loading...
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="min-h-screen flex bg-gray-50 dark:bg-gray-900"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <ChatSidebar />
//       <ChatWindow />
//     </motion.div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\app\profile\page.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Mail, User, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react"; // ✅ Added useEffect here
// import { toast } from "react-hot-toast";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { useChatStore } from "../../store/chatStore";

// export default function ProfilePage() {
//   const {
//     currentUser,
//     logout,
//     updateProfile,
//     privacySettings,
//     updatePrivacySettings,
//   } = useChatStore();
//   const router = useRouter();

//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(currentUser?.name || "");
//   const [bio, setBio] = useState(currentUser?.bio || "");
//   const [avatar, setAvatar] = useState(currentUser?.avatar || "");
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   // ✅ Safe theme initialization for Next.js
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedTheme = localStorage.getItem("theme") as
//         | "light"
//         | "dark"
//         | null;

//       if (savedTheme) {
//         setTheme(savedTheme);
//         document.documentElement.classList.toggle(
//           "dark",
//           savedTheme === "dark"
//         );
//       } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//         setTheme("dark");
//         document.documentElement.classList.add("dark");
//       }
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark");
//     localStorage.setItem("theme", newTheme);
//     toast.success(`Switched to ${newTheme} mode!`);
//   };

//   const handleLogout = () => {
//     logout();
//     toast.success("Signed out successfully!");
//     router.push("/auth/login");
//   };

//   const handleSave = () => {
//     if (name.length < 2) {
//       toast.error("Name must be at least 2 characters long");
//       return;
//     }
//     updateProfile(name, avatar, bio);
//     setIsEditing(false);
//     toast.success("Profile updated!");
//   };

//   const handleDeleteAccount = () => {
//     if (
//       confirm(
//         "Are you sure you want to delete your account? This action cannot be undone."
//       )
//     ) {
//       logout();
//       toast.success("Account deleted!");
//       router.push("/auth/login");
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-6 shadow-lg"
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-300 font-comic">
//             Profile
//           </h2>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => router.push("/chat")}
//             aria-label="Close profile"
//             className="dark:text-gray-300"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>

//         {isEditing ? (
//           <div className="space-y-4">
//             <Input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your Name"
//               className="font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//             />
//             <Input
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               placeholder="Your Bio"
//               className="font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//             />
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 if (e.target.files?.[0]) {
//                   setAvatar(URL.createObjectURL(e.target.files[0]));
//                 }
//               }}
//               className="font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//             />
//             <div className="flex gap-2">
//               <Button
//                 onClick={handleSave}
//                 className="w-full font-comic dark:bg-blue-600 dark:hover:bg-blue-700"
//               >
//                 Save
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsEditing(false)}
//                 className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex flex-col items-center space-y-4">
//               <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-green-500 text-white flex items-center justify-center text-2xl font-bold animate-bounce">
//                 {avatar ? (
//                   <img
//                     src={avatar}
//                     alt="Avatar"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   currentUser?.name?.charAt(0)?.toUpperCase()
//                 )}
//               </div>
//               <div className="text-center">
//                 <h3 className="font-bold text-gray-800 dark:text-gray-300 font-comic">
//                   {currentUser?.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 font-comic">
//                   {currentUser?.bio || "Hello, I’m using Chat App!"}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 font-comic">
//                   {privacySettings.showOnlineStatus ? "Online" : "Offline"}
//                 </p>
//               </div>
//               <Button
//                 onClick={() => setIsEditing(true)}
//                 className="font-comic dark:bg-blue-600 dark:hover:bg-blue-700"
//               >
//                 Edit Profile
//               </Button>
//             </div>

//             <div className="space-y-4">
//               <h4 className="font-bold text-gray-800 dark:text-gray-300 font-comic">
//                 Contact Information
//               </h4>
//               <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
//                 <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                 <p className="text-sm text-gray-800 dark:text-gray-300 font-comic">
//                   {currentUser?.name}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
//                 <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                 <p className="text-sm text-gray-800 dark:text-gray-300 font-comic">
//                   {currentUser?.email}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="font-bold text-gray-800 dark:text-gray-300 font-comic">
//                 Privacy Settings
//               </h4>
//               <label className="flex items-center space-x-2 font-comic">
//                 <input
//                   type="checkbox"
//                   checked={privacySettings.showOnlineStatus}
//                   onChange={(e) =>
//                     updatePrivacySettings({
//                       showOnlineStatus: e.target.checked,
//                     })
//                   }
//                   className="dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <span className="dark:text-gray-300">Show Online Status</span>
//               </label>
//               <label className="flex items-center space-x-2 font-comic">
//                 <input
//                   type="checkbox"
//                   checked={privacySettings.showLastSeen}
//                   onChange={(e) =>
//                     updatePrivacySettings({ showLastSeen: e.target.checked })
//                   }
//                   className="dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <span className="dark:text-gray-300">Show Last Seen</span>
//               </label>
//             </div>

//             <div className="space-y-4">
//               <h4 className="font-bold text-gray-800 dark:text-gray-300 font-comic">
//                 Theme
//               </h4>
//               <Button
//                 onClick={toggleTheme}
//                 className="w-full font-comic dark:bg-blue-600 dark:hover:bg-blue-700"
//               >
//                 Switch to {theme === "light" ? "Dark" : "Light"} Mode
//               </Button>
//             </div>

//             <Button
//               variant="outline"
//               className="w-full justify-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 font-comic"
//               onClick={handleDeleteAccount}
//             >
//               <span className="mr-2">Delete Account</span>
//             </Button>
//           </>
//         )}

//         <Button
//           variant="outline"
//           className="w-full justify-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 font-comic"
//           onClick={handleLogout}
//         >
//           <span className="mr-2">Sign Out</span>
//         </Button>
//       </motion.div>
//     </motion.div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\app\globals.css
// @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');

// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// :root {
//   --background: #f0f4f8;
//   --foreground: #1a202c;
//   --card: #ffffff;
//   --card-foreground: #1a202c;
//   --primary: #3b82f6;
//   --primary-foreground: #ffffff;
//   --secondary: #e5e7eb;
//   --secondary-foreground: #2d3748;
//   --muted: #d1d5db;
//   --muted-foreground: #6b7280;
//   --destructive: #ef4444;
//   --destructive-foreground: #ffffff;
//   --border: #d1d5db;
//   --ring: #3b82f6;
//   --divider: #d1d5db;
//   --sidebar-header: linear-gradient(90deg, #3b82f6, #a855f7);
//   --myBubble: #FF69B4;
//   --otherBubble: #A7F3D0;
//   --myText: #FFFFFF;
//   --otherText: #1F2937;
//   --unreadBadge: #FFD700;
//   --sentIcon: #FFC0CB;
//   --deliveredIcon: #60A5FA;
//   --readIcon: #34D399;
// }

// @media (prefers-color-scheme: dark) {
//   :root {
//     --background: #1a202c;
//     --foreground: #e5e7eb;
//     --card: #2d3748;
//     --card-foreground: #e5e7eb;
//     --primary: #60a5fa;
//     --primary-foreground: #1a202c;
//     --secondary: #4b5563;
//     --secondary-foreground: #e5e7eb;
//     --muted: #6b7280;
//     --muted-foreground: #d1d5db;
//     --border: #4b5563;
//     --ring: #60a5fa;
//     --divider: #4b5563;
//     --myBubble: #FF69B4;
//     --otherBubble: #A7F3D0;
//     --myText: #FFFFFF;
//     --otherText: #1F2937;
//     --unreadBadge: #FFD700;
//     --sentIcon: #FFC0CB;
//     --deliveredIcon: #60A5FA;
//     --readIcon: #34D399;
//   }
// }

// body {
//   background-color: var(--background);
//   color: var(--foreground);
//   font-family: 'Comic Neue', sans-serif;
// }

// .scrollbar-thin {
//   scrollbar-width: thin;
//   scrollbar-color: var(--primary) var(--muted);
// }

// ::-webkit-scrollbar {
//   width: 6px;
// }

// ::-webkit-scrollbar-track {
//   background: var(--muted);
// }

// ::-webkit-scrollbar-thumb {
//   background: var(--primary);
//   border-radius: 3px;
// }

// .hamburger-button {
//   background: var(--primary);
//   color: var(--primary-foreground);
//   transition: transform 0.2s ease, background 0.2s ease;
// }

// .hamburger-button:hover {
//   transform: scale(1.1);
//   background: var(--primary-foreground);
//   color: var(--primary);
// }

// @keyframes wave {
//   0% { transform: rotate(0deg); }
//   10% { transform: rotate(14deg); }
//   20% { transform: rotate(-8deg); }
//   30% { transform: rotate(14deg); }
//   40% { transform: rotate(-4deg); }
//   50% { transform: rotate(10deg); }
//   60% { transform: rotate(0deg); }
//   100% { transform: rotate(0deg); }
// }

// @keyframes wiggle {
//   0%, 100% { transform: rotate(0deg); }
//   25% { transform: rotate(-5deg); }
//   75% { transform: rotate(5deg); }
// }

// @keyframes bounce {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
// }

// @keyframes ping {
//   75%, 100% {
//     transform: scale(1.5);
//     opacity: 0;
//   }
// }

// .animate-wave {
//   animation: wave 2s infinite;
//   transform-origin: 70% 70%;
// }

// .animate-wiggle {
//   animation: wiggle 1s infinite ease-in-out;
// }

// .animate-bounce {
//   animation: bounce 1.5s infinite ease-in-out;
// }

// .animate-ping {
//   animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
// }

// .font-comic {
//   font-family: 'Comic Neue', sans-serif;
// }

// .chat-name {
//   max-width: 150px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }

// @media (max-width: 600px) {
//   .message-bubble {
//     max-width: 85%;
//   }
// }

// D:\Education\Projects\ChatApp\chat-app\app\layout.tsx
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Chat App",
//   description: "A Telegram-like chat application",
// };

// // Simple functional fallback — works in Server Components
// function ErrorWrapper({ children }: { children: React.ReactNode }) {
//   try {
//     return <>{children}</>;
//   } catch (e) {
//     return (
//       <div className="text-red-500 dark:text-red-400 font-comic text-center p-4">
//         Something went wrong.
//       </div>
//     );
//   }
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} bg-gray-50 dark:bg-gray-900 antialiased font-comic`}
//       >
//         <ErrorWrapper>{children}</ErrorWrapper>
//       </body>
//     </html>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\app\page.module.css
// .container {
//     @apply min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800;
//   }

//   .card {
//     @apply max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-1;
//   }

//   .title {
//     @apply text-5xl font-bold text-gray-900 dark:text-white font-comic tracking-tight;
//   }

//   .description {
//     @apply text-lg text-gray-600 dark:text-gray-300 font-comic leading-relaxed;
//   }

//   .button {
//     @apply w-full bg-blue-500 text-white font-bold text-lg rounded-full py-6 shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 font-comic dark:bg-blue-600 dark:hover:bg-blue-700;
//   }

//   .buttonOutline {
//     @apply w-full text-blue-500 border-2 border-blue-500 bg-white dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 font-bold text-lg rounded-full py-6 transition-colors duration-300 font-comic;
//   }

//   D:\Education\Projects\ChatApp\chat-app\app\page.tsx

//   "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Toaster, toast } from "react-hot-toast";
// import { Button } from "../components/ui/button";
// import { useChatStore } from "../store/chatStore";

// export default function Home() {
//   const router = useRouter();
//   const { currentUser, hydrated } = useChatStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!hydrated) return;
//     setIsLoading(false);
//     if (currentUser) {
//       router.push("/chat");
//     }
//   }, [currentUser, hydrated, router]);

//   useEffect(() => {
//     const handleOnline = () => toast.success("Back online!");
//     const handleOffline = () =>
//       toast.error("You're offline. Some features may be unavailable.");
//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);
//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   if (isLoading) {
//     return (
//       <motion.div
//         className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <p className="text-gray-600 dark:text-gray-300 font-comic animate-pulse">
//           Loading...
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//     >
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-1">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <span
//               role="img"
//               aria-label="waving-hand"
//               className="text-4xl animate-wiggle"
//             >
//               👋
//             </span>
//             <h1 className="text-5xl font-bold text-gray-900 dark:text-white font-comic tracking-tight">
//               Chat App
//             </h1>
//             <span
//               role="img"
//               aria-label="sparkles"
//               className="text-4xl animate-bounce"
//             >
//               ✨
//             </span>
//           </div>
//         </div>
//         <p className="text-lg text-gray-600 dark:text-gray-300 font-comic leading-relaxed">
//           Ready to get your chat on? Join the fun and connect with friends in an
//           instant!
//         </p>
//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold font-comic dark:text-white">
//             Why Chat App?
//           </h2>
//           <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-comic dark:text-gray-300">
//               Real-time messaging
//             </li>
//             <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-comic dark:text-gray-300">
//               Fun, vibrant design
//             </li>
//             <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-comic dark:text-gray-300">
//               Secure and private
//             </li>
//           </ul>
//         </div>
//         <div className="space-y-4">
//           <Button
//             className="w-full bg-blue-500 text-white font-bold text-lg rounded-full py-6 shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 font-comic dark:bg-blue-600 dark:hover:bg-blue-700"
//             onClick={() => router.push("/auth/login")}
//           >
//             Sign In
//           </Button>
//           <Button
//             variant="outline"
//             className="w-full text-blue-500 border-2 border-blue-500 bg-white dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 font-bold text-lg rounded-full py-6 transition-colors duration-300 font-comic"
//             onClick={() => router.push("/auth/signup")}
//           >
//             Sign Up
//           </Button>
//         </div>
//       </div>
//       <Toaster position="top-right" />
//     </motion.div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\components\auth\AuthForm.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Eye, EyeOff, Loader } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useChatStore } from "../../store/chatStore";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

// interface AuthFormProps {
//   type: "login" | "signup";
// }

// export function AuthForm({ type }: AuthFormProps) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, signup } = useChatStore();
//   const router = useRouter();

//   const getPasswordStrength = (password: string) => {
//     let strength = 0;
//     if (password.length >= 6) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//     return strength;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (type === "signup" && name.length < 2) {
//       setError("Name must be at least 2 characters long");
//       toast.error("Name must be at least 2 characters long");
//       setIsLoading(false);
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Please enter a valid email");
//       toast.error("Please enter a valid email");
//       setIsLoading(false);
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       toast.error("Password must be at least 6 characters long");
//       setIsLoading(false);
//       return;
//     }

//     let success;
//     if (type === "login") {
//       success = login(email, password);
//       if (!success) {
//         setError("Invalid email or password");
//         toast.error("Invalid email or password");
//         setIsLoading(false);
//         return;
//       }
//     } else {
//       success = signup(name, email, password);
//       if (!success) {
//         setError("Email already exists or invalid input");
//         toast.error("Email already exists or invalid input");
//         setIsLoading(false);
//         return;
//       }
//     }

//     toast.success(
//       type === "login" ? "Signed in successfully!" : "Signed up successfully!"
//     );
//     setIsLoading(false);
//     router.push("/chat");
//   };

//   return (
//     <motion.div
//       className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-comic">
//         {type === "login" ? "Welcome Back!" : "Join the Fun!"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {type === "signup" && (
//           <div>
//             <Input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//               disabled={isLoading}
//             />
//           </div>
//         )}
//         <div>
//           <Input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//             disabled={isLoading}
//           />
//         </div>
//         <div className="relative">
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Your Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//             disabled={isLoading}
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 dark:text-gray-300"
//             onClick={() => setShowPassword(!showPassword)}
//             aria-label={showPassword ? "Hide password" : "Show password"}
//             disabled={isLoading}
//           >
//             {showPassword ? (
//               <EyeOff className="h-4 w-4" />
//             ) : (
//               <Eye className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//         {type === "signup" && password && (
//           <div className="text-sm font-comic dark:text-gray-300">
//             Password Strength:{" "}
//             {["Weak", "Fair", "Good", "Strong"][
//               getPasswordStrength(password) - 1
//             ] || "Weak"}
//             <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
//               <div
//                 className={`h-full rounded-full ${
//                   getPasswordStrength(password) === 1
//                     ? "bg-red-500"
//                     : getPasswordStrength(password) === 2
//                     ? "bg-yellow-500"
//                     : getPasswordStrength(password) === 3
//                     ? "bg-blue-500"
//                     : "bg-green-500"
//                 }`}
//                 style={{ width: `${getPasswordStrength(password) * 25}%` }}
//               />
//             </div>
//           </div>
//         )}
//         {error && (
//           <p className="text-sm text-red-500 dark:text-red-400 font-comic">
//             {error}
//           </p>
//         )}
//         {type === "login" && (
//           <Link
//             href="/auth/forgot-password"
//             className="text-sm text-blue-500 hover:underline font-comic dark:text-blue-400"
//           >
//             Forgot Password?
//           </Link>
//         )}
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-500 text-white font-bold text-lg rounded-full py-3 shadow-lg hover:bg-blue-600 transition-colors font-comic dark:bg-blue-600 dark:hover:bg-blue-700"
//         >
//           {isLoading ? (
//             <Loader className="h-5 w-5 animate-spin" />
//           ) : type === "login" ? (
//             "Sign In"
//           ) : (
//             "Sign Up"
//           )}
//         </Button>
//         <div className="flex gap-4 justify-center">
//           <Button
//             variant="outline"
//             className="flex items-center gap-2 font-comic dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
//             onClick={() => alert("Google login coming soon!")}
//             disabled={isLoading}
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M12.24 10.667V14.4h3.818c-.182 1.09-1.364 3.273-3.818 3.273-2.291 0-4.182-1.891-4.182-4.218s1.891-4.218 4.182-4.218c1.309 0 2.182.545 2.727 1.091l1.818-1.818C15.273 6.545 13.818 5.818 12.24 5.818c-3.273 0-5.818 2.545-5.818 5.818s2.545 5.818 5.818 5.818c3.273 0 5.455-2.182 5.455-5.818 0-.364-.036-.727-.091-1.091h-5.364z"
//               />
//             </svg>
//             Google
//           </Button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\components\chat\ChatComponents.tsx
// "use client";

// import { motion } from "framer-motion";
// import {
//   Check,
//   CheckCheck,
//   Clock,
//   Menu,
//   MoreVertical,
//   Phone,
//   Search,
//   Send,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useChatStore } from "../../store/chatStore";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

// // Refined color palette - vibrant and opaque
// const sillyColors = {
//   background: "#F0F4F8",
//   chatBackground: "#F9FAFB",
//   myBubble: "#FF69B4", // Hot Pink
//   otherBubble: "#A7F3D0", // Light Emerald
//   myText: "#FFFFFF",
//   otherText: "#1F2937",
//   header: "#FFFFFF",
//   border: "#D1D5DB",
//   secondaryText: "#6B7280",
//   unreadBadge: "#FFD700", // Gold
//   sentIcon: "#FFC0CB", // Light Pink
//   deliveredIcon: "#60A5FA", // Sky Blue
//   readIcon: "#34D399", // Lime Green
// };

// interface Message {
//   id: string;
//   content: string;
//   timestamp: Date;
//   isOwn: boolean;
//   status: "sent" | "delivered" | "read";
//   senderId: string;
// }

// function formatTime(date: Date) {
//   const now = new Date();
//   const diffInHours =
//     Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
//   if (diffInHours < 1) {
//     const minutes = Math.floor(diffInHours * 60);
//     return minutes < 1 ? "just now" : `${minutes}m ago`;
//   } else if (diffInHours < 24) {
//     return `${Math.floor(diffInHours)}h ago`;
//   } else {
//     const days = Math.floor(diffInHours / 24);
//     return days === 1 ? "yesterday" : `${days}d ago`;
//   }
// }

// function formatMessageTime(date: Date) {
//   const today = new Date();
//   const isToday = date.toDateString() === today.toDateString();
//   const isYesterday =
//     new Date(date.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
//     today.toDateString();

//   if (isToday) {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   } else if (isYesterday) {
//     return `Yesterday at ${date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`;
//   } else {
//     return date.toLocaleString([], {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }
// }

// function MessageStatusIcon({ status }: { status: string }) {
//   switch (status) {
//     case "sent":
//       return <Clock className={`h-3 w-3 text-[${sillyColors.sentIcon}]`} />;
//     case "delivered":
//       return (
//         <Check className={`h-3 w-3 text-[${sillyColors.deliveredIcon}]`} />
//       );
//     case "read":
//       return (
//         <CheckCheck className={`h-3 w-3 text-[${sillyColors.readIcon}]`} />
//       );
//     default:
//       return null;
//   }
// }

// interface MessageBubbleProps {
//   message: Message;
//   previousMessage?: Message;
// }

// function MessageBubble({ message, previousMessage }: MessageBubbleProps) {
//   const showAvatar =
//     !message.isOwn &&
//     (!previousMessage ||
//       previousMessage.senderId !== message.senderId ||
//       new Date(message.timestamp).getTime() -
//         new Date(previousMessage.timestamp).getTime() >
//         5 * 60 * 1000);

//   return (
//     <motion.div
//       className={`flex ${
//         message.isOwn ? "justify-end" : "justify-start"
//       } mb-1.5`}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.2 }}
//     >
//       <div
//         className={`flex items-end space-x-1.5 max-w-[70%] ${
//           message.isOwn ? "flex-row-reverse space-x-reverse" : ""
//         }`}
//       >
//         {showAvatar && !message.isOwn && (
//           <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
//             {message.senderId.charAt(0).toUpperCase()}
//           </div>
//         )}
//         {!showAvatar && !message.isOwn && <div className="w-5" />}
//         <div
//           className={`px-3 py-2 rounded-2xl relative shadow-lg transform hover:scale-105 transition-transform duration-200 ${
//             message.isOwn
//               ? `bg-[${sillyColors.myBubble}] text-[${sillyColors.myText}] rounded-br-sm`
//               : `bg-[${sillyColors.otherBubble}] text-[${sillyColors.otherText}] border border-gray-200 rounded-bl-sm`
//           }`}
//         >
//           <p className="text-sm leading-tight break-words font-comic">
//             {message.content}
//           </p>
//           <div
//             className={`flex items-center justify-end space-x-1 mt-0.5 text-[10px] ${
//               message.isOwn ? "text-white/70" : "text-gray-500"
//             }`}
//           >
//             <span>{formatMessageTime(message.timestamp)}</span>
//             {message.isOwn && <MessageStatusIcon status={message.status} />}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export function ChatSidebar() {
//   const { chats, activeChat, setActiveChat, sidebarOpen, toggleSidebar } =
//     useChatStore();
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   // Reset sidebarOpen to true on large screens to ensure hamburger menu doesn't persist
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         // Tailwind's 'md' breakpoint
//         useChatStore.getState().setViewMode("chats"); // Ensure sidebarOpen is true on large screens
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize(); // Initial check
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const filteredChats = chats.filter((chat) =>
//     chat.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       {sidebarOpen && (
//         <motion.div
//           className="md:hidden fixed inset-0 bg-black/20 z-40"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={toggleSidebar}
//         />
//       )}
//       <motion.aside
//         className={`fixed inset-y-0 left-0 z-50 w-60 bg-[${
//           sillyColors.chatBackground
//         }] border-r border-gray-200 flex flex-col h-full md:static md:flex md:w-60 md:min-w-[240px] md:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         initial={false}
//         animate={{ x: sidebarOpen ? 0 : -240 }}
//         transition={{ type: "spring", stiffness: 400, damping: 30 }}
//       >
//         <div className="p-2 border-b border-gray-200 bg-white shadow-md">
//           <div className="flex items-center justify-between mb-2">
//             <button
//               onClick={() => router.push("/profile")}
//               className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
//             >
//               <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
//                 P
//               </div>
//               <span className="font-bold text-sm text-gray-800 font-comic">
//                 Profile
//               </span>
//             </button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleSidebar}
//               className="hover:bg-gray-100 md:hidden"
//             >
//               <Menu className="h-4 w-4 text-gray-600" />
//             </Button>
//           </div>
//           <div className="relative">
//             <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
//             <Input
//               placeholder="Search for your buddies..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 bg-gray-100 border-transparent text-xs rounded-full h-8 focus:bg-white focus:border-purple-400 font-comic"
//             />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto scrollbar-thin">
//           <div className="space-y-0.5 p-1">
//             {filteredChats.map((chat) => (
//               <motion.div
//                 key={chat.id}
//                 className={`px-2 py-2.5 rounded-lg cursor-pointer transition-colors border-t border-divider first:border-t-0 ${
//                   activeChat === chat.id
//                     ? "bg-blue-100 shadow-inner"
//                     : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => {
//                   setActiveChat(chat.id);
//                   if (sidebarOpen) toggleSidebar();
//                 }}
//                 whileHover={{ scale: 1.01, backgroundColor: "#E6F6FF" }}
//                 whileTap={{ scale: 0.99 }}
//               >
//                 <div className="flex items-center space-x-2">
//                   <div className="relative flex-shrink-0">
//                     <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
//                       {chat.name.charAt(0).toUpperCase()}
//                     </div>
//                     {chat.isOnline && (
//                       <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full animate-ping" />
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <h3
//                         className={`font-bold text-xs truncate font-comic ${
//                           activeChat === chat.id
//                             ? "text-blue-500"
//                             : "text-gray-800"
//                         }`}
//                       >
//                         {chat.name}
//                       </h3>
//                       <span className="text-[10px] text-gray-500 flex-shrink-0">
//                         {formatTime(chat.lastMessageTime)}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-[11px] text-gray-600 truncate font-comic">
//                         {chat.lastMessage}
//                       </p>
//                       {chat.unreadCount > 0 && (
//                         <motion.div
//                           className={`ml-2 px-1.5 py-0.5 bg-[${sillyColors.unreadBadge}] text-gray-800 rounded-full text-[10px] font-bold min-w-[18px] text-center`}
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 500 }}
//                         >
//                           {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
//                         </motion.div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//             {filteredChats.length === 0 && (
//               <div className="p-6 text-center text-gray-500 text-xs font-comic">
//                 No chats found. So lonely...
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="p-2 border-t border-gray-200 bg-white shadow-inner">
//           <div className="flex items-center justify-between text-[10px] text-gray-500 font-comic">
//             <span>Chat App 😜</span>
//             <span>v1.0.1</span>
//           </div>
//         </div>
//       </motion.aside>
//     </>
//   );
// }

// export function ChatWindow() {
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { chats, messages, activeChat, sendMessage, toggleSidebar } =
//     useChatStore();

//   // Ensure hamburger menu is hidden on large screens after resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         // Tailwind's 'md' breakpoint
//         useChatStore.getState().setViewMode("chats"); // Set sidebarOpen: true
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize(); // Initial check
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const currentChat = chats.find((chat) => chat.id === activeChat);
//   const chatMessages = useMemo(
//     () => (activeChat ? messages[activeChat] || [] : []),
//     [activeChat, messages]
//   );

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   useEffect(() => {
//     if (activeChat && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [activeChat]);

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim() || !activeChat) return;
//     sendMessage(activeChat, message.trim());
//     setMessage("");
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (message.trim() && activeChat) {
//         sendMessage(activeChat, message.trim());
//         setMessage("");
//       }
//     }
//   };

//   if (!activeChat || !currentChat) {
//     return (
//       <div
//         className={`flex-1 flex items-center justify-center bg-[${sillyColors.chatBackground}]`}
//       >
//         <motion.div
//           className="text-center space-y-4"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, type: "spring" }}
//         >
//           <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
//             <Send className="w-8 h-8 text-[#FF69B4] animate-bounce" />
//           </div>
//           <div>
//             <h3 className="text-base font-bold text-gray-800 animate-pulse font-comic">
//               Start a wacky conversation!
//             </h3>
//             <p className="text-xs text-gray-600 max-w-xs mx-auto font-comic">
//               Pick a friend from the left sidebar and let the silliness begin!
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`flex-1 flex flex-col h-full bg-[${sillyColors.chatBackground}]`}
//     >
//       <motion.header
//         className={`p-2.5 border-b border-gray-200 bg-[${sillyColors.header}] flex items-center justify-between shadow-md`}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={toggleSidebar}
//             className="md:hidden"
//           >
//             <Menu className="h-4 w-4 text-gray-600" />
//           </Button>
//           <div className="relative">
//             <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
//               {currentChat.name.charAt(0).toUpperCase()}
//             </div>
//             {currentChat.isOnline && (
//               <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 border border-white rounded-full animate-ping" />
//             )}
//           </div>
//           <div>
//             <h2 className="font-bold text-sm text-gray-800 font-comic">
//               {currentChat.name}
//             </h2>
//             <p className="text-[11px] text-gray-600 font-comic">
//               {currentChat.isOnline
//                 ? "Online and ready to party!"
//                 : "Out doing something boring"}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Button variant="ghost" size="icon" className="hover:bg-gray-100">
//             <Phone className="h-4 w-4 text-gray-600" />
//           </Button>
//           <Button variant="ghost" size="icon" className="hover:bg-gray-100">
//             <MoreVertical className="h-4 w-4 text-gray-600" />
//           </Button>
//         </div>
//       </motion.header>
//       <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
//         {chatMessages.map((msg, index) => (
//           <MessageBubble
//             key={msg.id}
//             message={msg}
//             previousMessage={chatMessages[index - 1]}
//           />
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <motion.form
//         onSubmit={handleSendMessage}
//         className="p-2 border-t border-gray-200 bg-white shadow-lg"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="flex items-end space-x-1.5">
//           <Input
//             ref={inputRef}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your funny thoughts here..."
//             className="resize-none min-h-[36px] max-h-20 bg-gray-100 border-transparent rounded-full text-xs font-comic"
//           />
//           <Button
//             type="submit"
//             size="icon"
//             disabled={!message.trim()}
//             className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
//           >
//             <Send className="h-4 w-4 text-white" />
//           </Button>
//         </div>
//       </motion.form>
//     </div>
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\components\ui\button.tsx
// "use client";

// import { Slot } from "@radix-ui/react-slot";
// import { cva, type VariantProps } from "class-variance-authority";
// import * as React from "react";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     // Filter and log invalid props
//     const validProps = Object.fromEntries(
//       (Object.entries(props) as [keyof typeof props, any][]).filter(([key]) => {
//         const isValid = [
//           "children",
//           "className",
//           "onClick",
//           "type",
//           "disabled",
//           "aria-label",
//           "aria-disabled",
//           "role",
//           "id",
//           "name",
//           "value",
//           "onMouseEnter",
//           "onMouseLeave",
//           "onFocus",
//           "onBlur",
//         ].includes(key as string);

//         if (!isValid) {
//           console.warn(
//             `Button: Invalid prop detected: ${String(key)}=${JSON.stringify(
//               props[key]
//             )}`
//           );
//         }
//         return isValid;
//       })
//     );

//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={buttonVariants({ variant, size, className })}
//         ref={ref}
//         {...validProps}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };

// D:\Education\Projects\ChatApp\chat-app\components\ui\imageWithFallback.tsx
// "use client";

// import Image, { ImageProps } from "next/image";
// import { useState } from "react";

// interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
//   src: string;
//   fallbackSrc?: string;
//   alt?: string;
// }

// export function ImageWithFallback({
//   src,
//   fallbackSrc = "/placeholder-image.png",
//   alt = "Image",
//   className,
//   ...props
// }: ImageWithFallbackProps) {
//   const [imgSrc, setImgSrc] = useState(src);

//   return (
//     <Image
//       src={imgSrc}
//       alt={alt}
//       className={className}
//       onError={() => setImgSrc(fallbackSrc)}
//       width={200}
//       height={200}
//       {...props}
//     />
//   );
// }

// D:\Education\Projects\ChatApp\chat-app\components\ui\input.tsx
// import * as React from "react";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className = "", type = "text", ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
//           file:border-0 file:bg-transparent file:text-sm file:font-medium
//           placeholder:text-muted-foreground
//           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
//           disabled:cursor-not-allowed disabled:opacity-50
//           ${className}`}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );

// Input.displayName = "Input";

// export { Input };

// D:\Education\Projects\ChatApp\chat-app\store\chatStore.ts
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { style } from "framer-motion/client"

// interface Message {
//   id: string;
//   content: string;
//   timestamp: Date;
//   isOwn: boolean;
//   status: "sent" | "delivered" | "read";
//   senderId: string;
//   type?: "text" | "image";
//   replyTo?: string;
// }

// interface Chat {
//   id: string;
//   name: string;
//   lastMessage: string;
//   lastMessageTime: Date;
//   isOnline: boolean;
//   unreadCount: number;
//   isPinned: boolean;
//   isArchived: boolean;
// }

// interface Contact {
//   id: string;
//   name: string;
//   phone: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   bio?: string;
// }

// interface PrivacySettings {
//   showOnlineStatus: boolean;
//   showLastSeen: boolean;
// }

// interface ChatState {
//   currentUser: User | null;
//   chats: Chat[];
//   messages: { [chatId: string]: Message[] };
//   activeChat: string | null;
//   sidebarOpen: boolean;
//   viewMode: "chats" | "contacts";
//   contacts: Contact[];
//   replyingTo: string | null;
//   privacySettings: PrivacySettings;
//   login: (email: string, password: string) => boolean;
//   signup: (name: string, email: string, password: string) => boolean;
//   logout: () => void;
//   updateProfile: (name: string, avatar?: string, bio?: string) => void;
//   updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
//   sendMessage: (
//     chatId: string,
//     content: string,
//     replyTo?: string,
//     type?: "text" | "image"
//   ) => boolean;
//   editMessage: (chatId: string, messageId: string, newContent: string) => void;
//   deleteMessage: (messageId: string, chatId: string) => void;
//   setActiveChat: (chatId: string) => void;
//   toggleSidebar: () => void;
//   setViewMode: (mode: "chats" | "contacts") => void;
//   addContact: (name: string, phone: string) => boolean;
//   createGroupChat: (name: string, memberIds: string[]) => void;
//   pinChat: (chatId: string) => void;
//   archiveChat: (chatId: string) => void;
//   setReplyingTo: (messageId: string | null) => void;
//   hydrated: boolean;
// }

// export const useChatStore = create<ChatState>()(
//   persist(
//     (set, get) => ({
//       currentUser: null,
//       activeChat: null,
//       sidebarOpen: false,
//       viewMode: "chats",
//       contacts: [],
//       replyingTo: null,
//       privacySettings: { showOnlineStatus: true, showLastSeen: true },
//       hydrated: false,

//       login: (email, password) => {
//         const users = JSON.parse(localStorage.getItem("users") || "{}");
//         if (users[email]?.password === password) {
//           set({
//             currentUser: {
//               id: users[email].id,
//               name: users[email].name,
//               email,
//               avatar: users[email].avatar,
//               bio: users[email].bio,
//             },
//           });
//           return true;
//         }
//         return false;
//       },

//       signup: (name, email, password) => {
//         const users = JSON.parse(localStorage.getItem("users") || "{}");
//         if (users[email]) return false;
//         const userId = Math.random().toString(36).substring(2);
//         users[email] = { id: userId, name, password, avatar: "", bio: "" };
//         localStorage.setItem("users", JSON.stringify(users));
//         set({
//           currentUser: { id: userId, name, email, avatar: "", bio: "" },
//           contacts: [
//             ...get().contacts,
//             { id: userId, name, phone: "N/A" },
//           ],
//         });
//         return true;
//       },

//       logout: () => {
//         set({ currentUser: null, activeChat: null, messages: {}, chats: [] });
//       },

//       updateProfile: (name, avatar, bio) => {
//         const users = JSON.parse(localStorage.getItem("users") || "{}");
//         if (get().currentUser) {
//           users[get().currentUser!.email] = {
//             ...users[get().currentUser!.email],
//             name,
//             avatar,
//             bio,
//           };
//           localStorage.setItem("users", JSON.stringify(users));
//           set({
//             currentUser: { ...get().currentUser!, name, avatar, bio },
//             contacts: get().contacts.map((contact) =>
//               contact.id === get().currentUser!.id
//                 ? { ...contact, name }
//                 : contact
//             ),
//           });
//         }
//       },

//       updatePrivacySettings: (settings) => {
//         set({ privacySettings: { ...get().privacySettings, ...settings } });
//       },

//       sendMessage: (chatId, content, replyTo, type = "text") => {
//         const { messages, chats, currentUser } = get();
//         if (!currentUser) return false;

//         if (type === "image") {
//           const imageCount = (messages[chatId] || []).filter(
//             (msg) => msg.type === "image"
//           ).length;
//           if (imageCount >= 5) return false;
//         }

//         const message: Message = {
//           id: Math.random().toString(36).substring(2),
//           content,
//           timestamp: new Date(),
//           isOwn: true,
//           status: "sent",
//           senderId: currentUser.id,
//           type,
//           replyTo,
//         };

//         const updatedMessages = {
//           ...messages,
//           [chatId]: [...(messages[chatId] || []), message],
//         };

//         const chat = chats.find((c) => c.id === chatId);
//         if (chat) {
//           set({
//             messages: updatedMessages,
//             chats: chats.map((c) =>
//               c.id === chatId
//                 ? {
//                     ...c,
//                     lastMessage: type === "image" ? "Image" : content,
//                     lastMessageTime: new Date(),
//                     unreadCount: c.isOnline ? c.unreadCount : c.unreadCount + 1,
//                   }
//                 : c
//             ),
//           });

//           setTimeout(() => {
//             set({
//               messages: {
//                 ...get().messages,
//                 [chatId]: get().messages[chatId].map((msg) =>
//                   msg.id === message.id ? { ...msg, status: "delivered" } : msg
//                 ),
//               },
//             });
//             setTimeout(() => {
//               set({
//                 messages: {
//                   ...get().messages,
//                   [chatId]: get().messages[chatId].map((msg) =>
//                     msg.id === message.id ? { ...msg, status: "read" } : msg
//                   ),
//                 },
//                 chats: get().chats.map((c) =>
//                   c.id === chatId ? { ...c, unreadCount: 0 } : c
//                 ),
//               });
//             }, 1000);
//           }, 500);
//         }
//         return true;
//       },

//       editMessage: (chatId, messageId, newContent) => {
//         set({
//           messages: {
//             ...get().messages,
//             [chatId]: get().messages[chatId].map((msg) =>
//               msg.id === messageId ? { ...msg, content: newContent } : msg
//             ),
//           },
//           chats: get().chats.map((c) =>
//             c.id === chatId
//               ? { ...c, lastMessage: newContent, lastMessageTime: new Date() }
//               : c
//           ),
//         });
//       },

//       deleteMessage: (messageId, chatId) => {
//         const remainingMessages = get().messages[chatId].filter(
//           (msg) => msg.id !== messageId
//         );
//         const lastMessage =
//           remainingMessages[remainingMessages.length - 1]?.content || "";
//         set({
//           messages: { ...get().messages, [chatId]: remainingMessages },
//           chats: get().chats.map((c) =>
//             c.id === chatId
//               ? {
//                   ...c,
//                   lastMessage,
//                   lastMessageTime:
//                     remainingMessages[remainingMessages.length - 1]?.timestamp ||
//                     c.lastMessageTime,
//                 }
//               : c
//           ),
//         });
//       },

//       setActiveChat: (chatId) => {
//         set({
//           activeChat: chatId,
//           chats: get().chats.map((c) =>
//             c.id === chatId ? { ...c, unreadCount: 0 } : c
//           ),
//         });
//       },

//       toggleSidebar: () => {
//         set({ sidebarOpen: !get().sidebarOpen });
//       },

//       setViewMode: (mode) => {
//         set({ viewMode: mode });
//       },

//       addContact: (name, phone) => {
//         if (!name || !phone || !/^\+?\d{10,15}$/.test(phone)) return false;
//         const contactId = Math.random().toString(36).substring(2);
//         const newContact: Contact = { id: contactId, name, phone };
//         set({
//           contacts: [...get().contacts, newContact],
//           chats: [
//             ...get().chats,
//             {
//               id: contactId,
//               name,
//               lastMessage: "",
//               lastMessageTime: new Date(),
//               isOnline: Math.random() > 0.5,
//               unreadCount: 0,
//               isPinned: false,
//               isArchived: false,
//             },
//           ],
//         });
//         return true;
//       },

//       createGroupChat: (name, memberIds) => {
//         const chatId = Math.random().toString(36).substring(2);
//         set({
//           chats: [
//             ...get().chats,
//             {
//               id: chatId,
//               name,
//               lastMessage: "",
//               lastMessageTime: new Date(),
//               isOnline: true,
//               unreadCount: 0,
//               isPinned: false,
//               isArchived: false,
//             },
//           ],
//           activeChat: chatId,
//         });
//       },

//       pinChat: (chatId) => {
//         set({
//           chats: get().chats.map((c) =>
//             c.id === chatId ? { ...c, isPinned: !c.isPinned } : c
//           ),
//         });
//       },

//       archiveChat: (chatId) => {
//         set({
//           chats: get().chats.map((c) =>
//             c.id === chatId ? { ...c, isArchived: !c.isArchived } : c
//           ),
//         });
//       },

//       setReplyingTo: (messageId) => {
//         set({ replyingTo: messageId });
//       },

//       // Initial mock chats/messages
//       ...(() => {
//         const mockChats: Chat[] = [
//           {
//             id: "1",
//             name: "Alice",
//             lastMessage: "Hey, what's up?",
//             lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
//             isOnline: true,
//             unreadCount: 2,
//             isPinned: false,
//             isArchived: false,
//           },
//           {
//             id: "2",
//             name: "Bob",
//             lastMessage: "Let's catch up soon!",
//             lastMessageTime: new Date(Date.now() - 60 * 60 * 1000),
//             isOnline: false,
//             unreadCount: 0,
//             isPinned: false,
//             isArchived: false,
//           },
//         ];

//         const mockMessages: { [chatId: string]: Message[] } = {
//           "1": [
//             {
//               id: "m1",
//               content: "Hey, what's up?",
//               timestamp: new Date(Date.now() - 5 * 60 * 1000),
//               isOwn: false,
//               status: "read",
//               senderId: "alice",
//             },
//             {
//               id: "m2",
//               content: "Not much, you?",
//               timestamp: new Date(Date.now() - 4 * 60 * 1000),
//               isOwn: true,
//               status: "read",
//               senderId: "user",
//             },
//           ],
//           "2": [
//             {
//               id: "m3",
//               content: "Let's catch up soon!",
//               timestamp: new Date(Date.now() - 60 * 60 * 1000),
//               isOwn: false,
//               status: "read",
//               senderId: "bob",
//             },
//           ],
//         };

//         return { chats: mockChats, messages: mockMessages };
//       })(),
//     }),
//     {
//       name: "chat-storage",
//       partialize: (state) => ({
//         currentUser: state.currentUser,
//         chats: state.chats,
//         messages: state.messages,
//         contacts: state.contacts,
//         privacySettings: state.privacySettings,
//       }),
//       onRehydrateStorage: () => {
//         return (state) => {
//           if (state) {
//             // Convert persisted strings back to Date objects
//             state.chats = state.chats.map(chat => ({
//               ...chat,
//               lastMessageTime: new Date(chat.lastMessageTime),
//             }));

//             Object.keys(state.messages).forEach(chatId => {
//               state.messages[chatId] = state.messages[chatId].map(msg => ({
//                 ...msg,
//                 timestamp: new Date(msg.timestamp),
//               }));
//             });

//             state.hydrated = true;
//           }
//         };
//       },
//     }
//   )
// );

// // this is my chat App I try to build but
// 1, it have so many problems
// -chat is not visible
// -and it lose many functionality
// -and error in style
// - and I want to make it full stack but for now front end and I want that to be styled great functionlity even it is beginer level

// 2, I want you to
// - solve the problem first
// - no error making
// - another but great style
// - use another chat app that work by students
// -rewrite full code don't remove code but make it better
// - let go
