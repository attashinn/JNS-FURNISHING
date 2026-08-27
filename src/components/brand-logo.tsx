import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark" | "gold" | "monogram-only";
  size?: "sm" | "md" | "lg" | "xl";
  withTagline?: boolean;
}

export function JnsMonogram({ className = "w-10 h-10" }: { className?: string; color?: string }) {
  return (
    <img
      src="/jns-logo.png"
      alt="JNS Furnishing Monogram"
      className={`object-contain rounded-lg ${className}`}
      onError={(e) => {
        // Fallback SVG if image is loading
        const target = e.currentTarget;
        target.style.display = "none";
      }}
    />
  );
}

export function BrandLogo({
  className = "",
  variant = "light",
  size = "md",
  withTagline = true,
}: BrandLogoProps) {
  const isDarkBg = variant === "dark";
  const isGold = variant === "gold";

  const sizeClasses = {
    sm: { img: "h-7 sm:h-9", text: "text-sm sm:text-base tracking-[0.1em]", tag: "text-[7px] sm:text-[8px] tracking-[0.18em]" },
    md: { img: "h-8 sm:h-12", text: "text-sm sm:text-[21px] tracking-[0.1em] sm:tracking-[0.14em]", tag: "text-[7px] sm:text-[9.5px] tracking-[0.16em] sm:tracking-[0.22em]" },
    lg: { img: "h-11 sm:h-16", text: "text-lg sm:text-3xl tracking-[0.14em]", tag: "text-[9px] sm:text-[11px] tracking-[0.24em]" },
    xl: { img: "h-14 sm:h-20", text: "text-xl sm:text-4xl tracking-[0.16em]", tag: "text-[10px] sm:text-[13px] tracking-[0.28em]" },
  }[size];

  if (variant === "monogram-only") {
    return <img src="/jns-logo.png" alt="JNS" className={`${sizeClasses.img} w-auto object-contain ${className}`} />;
  }

  const textColor = isDarkBg
    ? "text-[#FAF9F6]"
    : isGold
    ? "text-[#D4A25A]"
    : "text-[#141715]";

  const tagColor = isDarkBg
    ? "text-[#EADCC8]"
    : isGold
    ? "text-[#D4A25A]/90"
    : "text-[#7A766F]";

  return (
    <div className={`flex items-center gap-1.5 sm:gap-3.5 select-none ${className}`}>
      <img
        src="/jns-logo.png"
        alt="JNS Logo"
        className={`${sizeClasses.img} w-auto object-contain rounded-md shrink-0`}
        onError={(e) => {
          // Fallback monogram if image asset is unavailable
          const target = e.currentTarget;
          target.style.display = "none";
        }}
      />
      <div className="flex flex-col text-left leading-none">
        <span className={`font-extrabold ${textColor} ${sizeClasses.text} font-sans uppercase`}>
          JNS Furnishing
        </span>
        {withTagline && (
          <span className={`mt-0.5 sm:mt-1 font-semibold uppercase ${tagColor} ${sizeClasses.tag} font-sans truncate`}>
            Curate · Customize · Comfort
          </span>
        )}
      </div>
    </div>
  );
}
