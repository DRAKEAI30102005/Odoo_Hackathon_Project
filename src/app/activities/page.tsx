"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Clock, DollarSign, PlayCircle, Filter, ArrowRight, Video } from "lucide-react";
import Image from "next/image";

const categories = ["All", "Adventure", "Nightlife", "Historical", "Food Tours", "Trekking", "Water Sports"];

const activities = [
  {
    id: 1,
    title: "White Water Rafting at Ganges",
    location: "Rishikesh, Uttarakhand",
    rating: 4.8,
    reviews: 1240,
    duration: "3-4 hours",
    price: 45,
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=1000&auto=format&fit=crop",
    hasVideo: true,
  },
  {
    id: 2,
    title: "Triund Sunrise Trek",
    location: "Dharamshala, Himachal",
    rating: 4.9,
    reviews: 3200,
    duration: "8 hours",
    price: 55,
    category: "Trekking",
    image: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1000&auto=format&fit=crop",
    hasVideo: false,
  },
  {
    id: 3,
    title: "Traditional Goan Cooking Class",
    location: "Goa, India",
    rating: 4.7,
    reviews: 890,
    duration: "4 hours",
    price: 35,
    category: "Food Tours",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop",
    hasVideo: true,
  },
];

export default function ActivitySearch() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto w-full min-h-screen">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Unforgettable Experiences</h1>
        <p className="text-midnight-blue/70 max-w-2xl mx-auto">From thrilling adventures to cultural immersions, find the perfect activities for your itinerary.</p>
      </div>

      {/* Search & Categories */}
      <div className="glass p-4 rounded-3xl mb-10 sticky top-24 z-30 shadow-sm border border-white/50">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search activities..." 
              className="w-full bg-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
          
          <div className="flex-1 flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-2xl text-sm font-bold transition-all ${
                  activeCategory === cat ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white/50 hover:bg-white text-midnight-blue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button className="bg-white p-3 rounded-2xl text-midnight-blue hover:bg-gray-50 transition-colors shadow-sm hidden md:block">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Grid of Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, i) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl overflow-hidden bg-white/40 border border-white hover:border-primary/50 transition-colors group flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image 
                src={activity.image} 
                alt={activity.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-midnight-blue shadow-sm">
                {activity.category}
              </div>

              {/* Video Play Button */}
              {activity.hasVideo && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/90 text-primary p-3 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-md">
                    <PlayCircle size={32} />
                  </button>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl leading-tight line-clamp-2 pr-4">{activity.title}</h3>
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold shrink-0">
                  <Star size={12} className="fill-yellow-500 text-yellow-500" />
                  {activity.rating}
                </div>
              </div>
              
              <p className="text-midnight-blue/60 text-sm flex items-center gap-1 mb-4">
                <MapPin size={14} /> {activity.location}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-midnight-blue/70">
                  <Clock size={16} className="text-primary" />
                  <span className="font-medium">{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-midnight-blue/70">
                  <Video size={16} className="text-secondary" />
                  <span className="font-medium">{activity.reviews} reviews</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Starting from</p>
                  <p className="text-2xl font-bold text-primary flex items-center">
                    <DollarSign size={20} />{activity.price}
                  </p>
                </div>
                <button className="bg-midnight-blue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary transition-colors group-hover:shadow-lg shadow-primary/30">
                  <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
