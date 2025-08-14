"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  ariaLabel?: string; // Added for accessibility
  fallbackInitial?: string; // For initial-based fallback
}

export function ImageWithFallback({
  src,
  fallbackSrc = "/placeholder-image.png",
  alt = "Image",
  ariaLabel,
  fallbackInitial,
  className,
  width = 112, // Matches ProfilePage's w-28 (112px)
  height = 112, // Matches ProfilePage's h-28 (112px)
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Use fallbackInitial if provided and no valid image is loaded
  const showFallbackInitial = hasError && fallbackInitial;

  return showFallbackInitial ? (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-600 dark:from-blue-300 dark:to-blue-200 text-white dark:text-gray-900 text-3xl font-comic font-bold shadow-lg",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label={ariaLabel || alt}
    >
      {fallbackInitial?.charAt(0).toUpperCase() || "U"}
    </div>
  ) : (
    <Image
      src={imgSrc}
      alt={alt}
      className={cn("rounded-full object-cover shadow-lg", className)}
      onError={() => {
        setImgSrc(fallbackSrc);
        setHasError(true);
      }}
      width={width}
      height={height}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
