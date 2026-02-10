import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function MobileContainer({
  children,
  className,
  noPadding = false,
}: MobileContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen w-full max-w-lg",
        !noPadding && "px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
