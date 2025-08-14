import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // Base classes to enforce app-wide consistency
  const baseClasses = ["font-comic", "transition-colors", "duration-300"];
  return twMerge(clsx([...baseClasses, ...inputs]));
}