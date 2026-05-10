"use client";

import { motion } from "framer-motion";
import { Search, Filter, MapPin, DollarSign, Shield, CloudSun, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const filters = ["All", "Budget", "Beach", "Mountains", "Adventure", "Luxury", "Family Friendly"];

const indianImages = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop", // Taj/Heritage
  "https://images.unsplash.com/photo-1615836245337-f589b2fb1e94?q=80&w=2000&auto=format&fit=crop", // Udaipur/Lake
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop", // Goa/Beach
  "https://images.unsplash.com/photo-1610444391624-94452178ee72?q=80&w=2000&auto=format&fit=crop", // Spiti/Mountains
  "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=2000&auto=format&fit=crop", // Hampi/Ruins
  "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2000&auto=format&fit=crop", // Darjeeling/Tea
  "https://images.unsplash.com/photo-1589938562768-45ee6cc3f140?q=80&w=2000&auto=format&fit=crop", // Andaman/Island
  "https://images.unsplash.com/photo-1593693397690-362cb9666c6b?q=80&w=2000&auto=format&fit=crop", // Kerala/Backwaters
  "https://images.unsplash.com/photo-1605649487212-4dcb1b6b1836?q=80&w=2000&auto=format&fit=crop", // Manali/Snow
  "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2000&auto=format&fit=crop"  // Mumbai/City
];

const wikiImages: Record<string, string> = {
  "Ajanta Caves":"https://upload.wikimedia.org/wikipedia/commons/c/c3/Ajanta_%2863%29.jpg",
  "Mumbai":"https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1000&auto=format&fit=crop",
  "Chennai":"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
  "New Delhi":"https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
  "Kochi":"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
  "Ooty":"https://images.unsplash.com/photo-1590548171731-0428f96e8d1a?q=80&w=1000&auto=format&fit=crop",
  "Pune":"https://images.unsplash.com/photo-1584839586623-6ec99f7f8843?q=80&w=1000&auto=format&fit=crop",
  "Jaipur":"https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
  "Nainital":"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
  "Madurai":"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
  "Srinagar":"https://images.unsplash.com/photo-1598305363300-1774402446e1?q=80&w=1000&auto=format&fit=crop",
  "Munnar":"https://images.unsplash.com/photo-1593693397690-362cb9666c6b?q=80&w=1000&auto=format&fit=crop",
  "Rameswaram":"https://images.unsplash.com/photo-1590050752117-23a54446f23e?q=80&w=1000&auto=format&fit=crop",
  "Mount Abu":"https://images.unsplash.com/photo-1594911776510-7561f3653198?q=80&w=1000&auto=format&fit=crop",
  "Amritsar":"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1000&auto=format&fit=crop",
  "Dharamshala":"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
  "Shimla":"https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1000&auto=format&fit=crop",
  "Kedarnath":"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
  "Lonavala":"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
  "Jodhpur":"https://images.unsplash.com/photo-1599391032338-7f9185a6007e?q=80&w=1000&auto=format&fit=crop",
  "Jaisalmer":"https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1000&auto=format&fit=crop",
  "Gir National Park":"https://images.unsplash.com/photo-1590429105437-08f3258c0c45?q=80&w=1000&auto=format&fit=crop",
  "Kodaikanal":"https://images.unsplash.com/photo-1590548171731-0428f96e8d1a?q=80&w=1000&auto=format&fit=crop",
  "Mussoorie":"https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1000&auto=format&fit=crop",
  "Gulmarg":"https://images.unsplash.com/photo-1620456100790-1c394c8e7655?q=80&w=1000&auto=format&fit=crop",
  "Pushkar":"https://images.unsplash.com/photo-1594911776510-7561f3653198?q=80&w=1000&auto=format&fit=crop",
  "Udaipur":"https://images.unsplash.com/photo-1615836245337-f589b2fb1e94?q=80&w=1000&auto=format&fit=crop",
  "Rishikesh":"https://images.unsplash.com/photo-1517627043994-b991abb62fc8?q=80&w=1000&auto=format&fit=crop",
  "Pahalgam":"https://images.unsplash.com/photo-1598305363300-1774402446e1?q=80&w=1000&auto=format&fit=crop",
  "Rann of Kutch":"https://images.unsplash.com/photo-1601614918967-17849e751f89?q=80&w=1000&auto=format&fit=crop",
  "Statue of Unity":"https://images.unsplash.com/photo-1590429105437-08f3258c0c45?q=80&w=1000&auto=format&fit=crop",
  "Goa":"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
  "Hyderabad":"https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1000&auto=format&fit=crop",
  "Kolkata":"https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
  "Mysore":"https://images.unsplash.com/photo-1593693397690-362cb9666c6b?q=80&w=1000&auto=format&fit=crop",
  "Darjeeling":"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop",
  "Bodh Gaya":"https://images.unsplash.com/photo-1584839586623-6ec99f7f8843?q=80&w=1000&auto=format&fit=crop",
  "Hampi":"https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1000&auto=format&fit=crop",
  "Shillong":"https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1000&auto=format&fit=crop",
  "Kaziranga National Park":"https://images.unsplash.com/photo-1590429105437-08f3258c0c45?q=80&w=1000&auto=format&fit=crop",
  "Puri":"https://images.unsplash.com/photo-1590050752117-23a54446f23e?q=80&w=1000&auto=format&fit=crop",
  "Gangtok":"https://images.unsplash.com/photo-1598305363300-1774402446e1?q=80&w=1000&auto=format&fit=crop",
  "Havelock Island":"https://images.unsplash.com/photo-1589938562768-45ee6cc3f140?q=80&w=1000&auto=format&fit=crop",
  "Lakshadweep":"https://images.unsplash.com/photo-1589938562768-45ee6cc3f140?q=80&w=1000&auto=format&fit=crop",
  "Taj Mahal":"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop",
  "Varanasi":"https://images.unsplash.com/photo-1517627043994-b991abb62fc8?q=80&w=1000&auto=format&fit=crop",
  "Leh Ladakh":"https://images.unsplash.com/photo-1610444391624-94452178ee72?q=80&w=1000&auto=format&fit=crop",
  "Bandipur National Park":"https://images.unsplash.com/photo-1590429105437-08f3258c0c45?q=80&w=1000&auto=format&fit=crop",
  "Chittorgarh Fort":"https://images.unsplash.com/photo-1599391032338-7f9185a6007e?q=80&w=1000&auto=format&fit=crop"
};

