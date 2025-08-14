import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ariaLabel?: string; // Added for accessibility
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ariaLabel, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[44px] w-full rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 py-3 text-base font-comic placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none shadow-lg transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
