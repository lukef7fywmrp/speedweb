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
  style?: React.CSSProperties;
}

export function CTAButton({
  href,
  children,
  icon = <Zap className="ml-2 size-4" />,
  className,
  onClick,
  style,
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
        "btn-grad h-14 text-[1.2rem] font-semibold tracking-wide transition duration-300 group hover:bg-black hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),_0_0_0_2px_#FF9500]",
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {onClick ? (
        <span className="flex items-center justify-center text-white">{buttonContent}</span>
      ) : (
        <Link href={href} className="flex items-center justify-center text-white">
          {buttonContent}
        </Link>
      )}
    </Button>
  );
}