const generateCities = () => {
  const destinations = [
    "Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Dal Lake", "Betaab Valley",
    "Manali", "Shimla", "Kasol", "Spiti Valley", "Dharamshala", "Dalhousie", "Kufri",
    "Rishikesh", "Mussoorie", "Nainital", "Auli", "Kedarnath", "Badrinath", "Valley of Flowers",
    "Jim Corbett National Park", "Amritsar", "Golden Temple", "Wagah Border",
    "Kurukshetra", "New Delhi", "India Gate", "Red Fort", "Qutub Minar", "Lotus Temple", "Akshardham Temple",
    "Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar", "Mount Abu", "Chittorgarh Fort", "Thar Desert",
    "Statue of Unity", "Gir National Park", "Rann of Kutch", "Somnath Temple", "Dwarka",
    "Goa", "Baga Beach", "Calangute Beach", "Anjuna Beach", "Dudhsagar Falls", "Fort Aguada", "Basilica of Bom Jesus",
    "Munnar", "Alleppey", "Wayanad", "Thekkady", "Kochi", "Kovalam", "Varkala",
    "Ooty", "Kodaikanal", "Chennai", "Mahabalipuram", "Madurai", "Rameswaram", "Kanyakumari",
    "Bengaluru", "Coorg", "Mysore", "Hampi", "Chikmagalur", "Gokarna", "Bandipur National Park",
    "Kolkata", "Darjeeling", "Sundarbans", "Digha", "Kalimpong", "Puri", "Konark Sun Temple", "Chilika Lake",
    "Bodh Gaya", "Nalanda", "Rajgir", "Gangtok", "Tsomgo Lake", "Shillong", "Cherrapunji", "Dawki",
    "Kaziranga National Park", "Tawang", "Kohima", "Loktak Lake", "Aizawl",
    "Andaman and Nicobar Islands", "Havelock Island", "Radhanagar Beach", "Lakshadweep", "Agatti Island", "Bangaram Island",
    "Varanasi", "Vaishno Devi", "Leh Ladakh", "Bir Billing", "Ranthambore", "Taj Mahal", "Ajanta Ellora"
  ];

  return destinations.filter(name => wikiImages[name]).map((name, index) => {
    const tags = [];
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes("beach") || lowerName.includes("goa") || ["puri", "gokarna", "chennai", "varkala", "kovalam", "alleppey", "digha", "havelock", "andaman", "lakshadweep", "agatti", "bangaram"].some(k => lowerName.includes(k))) tags.push("Beach");
    if (["manali", "shimla", "darjeeling", "ooty", "munnar", "spiti", "auli", "gulmarg", "kashmir", "gangtok", "shillong", "tawang", "coorg", "mussoorie", "nainital", "kodaikanal", "leh"].some(k => lowerName.includes(k))) tags.push("Mountains");
    if (["rishikesh", "bir billing", "jim corbett", "kaziranga", "bandipur", "gir", "ranthambore", "adventure", "trek"].some(k => lowerName.includes(k))) tags.push("Adventure");
    if (["udaipur", "jaipur", "mumbai", "new delhi", "bengaluru", "luxury", "palace"].some(k => lowerName.includes(k))) tags.push("Luxury");
    if (["hampi", "konark", "ajanta", "mahabalipuram", "temple", "fort", "heritage", "taj mahal", "varanasi", "khajuraho", "nalanda", "rajgir", "bodh gaya"].some(k => lowerName.includes(k))) tags.push("Historical");
    
    if (tags.length === 0) tags.push("Family Friendly");
    if (index % 4 === 0) tags.push("Budget");

    const costLevel = index % 5 === 0 ? "$$$" : index % 3 === 0 ? "$$" : "$";
    const temp = 10 + (index % 25);

    return {
      id: index + 1,
      name,
      country: "India",
      image: wikiImages[name],
      cost: costLevel,
      safety: (8.0 + (index % 20) / 10).toFixed(1) + "/10",
      weather: `${temp}°C`,
      tags: [...new Set(tags)],
      likes: 500 + (index * 234) % 5000
    };
  });
};

