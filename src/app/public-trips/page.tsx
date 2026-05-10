"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Copy, MapPin, Instagram, Link as LinkIcon, Star, Calendar } from "lucide-react";
import Image from "next/image";

export default function PublicTrips() {
  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto w-full min-h-screen">
      
      {/* Author Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 text-center md:text-left">
        <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Author" width={100} height={100} className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-lg" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Mystic Goa Escapade</h1>
          <p className="text-midnight-blue/60 flex items-center justify-center md:justify-start gap-2 mt-1">
            <span className="font-bold text-midnight-blue">By Sarah Jenkins</span> • 
            <span className="flex items-center gap-1"><MapPin size={14} /> Goa, India</span>
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">Adventure</span>
            <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">7 Days</span>
            <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Star size={12} className="fill-accent" /> 4.9 Rating</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full font-bold shadow-sm border border-gray-100 hover:bg-red-50 text-midnight-blue transition-colors group">
            <Heart size={18} className="group-hover:text-red-500 group-hover:fill-red-500 transition-colors" /> 
            <span>1.2k</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-secondary transition-colors">
            <Copy size={18} /> Copy Itinerary
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Gallery & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Gallery */}
          <div className="glass p-4 rounded-3xl bg-white shadow-sm">
            <div className="grid grid-cols-2 gap-2 h-80 rounded-2xl overflow-hidden">
              <div className="col-span-1 h-full relative">
                <Image src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop" alt="Goa 1" fill className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
              </div>
              <div className="col-span-1 grid grid-rows-2 gap-2 h-full">
                <div className="relative h-full w-full">
                  <Image src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1000&auto=format&fit=crop" alt="Goa 2" fill className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                </div>
                <div className="relative h-full w-full">
                  <Image src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop" alt="Goa 3" fill className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-black/50 transition-colors">
                    +12 Photos
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-midnight-blue/80 leading-relaxed px-2">
              "This was the most amazing trip of my life! We explored the lush forests, chased waterfalls, and ended the trip relaxing on the beaches. Highly recommend renting a scooter to get around!"
            </p>
          </div>

          {/* Mini Timeline */}
          <div className="glass p-6 rounded-3xl bg-white shadow-sm">
            <h3 className="font-bold text-xl mb-6">Trip Highlights</h3>
            
            <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border-4 border-white z-10">
                  1
                </div>
                <div>
                  <h4 className="font-bold">Dudhsagar Falls</h4>
                  <p className="text-xs text-gray-500 mb-2">Day 1 • Cultural</p>
                  <p className="text-sm">Incredible experience walking near the massive waterfalls.</p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs border-4 border-white z-10">
                  2
                </div>
                <div>
                  <h4 className="font-bold">Fort Aguada</h4>
                  <p className="text-xs text-gray-500 mb-2">Day 2 • Nature</p>
                  <p className="text-sm">Wake up early (6 AM) to catch the sunrise and avoid the crowds. The lighting is perfect for photos.</p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-xs border-4 border-white z-10">
                  3
                </div>
                <div>
                  <h4 className="font-bold">Baga Beach Club</h4>
                  <p className="text-xs text-gray-500 mb-2">Day 4 • Relaxation</p>
                  <p className="text-sm">Spent the entire day lounging at the beach club. Excellent food and view.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column - Share & Comments */}
        <div className="space-y-6">
          
          {/* Share Card */}
          <div className="glass-dark p-6 rounded-3xl bg-midnight-blue text-white text-center">
            <h3 className="font-bold mb-2">Love this trip?</h3>
            <p className="text-xs text-white/70 mb-6">Share it with your friends or copy it to your own dashboard to start customizing.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <Instagram size={20} className="text-pink-400" />
                <span className="text-xs font-bold">Story</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <MessageCircle size={20} className="text-green-400" />
                <span className="text-xs font-bold">WhatsApp</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors col-span-2">
                <LinkIcon size={20} className="text-blue-400" />
                <span className="text-xs font-bold">Copy Link</span>
              </button>
            </div>
          </div>

          {/* Budget Snapshot */}
          <div className="glass p-6 rounded-3xl bg-white shadow-sm border border-gray-100">
            <h3 className="font-bold mb-4">Budget Snapshot</h3>
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-medium">Total Cost</span>
              <span className="text-2xl font-bold text-primary">$1,850</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Accommodation</span>
                <span className="font-bold">$800</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Food</span>
                <span className="font-bold">$450</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Activities</span>
                <span className="font-bold">$300</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
