import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaLabel?: string; // Added for accessibility
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ariaLabel, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 py-3 text-base font-comic placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none shadow-lg transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-base file:font-comic",
          className
        )}
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
