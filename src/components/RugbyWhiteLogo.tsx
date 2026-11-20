import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

export default function RugbyWhiteLogo({
  variant = "dark",
  size = "md",
  showWordmark = true,
  className = "",
}: LogoProps) {
  const isLight = variant === "light";
  const isGold = variant === "gold";

  const ringColor = isLight
    ? "stroke-[#FEF7FB]"
    : isGold
    ? "stroke-[#AE3E64]"
    : "stroke-[#581527]";

  const textColor = isLight
    ? "fill-[#FEF7FB] text-[#FEF7FB]"
    : isGold
    ? "fill-[#AE3E64] text-[#AE3E64]"
    : "fill-[#581527] text-[#581527]";

  const subColor = isLight
    ? "text-[#8A304C]"
    : isGold
    ? "text-[#EA90B5]"
    : "text-[#8A304C]";

  const dimensions = {
    sm: { monogram: 32, text: "text-lg", sub: "text-[9px]" },
    md: { monogram: 42, text: "text-xl", sub: "text-[10px]" },
    lg: { monogram: 56, text: "text-2xl sm:text-3xl", sub: "text-xs" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Rugby White Home"
    >
      {/* Monogram Seal */}
      <div className="relative flex-shrink-0">
        <svg
          width={dimensions.monogram}
          height={dimensions.monogram}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* Outer Ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            className={ringColor}
            strokeWidth="1.5"
            strokeDasharray="300"
          />
          {/* Delicate Inner Ring */}
          <circle
            cx="50"
            cy="50"
            r="41"
            className={ringColor}
            strokeWidth="0.75"
            strokeOpacity="0.6"
          />
          {/* Stylized Interlocked RB Serif Monogram */}
          <path
            d="M32 28V72M32 28H48C55.732 28 62 33.3726 62 40C62 46.6274 55.732 52 48 52H32M48 52H52C59.732 52 66 56.4772 66 62C66 67.5228 59.732 72 52 72H32M48 52L64 72"
            className={ringColor}
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <circle cx="50" cy="18" r="1.5" className={isLight ? "fill-[#AE3E64]" : "fill-[#581527]"} />
          <circle cx="50" cy="82" r="1.5" className={isLight ? "fill-[#AE3E64]" : "fill-[#581527]"} />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-[0.22em] font-medium leading-none ${dimensions.text} ${textColor}`}
          >
            RUGBY WHITE
          </span>
          <span
            className={`font-sans tracking-[0.32em] uppercase font-light mt-1 ${dimensions.sub} ${subColor}`}
          >
            SKINCARE RITUALS
          </span>
        </div>
      )}
    </Link>
  );
}
