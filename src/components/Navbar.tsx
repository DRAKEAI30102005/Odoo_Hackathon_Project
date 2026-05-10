"use client";

import Link from "next/link";
import { PlaneTakeoff, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-dark text-white py-3" : "bg-transparent text-midnight-blue py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PlaneTakeoff className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
            </motion.div>
            <span className="font-bold text-2xl tracking-tight">Traveloop</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/search" className="hover:text-primary transition-colors">Destinations</Link>
            <Link href="/activities" className="hover:text-primary transition-colors">Activities</Link>
            <Link href="/login" className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary transition-colors shadow-lg shadow-primary/30">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark text-white overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2">Home</Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2">Dashboard</Link>
              <Link href="/search" onClick={() => setMobileMenuOpen(false)} className="block py-2">Destinations</Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="inline-block mt-2 bg-primary text-center rounded-full py-2">
                Login / Signup
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
