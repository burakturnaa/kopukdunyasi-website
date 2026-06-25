import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  logoUrl?: string;
}

const sizeMap = {
  sm: { width: 52, height: 52, className: "h-[52px] w-[52px]" },
  md: { width: 72, height: 72, className: "h-[72px] w-[72px]" },
  lg: { width: 96, height: 96, className: "h-24 w-24" },
};

export function Logo({ className, size = "md", logoUrl = "/logo.png" }: LogoProps) {
  const { width, height, className: sizeClass } = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 group", className)}
      aria-label="Köpük Dünyası - Anasayfa"
    >
      <Image
        src={logoUrl}
        alt="Köpük Dünyası"
        width={width}
        height={height}
        className={cn(
          "object-contain bg-transparent transition-transform duration-300 group-hover:scale-105",
          sizeClass
        )}
        priority
      />
    </Link>
  );
}
