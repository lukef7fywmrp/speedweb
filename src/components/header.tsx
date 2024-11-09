"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { smoothScroll } from "@/lib/smoothScroll";
import { Logo } from "./logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastMenuItemRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { href: "#work", label: "Work" },
    { href: "#pricing", label: "Pricing" },
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container flex items-center justify-between gap-10 py-6 w-full relative"
    >
      <Link href="/" className="flex items-center gap-3 flex-1">
        <motion.div className="text-primary h-[48px] sm:h-[60px] md:h-[72px] flex items-center">
          <Logo
            width={120}
            height={48}
            className="text-primary sm:w-[150px] sm:h-[60px] md:w-[200px] md:h-[72px]"
          />
        </motion.div>
      </Link>
      <nav className="hidden items-center gap-8 md:flex flex-1 justify-center">
        {navItems.map((item) => (
          <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={item.href}
              className="flex cursor-pointer items-center text-lg font-medium transition hover:text-foreground sm:text-sm px-4 py-2 rounded-sm duration-300 hover:bg-white/10"
              onClick={(e) => smoothScroll(item.href.slice(1))(e)}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="hidden items-center gap-2 md:flex flex-1 justify-end">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="text-black group">
            <Link
              href="#pricing"
              className="cursor-pointer flex items-center"
              onClick={(e) => smoothScroll("pricing")(e)}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="absolute top-full left-0 right-0 bg-background shadow-xl z-50"
            onKeyDown={handleKeyDown}
          >
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 active:bg-accent/50"
                  onClick={(e) => {
                    smoothScroll(item.href.slice(1))(e);
                    setIsOpen(false);
                  }}
                  ref={index === 0 ? firstMenuItemRef : undefined}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, index)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                size="lg"
                className="mt-4 w-full text-black group"
                ref={lastMenuItemRef}
                onKeyDown={(e) => handleMenuItemKeyDown(e, navItems.length)}
              >
                <Link
                  href="#pricing"
                  className="cursor-pointer flex items-center justify-center w-full h-full"
                  onClick={(e) => {
                    smoothScroll("pricing")(e);
                    setIsOpen(false);
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
