import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function CTAButton({
  href,
  children,
  icon = <Zap className="ml-2 h-4 w-4" />,
}: CTAButtonProps) {
  return (
    <Button
      size="lg"
      asChild
      variant="default"
      className="h-14 text-base font-semibold hover:scale-105 transition duration-300 group bg-primary text-gray-900 hover:bg-primary/90"
    >
      <Link href={href} className="flex items-center justify-center">
        {children}
        {icon}
      </Link>
    </Button>
  );
}