const cities = generateCities();

export default function SearchCities() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto w-full min-h-screen">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Destination</h1>
        <p className="text-midnight-blue/70 max-w-2xl mx-auto">Explore handpicked cities worldwide. Filter by vibe, budget, or activity to find the perfect match for your travel style.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass p-4 rounded-full flex flex-col md:flex-row items-center gap-4 mb-10 sticky top-24 z-30">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight-blue/40" size={20} />
          <input 
            type="text" 
            placeholder="Search by city, country or vibe..." 
            className="w-full bg-white/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        
        <div className="flex-1 flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto px-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeFilter === filter ? "bg-primary text-white" : "bg-white/50 text-midnight-blue hover:bg-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="hidden md:flex items-center gap-2 px-4 py-3 bg-white rounded-full text-midnight-blue font-bold text-sm hover:bg-gray-100 transition-colors">
          <Filter size={18} /> Advanced
        </button>
      </div>

      {/* Pinterest-style Masonry Grid (Mocked with CSS Columns) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {cities.filter(city => activeFilter === "All" || city.tags.includes(activeFilter)).map((city, i) => (
          <motion.div 
            key={city.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="break-inside-avoid relative group rounded-3xl overflow-hidden cursor-pointer"
          >
            <Image 
              src={city.image} 
              alt={city.name} 
              width={600} 
              height={800} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 via-midnight-blue/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Stats */}
            <div className="absolute top-4 w-full px-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
              <div className="flex flex-col gap-2">
                <span className="glass-dark text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
                  <DollarSign size={12} className="text-secondary" /> Cost: {city.cost}
                </span>
                <span className="glass-dark text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
                  <Shield size={12} className="text-accent" /> Safety: {city.safety}
                </span>
                <span className="glass-dark text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
                  <CloudSun size={12} className="text-yellow-400" /> {city.weather}
                </span>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                <Heart size={16} />
              </button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white/80 text-sm font-bold flex items-center gap-1 mb-1">
                <MapPin size={14} /> {city.country}
              </p>
              <h3 className="text-white text-3xl font-bold mb-3">{city.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {city.tags.map(tag => (
                  <span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={`/itinerary-builder?city=${city.name}`} className="opacity-0 group-hover:opacity-100 w-full py-3 bg-primary hover:bg-secondary text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
                Plan Trip Here
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
