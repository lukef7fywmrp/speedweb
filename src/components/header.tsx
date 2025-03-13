"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { smoothScroll } from "@/lib/smoothScroll";

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastMenuItemRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      firstMenuItemRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Tab") {
      if (e.shiftKey && index === 0) {
        e.preventDefault();
        lastMenuItemRef.current?.focus();
      } else if (!e.shiftKey && index === navItems.length) {
        e.preventDefault();
        firstMenuItemRef.current?.focus();
      }
    }
  };

  const handleNavigation = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScroll(sectionId)(e);
    router.push(`/${sectionId}`);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container flex items-center justify-between gap-10 py-6 px-8 md:px-12 lg:px-16 xl:px-20 w-full relative bg-black z-50"
    >
      <Link href="/" className="flex items-center gap-2">
        <motion.div className="size-[40px] flex items-center justify-center relative">
          <Image
            src="/images/rocketicon.png"
            alt="Speedweb"
            width={40}
            height={40}
            className="object-contain"
          />
        </motion.div>
        <span className="text-xl font-semibold text-white">Speedweb</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <motion.div key={item.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/${item.href.slice(1)}`}
              className="flex cursor-pointer items-center text-[17px] font-medium text-zinc-300 transition-all duration-200 hover:text-[#FE8A0A] px-2"
              onClick={(e) => handleNavigation(item.href.slice(1))(e)}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="hidden items-center md:flex">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            className="relative h-11 px-5 font-medium rounded-lg group overflow-hidden bg-[#F5F5F5] hover:bg-white transition-all duration-300 shadow-[0_2px_10px_rgba(255,255,255,0.1)] hover:shadow-[0_2px_15px_rgba(255,255,255,0.2)] border border-white/10"
          >
            <Link
              href="/testimonials"
              className="flex items-center"
              onClick={(e) => handleNavigation("testimonials")(e)}
            >
              <span className="relative flex items-center text-zinc-900 font-semibold tracking-wide text-[15px]">
                Get Started
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          ref={menuButtonRef}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full inset-x-0 bg-background shadow-xl z-50"
            onKeyDown={handleKeyDown}
          >
            <nav className="flex flex-col gap-3 p-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={`/${item.href.slice(1)}`}
                  className="flex w-full cursor-pointer items-center rounded-md p-3 text-[16px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 active:bg-accent/50"
                  onClick={(e) => handleNavigation(item.href.slice(1))(e)}
                  ref={index === 0 ? firstMenuItemRef : undefined}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, index)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                size="lg"
                className="mt-4 w-full bg-white text-zinc-900 hover:bg-white/90 font-medium"
                ref={lastMenuItemRef}
                onKeyDown={(e) => handleMenuItemKeyDown(e, navItems.length)}
              >
                <Link
                  href="/testimonials"
                  className="cursor-pointer flex items-center justify-center w-full h-full"
                  onClick={(e) => handleNavigation("testimonials")(e)}
                >
                  Get Started
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
