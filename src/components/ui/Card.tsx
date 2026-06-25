import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hover = true, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] p-6 md:p-8",
        glass ? "glass" : "bg-white shadow-[var(--shadow-card)]",
        hover && "transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
