import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FincontLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const FincontLogo: React.FC<FincontLogoProps> = ({
  className = "",
  showText = true,
  size = "md",
  href = "/",
}) => {
  // Dimension presets matching navigation heights
  const dimensions = {
    sm: showText ? { width: 130, height: 40 } : { width: 34, height: 34 },
    md: showText ? { width: 165, height: 50 } : { width: 42, height: 42 },
    lg: showText ? { width: 210, height: 64 } : { width: 52, height: 52 },
  }[size];

  const content = (
    <div className={`flex items-center select-none ${className}`}>
      {showText ? (
        <Image
          src="/images/fincont-full-trans.png"
          alt="FINCONT - tu cuenta al día"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="h-auto object-contain transition-transform duration-200 hover:scale-102"
        />
      ) : (
        <Image
          src="/images/fincont-icon-trans.png"
          alt="FINCONT"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="h-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
};

// Backwards-compatible alias so existing imports work seamlessly
export const NexoraLogo = FincontLogo;
