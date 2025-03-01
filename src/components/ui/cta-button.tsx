"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CTAButton({
  href,
  children,
  icon = <Zap className="ml-2 size-4" />,
  className,
  onClick,
}: CTAButtonProps) {
  const buttonContent = (
    <>
      {children}
      {icon}
    </>
  );

  return (
    <Button
      size="lg"
      variant="default"
      className={cn(
        "h-14 text-base font-semibold hover:scale-105 transition duration-300 group bg-gradient-to-r from-[#ff8c00] to-[#ff7f00] text-black hover:from-[#ff7300] hover:to-[#ff6600] shadow-lg shadow-[#ff7f00]/30",
        className,
      )}
      onClick={onClick}
    >
      {onClick ? (
        <span className="flex items-center justify-center">{buttonContent}</span>
      ) : (
        <Link href={href} className="flex items-center justify-center">
          {buttonContent}
        </Link>
      )}
    </Button>
  );
}
