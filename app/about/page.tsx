"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function About() {
  const router = useRouter();

  const team = [
    {
      name: "Fanuel Derbe",
      role: "Backend Developer",
      description:
        "Fanuel is our backend expert, building robust APIs and ensuring data integrity.",
      linkedin: "https://www.linkedin.com/in/fanuel",
      telegram: "https://t.me/fanuel",
      github: "https://github.com/fanuel",
    },
    {
      name: "Beshah Ashenafi",
      role: "Frontend Developer",
      description:
        "Beshah crafts beautiful user interfaces and ensures a smooth user experience.",
      linkedin: "https://www.linkedin.com/in/beshah",
      telegram: "https://t.me/beshah",
      github: "https://github.com/beshah",
    },
    {
      name: "Amanuel Takile",
      role: "Frontend Developer",
      description:
        "Amanuel specializes in responsive design and interactive UI components.",
      linkedin: "https://www.linkedin.com/in/amanuel",
      telegram: "https://t.me/amanuel",
      github: "https://github.com/amanuel",
    },
    {
      name: "Gezahegn Birhanu",
      role: "Frontend Developer",
      description:
        "Gezahegn works on performance optimization and clean, maintainable code.",
      linkedin: "https://www.linkedin.com/in/gezahegn",
      telegram: "https://t.me/gezahegn",
      github: "https://github.com/gezahegn",
    },
  ];

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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl space-y-8 sm:space-y-12 md:space-y-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 dark:text-white font-comic tracking-tight drop-shadow-md">
            About Us 🚀
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-2xl text-gray-600 dark:text-gray-300 font-comic leading-relaxed max-w-3xl mx-auto">
            We are a passionate team of web developers building a vibrant Chat
            App with Next.js, Tailwind CSS, and TypeScript.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12"
          role="region"
          aria-label="Team Members"
        >
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xl sm:text-2xl font-comic text-gray-900 dark:text-white flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-comic">
                    {member.name}
                  </h2>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 font-comic">
                    {member.role}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 font-comic leading-relaxed">
                {member.description}
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-700 text-white font-comic text-xs sm:text-sm rounded-full hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1 sm:mr-2"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={member.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white font-comic text-xs sm:text-sm rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
                  aria-label={`Visit ${member.name}'s Telegram profile`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1 sm:mr-2"
                    aria-hidden="true"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.44 7.64c.144.986-.468 2.203-1.345 3.048l-3.766 3.626-1.44 5.286-2.143-1.306 1.18-3.75-3.405-2.143 4.714-2.143.714-4.5 4.286 1.882z" />
                  </svg>
                  Telegram
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 dark:bg-gray-700 text-white font-comic text-xs sm:text-sm rounded-full hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-600"
                  aria-label={`Visit ${member.name}'s GitHub profile`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1 sm:mr-2"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 1.947.138 2.953.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-comic font-bold text-xl sm:text-2xl py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-purple-600"
          aria-label="Return to homepage"
        >
          Back to Home
        </button>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
