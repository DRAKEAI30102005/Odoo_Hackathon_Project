"use client";

import { motion } from "framer-motion";
import { CloudRain, Sun, MapPin, Star, Wallet, Calendar, Globe, Bookmark, Plus, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  { name: "Goa", country: "India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop", rating: 4.8, budget: "$$", season: "Winter" },
  { name: "Manali", country: "India", image: "https://images.unsplash.com/photo-1605649487212-4dcb1b6b1836?q=80&w=2070&auto=format&fit=crop", rating: 4.7, budget: "$", season: "Summer" },
  { name: "Jaipur", country: "India", image: "https://images.unsplash.com/photo-1605658600073-7e4663f73966?q=80&w=2000&auto=format&fit=crop", rating: 4.9, budget: "$$$", season: "Winter" },
  { name: "Munnar", country: "India", image: "https://images.unsplash.com/photo-1593693397690-362cb9666c6b?q=80&w=2000&auto=format&fit=crop", rating: 4.9, budget: "$$", season: "Monsoon" },
];

export default function Dashboard() {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Good Morning, Aritra ✈️</h1>
          <p className="text-lg text-midnight-blue/70">Ready for your next adventure?</p>
        </div>

        <div className="relative z-10 glass-dark bg-midnight-blue/80 text-white p-4 rounded-2xl flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center">
            <CloudRain className="text-blue-300" size={24} />
          </div>
          <div>
            <p className="text-sm text-white/70">Kolkata, IN</p>
            <p className="text-2xl font-bold">28°C</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Quick Stats */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div whileHover={{ y: -5 }} className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                  <Calendar size={24} />
                </div>
                <p className="text-3xl font-bold">2</p>
                <p className="text-xs text-midnight-blue/70 font-medium">Upcoming Trips</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-3">
                  <Wallet size={24} />
                </div>
                <p className="text-3xl font-bold">$1.2k</p>
                <p className="text-xs text-midnight-blue/70 font-medium">Budget Used</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-3">
                  <Globe size={24} />
                </div>
                <p className="text-3xl font-bold">5</p>
                <p className="text-xs text-midnight-blue/70 font-medium">Countries Visited</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-3">
                  <Bookmark size={24} />
                </div>
                <p className="text-3xl font-bold">14</p>
                <p className="text-xs text-midnight-blue/70 font-medium">Saved Places</p>
              </motion.div>
            </div>
          </section>

          {/* Popular Destinations Carousel */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">Trending Destinations</h2>
              <Link href="/search" className="text-primary font-semibold text-sm flex items-center gap-1 hover:text-secondary transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x">
              {destinations.map((dest, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[280px] shrink-0 glass rounded-3xl overflow-hidden group snap-start cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-midnight-blue">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      {dest.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{dest.name}</h3>
                        <p className="text-sm text-midnight-blue/60 flex items-center gap-1">
                          <MapPin size={14} /> {dest.country}
                        </p>
                      </div>
                      <span className="text-primary font-bold">{dest.budget}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                        Best in {dest.season}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* AI Travel Suggestions */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl p-6 bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden shadow-lg shadow-primary/30"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300" />
              <h3 className="font-bold text-lg">AI Suggestion</h3>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Based on your recent interest in beaches and your budget, we highly recommend the <span className="font-bold text-white">Bali Adventure Tour</span> for your next trip.
            </p>
            <Link href="/create-trip" className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-full font-bold text-sm hover:bg-soft-sand transition-colors">
              Explore Itinerary <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Quick Action */}
          <Link href="/create-trip" className="block">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed border-primary/40 bg-primary/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:border-primary hover:bg-primary/10"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                <Plus size={32} />
              </div>
              <h3 className="text-xl font-bold mb-1">Create New Trip</h3>
              <p className="text-sm text-midnight-blue/60">Use AI to generate a smart itinerary</p>
            </motion.div>
          </Link>

        </div>
      </div>
    </div>
  );
}
