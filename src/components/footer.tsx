"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookBoxFill } from "react-icons/ri";
import { SiMeta } from "react-icons/si";
import { Logo } from "./logo";
import Image from "next/image";

const socialIcons = [
  { id: 1, title: "Meta (Facebook)", Icon: SiMeta, url: "https://facebook.com" },
  { id: 2, title: "X (Twitter)", Icon: FaXTwitter, url: "https://x.com" },
  { id: 3, title: "LinkedIn", Icon: FaLinkedin, url: "https://linkedin.com" },
  {
    id: 4,
    title: "Instagram",
    Icon: FaInstagram,
    url: "https://www.instagram.com/speedwebofficial/",
  },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/images/rocketicon.png"
                alt="Speedweb"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-semibold text-white">Speedweb</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4"
          >
            {socialIcons.map(({ id, title, Icon, url }) => (
              <motion.a
                key={id}
                href={url}
                className="text-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 Speedweb, Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
