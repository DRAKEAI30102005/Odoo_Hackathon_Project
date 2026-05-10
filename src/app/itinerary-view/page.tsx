"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Map, Download, CheckCircle2, CloudOff, ChevronDown, MapPin, Coffee, Camera, Car } from "lucide-react";

export default function ItineraryView() {
  const [viewMode, setViewMode] = useState<"calendar" | "timeline" | "map">("timeline");
  const [showConfetti, setShowConfetti] = useState(false);

  const completeTrip = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto w-full min-h-screen relative overflow-hidden">
      
      {/* Mock Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: "-10vh", 
                  x: "50vw", 
                  scale: Math.random() * 2,
                  rotate: 0 
                }}
                animate={{ 
                  y: "110vh", 
                  x: `${Math.random() * 100}vw`,
                  rotate: 360 * Math.random() * 5
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  ease: "easeOut" 
                }}
                className={`absolute w-3 h-3 ${['bg-primary', 'bg-secondary', 'bg-accent', 'bg-yellow-400', 'bg-pink-400'][i % 5]} rounded-sm`}
              />
            ))}
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl text-center shadow-2xl border border-primary/20 pointer-events-auto">
              <h2 className="text-3xl font-bold text-primary mb-2">Trip Completed! 🎉</h2>
              <p className="text-midnight-blue/70">Hope you had a wonderful Mystic Goa Escapade.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded">Active Trip</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><CloudOff size={12} /> Offline Mode Ready</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Mystic Goa Escapade</h1>
          <p className="text-midnight-blue/70 font-medium">Oct 12 - Oct 18, 2026 • 7 Days</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full font-bold text-sm shadow-sm border border-gray-100 hover:bg-gray-50 shrink-0">
            <Download size={16} /> PDF
          </button>
          <button onClick={completeTrip} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-secondary shrink-0 transition-colors">
            <CheckCircle2 size={16} /> Mark Complete
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 w-fit mb-8">
        <button 
          onClick={() => setViewMode("timeline")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${viewMode === "timeline" ? "bg-primary text-white" : "text-gray-500 hover:text-midnight-blue"}`}
        >
          <Clock size={16} /> Timeline
        </button>
        <button 
          onClick={() => setViewMode("calendar")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${viewMode === "calendar" ? "bg-primary text-white" : "text-gray-500 hover:text-midnight-blue"}`}
        >
          <Calendar size={16} /> Calendar
        </button>
        <button 
          onClick={() => setViewMode("map")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${viewMode === "map" ? "bg-primary text-white" : "text-gray-500 hover:text-midnight-blue"}`}
        >
          <Map size={16} /> Map
        </button>
      </div>

      {/* Content Area */}
      <div className="glass p-6 md:p-8 rounded-3xl bg-white/60">
        
        {viewMode === "timeline" && (
          <div className="space-y-8">
            {/* Day 1 */}
            <div>
              <div className="sticky top-20 z-10 bg-white/80 backdrop-blur-md py-3 px-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-lg">Day 1: Arrival & Panjim</h3>
                  <p className="text-xs text-gray-500">Monday, Oct 12</p>
                </div>
                <ChevronDown className="text-gray-400" />
              </div>

              <div className="relative pl-8 space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
                
                {/* Activity */}
                <div className="relative">
                  <div className="absolute -left-[32px] bg-blue-100 text-blue-600 p-1.5 rounded-full border-4 border-white z-10"><MapPin size={16} /></div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">Arrive at Dabolim Airport</h4>
                      <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2 py-1 rounded">10:00 AM</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Pick up rental car from the counter. Booking #BHI-9823.</p>
                    <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-xl flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg"><Car size={16} className="text-blue-500" /></div>
                      <div>
                        <p className="font-bold">Transport Details</p>
                        <p className="text-xs opacity-80">Avis Rental • $45/day</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[32px] bg-orange-100 text-orange-600 p-1.5 rounded-full border-4 border-white z-10"><Coffee size={16} /></div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">Lunch at Gunpowder Goa</h4>
                      <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2 py-1 rounded">01:30 PM</span>
                    </div>
                    <p className="text-sm text-gray-500">Amazing South Indian food with a great vibe.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[32px] bg-green-100 text-green-600 p-1.5 rounded-full border-4 border-white z-10"><Camera size={16} /></div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">Basilica of Bom Jesus</h4>
                      <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2 py-1 rounded">03:00 PM</span>
                    </div>
                    <p className="text-sm text-gray-500">UNESCO World Heritage site. Beautiful architecture.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Day 2 Skeleton */}
            <div className="opacity-50">
              <div className="bg-white py-3 px-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Day 2: Beaches & Forts</h3>
                  <p className="text-xs text-gray-500">Tuesday, Oct 13</p>
                </div>
                <ChevronDown className="text-gray-400 rotate-180" />
              </div>
            </div>

          </div>
        )}

        {viewMode === "calendar" && (
          <div className="h-96 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="text-center">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-bold">Calendar View</p>
              <p className="text-sm">Weekly grid view coming soon.</p>
            </div>
          </div>
        )}

        {viewMode === "map" && (
          <div className="h-96 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl bg-blue-50/50">
            <div className="text-center">
              <Map size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-bold">Interactive Map Route</p>
              <p className="text-sm">Geographical routing coming soon.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
