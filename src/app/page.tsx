"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search, Compass, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-midnight-blue/40 z-10" /> {/* Dark overlay for text readability */}
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2668&auto=format&fit=crop"
          alt="Cinematic tropical beach"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Animated Clouds */}
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-0 w-[200%] h-64 z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1000&auto=format&fit=crop')",
          backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
          mixBlendMode: "screen",
        }}
      />

      {/* Floating Elements (Background) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 z-10 hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Udaipur, Rajasthan</p>
            <p className="text-xs">4 Days Trip</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 z-10 hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
            <Compass size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Munnar, Kerala</p>
            <p className="text-xs">Nature Escape</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-white text-sm font-medium">
            <Globe size={16} />
            <span>AI-Powered Smart Travel Planning</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Plan Your <span className="text-primary">Dream Journey</span> With Traveloop
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-soft-sand mb-10 max-w-2xl mx-auto drop-shadow-md"
        >
          Discover destinations, manage budgets, and build unforgettable experiences with our all-in-one smart tourism ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/create-trip" className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-secondary transition-colors shadow-[0_0_20px_rgba(0,180,216,0.5)] flex items-center justify-center gap-2 group">
            Start Planning
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/search" className="w-full sm:w-auto px-8 py-4 rounded-full glass text-white font-bold text-lg hover:bg-white/40 transition-colors flex items-center justify-center gap-2">
            <Search size={20} />
            Explore Destinations
          </Link>
          <Link href="/public-trips" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/50 text-white font-bold text-lg hover:bg-white/10 transition-colors">
            View Public Trips
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-soft-sand to-transparent z-10" />
    </div>
  );
}
