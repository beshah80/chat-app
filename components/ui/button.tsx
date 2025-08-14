import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-comic font-bold shadow-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 text-white",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 dark:from-red-500 dark:to-red-400 dark:hover:from-red-600 dark:hover:to-red-500 text-white",
        outline:
          "border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
        secondary:
          "bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 dark:from-purple-600 dark:to-purple-500 dark:hover:from-purple-700 dark:hover:to-purple-600 text-white",
        ghost:
          "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
        link: "bg-transparent text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-8 py-3 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ariaLabel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ariaLabel, ...props }, ref) => {
    const validProps = Object.fromEntries(
      (Object.entries(props) as [keyof typeof props, unknown][]).filter(
        ([key]) => {
          const isValid = [
            "children",
            "className",
            "onClick",
            "type",
            "disabled",
            "aria-label",
            "aria-disabled",
            "role",
            "id",
            "name",
            "value",
            "onMouseEnter",
            "onMouseLeave",
            "onFocus",
            "onBlur",
          ].includes(key as string);

          if (!isValid) {
            console.warn(
              `Button: Invalid prop detected: ${String(key)}=${JSON.stringify(
                props[key]
              )}`
            );
          }
          return isValid;
        }
      )
    );

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        aria-label={ariaLabel}
        {...validProps}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
