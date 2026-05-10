"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Sparkles, Image as ImageIcon, Users, Briefcase, Heart, Crown, Mountain } from "lucide-react";
import Link from "next/link";

const travelTypes = [
  { id: "solo", name: "Solo", icon: Users },
  { id: "family", name: "Family", icon: Users },
  { id: "adventure", name: "Adventure", icon: Mountain },
  { id: "luxury", name: "Luxury", icon: Crown },
  { id: "honeymoon", name: "Honeymoon", icon: Heart },
  { id: "business", name: "Business", icon: Briefcase },
];

export default function CreateTrip() {
  const [tripName, setTripName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestTitle = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTripName("Mystic Goa Escapade 2026");
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto w-full min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Design Your Dream Trip</h1>
        <p className="text-midnight-blue/70 max-w-xl mx-auto">Tell us a bit about your travel plans, and our AI will craft the perfect itinerary tailored to your preferences.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl shadow-xl shadow-primary/5"
      >
        <form className="space-y-8">
          
          {/* Trip Name & AI Suggestion */}
          <div>
            <label className="block text-sm font-bold mb-2">Trip Name</label>
            <div className="relative">
              <input 
                type="text" 
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g., Summer in Manali" 
                className="w-full bg-white/50 border border-white/40 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="button"
                onClick={suggestTitle}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium transition-colors"
              >
                {isGenerating ? <motion.div animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles size={16} /></motion.div> : <><Sparkles size={16} /> AI Suggest</>}
              </button>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <label className="block text-sm font-bold mb-2">Destinations</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-blue/40" size={20} />
              <input 
                type="text" 
                placeholder="Search cities to add..." 
                className="w-full bg-white/50 border border-white/40 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                Goa, India <button type="button" className="hover:text-red-200">×</button>
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Start Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-blue/40" size={20} />
                <input 
                  type="date" 
                  className="w-full bg-white/50 border border-white/40 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-midnight-blue/80"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">End Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-blue/40" size={20} />
                <input 
                  type="date" 
                  className="w-full bg-white/50 border border-white/40 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-midnight-blue/80"
                />
              </div>
            </div>
          </div>

          {/* Travel Type */}
          <div>
            <label className="block text-sm font-bold mb-4">What kind of trip is this?</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {travelTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-transparent bg-white/50 hover:bg-white/80 text-midnight-blue/60"
                    }`}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="font-semibold text-sm">{type.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-bold mb-2">Cover Image (Optional)</label>
            <div className="border-2 border-dashed border-midnight-blue/20 rounded-xl p-8 flex flex-col items-center justify-center bg-white/30 hover:bg-white/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ImageIcon size={24} />
              </div>
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-midnight-blue/50 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>

          <div className="pt-6">
            <Link href="/itinerary-builder" className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 text-lg shadow-lg shadow-primary/30">
              <Sparkles size={20} />
              Generate AI Itinerary
            </Link>
          </div>
          
        </form>
      </motion.div>
    </div>
  );
}
