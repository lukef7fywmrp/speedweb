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
  icon = <Zap className="ml-2 h-4 w-4" />,
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
        "h-14 text-base font-semibold hover:scale-105 transition duration-300 group bg-primary text-gray-900 hover:bg-primary/90",
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
