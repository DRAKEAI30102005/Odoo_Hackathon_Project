"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, Reorder } from "framer-motion";
import { MapPin, Clock, Coffee, Sun, Moon, Utensils, Navigation, Train, Info, Sparkles, Map as MapIcon, Calendar as CalendarIcon, CheckCircle2, DollarSign, Edit3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function BuilderContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city") || "India";
  
  const [tripName, setTripName] = useState(`Mystic ${cityParam} Escapade`);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [days, setDays] = useState<any[]>([
    { id: "day-1", label: "Day 1", city: cityParam, date: "Oct 12", activities: [] },
  ]);
  const [activeDay, setActiveDay] = useState("day-1");

  const generateTrip = async () => {
    if (cityParam === "India") return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityParam, days: 4 })
      });
      
      if (res.ok) {
        const data = await res.json();
        setTripName(data.tripName || `Mystic ${cityParam} Escapade`);
        if (data.itinerary) {
          setDays(data.itinerary);
          setActiveDay(data.itinerary[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to generate trip", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const addActivity = (dayId: string) => {
    const newActivity = {
      time: "10:00 AM",
      title: "New Activity",
      description: "Edit this description",
      type: "nature",
      cost: 0
    };
    
    setDays(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, activities: [...day.activities, newActivity] }
        : day
    ));
  };

  const removeActivity = (dayId: string, index: number) => {
    setDays(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, activities: day.activities.filter((_: any, i: number) => i !== index) }
        : day
    ));
  };

  const updateActivity = (dayId: string, index: number, field: string, value: any) => {
    setDays(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, activities: day.activities.map((act: any, i: number) => i === index ? { ...act, [field]: value } : act) }
        : day
    ));
  };

  const activeDayData = days.find(d => d.id === activeDay);

  return (
    <div className="pt-20 pb-0 h-screen flex flex-col overflow-hidden w-full relative bg-gray-50">
      
      {isGenerating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <Sparkles size={48} className="text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold mt-4">AI is building your trip to {cityParam}...</h2>
          <p className="text-midnight-blue/60 mt-2">Generating optimal routes and crunching the budget.</p>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10 shrink-0 shadow-sm">
        <div>
          {isEditingTitle ? (
            <input 
              type="text" 
              value={tripName} 
              onChange={(e) => setTripName(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              className="text-xl font-bold bg-gray-100 px-2 py-1 rounded outline-none border-b-2 border-primary"
              autoFocus
            />
          ) : (
            <h1 className="text-xl font-bold flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
              {tripName} <Edit3 size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h1>
          )}
          <p className="text-xs text-midnight-blue/60 flex items-center gap-2 mt-1">
            <CalendarIcon size={12} /> Oct 12 - Oct 15 • {days.length} Days
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={generateTrip} className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-100">
            <Sparkles size={16} /> AI Auto-Generate
          </button>
          <Link href={`/budget?city=${cityParam}`} className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
            <DollarSign size={16} /> Budget Planner
          </Link>
          <Link href="/itinerary-view" className="flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition-colors">
            Save & View <CheckCircle2 size={16} />
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Day Selector */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden shrink-0 shadow-sm">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-xs mb-4 uppercase text-midnight-blue/40 tracking-widest">Trip Duration</h2>
            <Reorder.Group axis="y" values={days} onReorder={setDays} className="space-y-3">
              {days.map((day) => (
                <Reorder.Item key={day.id} value={day}>
                  <div 
                    onClick={() => setActiveDay(day.id)}
                    className={`p-4 rounded-2xl border cursor-grab active:cursor-grabbing transition-all flex items-center gap-4 ${
                      activeDay === day.id ? "bg-primary text-white border-primary shadow-lg scale-[1.02]" : "bg-white border-gray-100 hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      activeDay === day.id ? "bg-white/20" : "bg-gray-100 text-midnight-blue"
                    }`}>
                      {day.id.split("-")[1]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{day.city}</p>
                      <p className={`text-xs ${activeDay === day.id ? "text-white/70" : "text-gray-400"}`}>{day.label}</p>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            
            <button 
              onClick={() => setDays([...days, { id: `day-${days.length + 1}`, label: `Day ${days.length + 1}`, city: cityParam, date: "Oct 13", activities: [] }])}
              className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              + Add Another Day
            </button>
          </div>
        </div>

        {/* Center Panel: Timeline (Prominent) */}
        <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black text-midnight-blue flex items-center gap-3">
                  <MapPin size={32} className="text-secondary" /> 
                  {activeDayData?.city}
                </h2>
                <p className="text-midnight-blue/40 font-medium ml-11">Planning your activities for {activeDayData?.label}</p>
              </div>
              <button 
                onClick={() => addActivity(activeDay)}
                className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
              >
                + Add Activity
              </button>
            </div>
            
            {/* Timeline Activities */}
            <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:via-secondary/50 before:to-primary/50">
              
              {activeDayData?.activities?.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <MapIcon size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-midnight-blue mb-1">No activities planned yet</h3>
                  <p className="text-midnight-blue/40 text-sm mb-6">Click the button above to start building your day or use AI to generate ideas!</p>
                  <button onClick={generateTrip} className="text-primary font-bold text-sm hover:underline flex items-center gap-2 mx-auto">
                    <Sparkles size={16} /> Use AI to fill this day
                  </button>
                </div>
              ) : (
                activeDayData?.activities?.map((activity: any, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ x: -20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ delay: idx * 0.05 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[39px] p-2 rounded-full border-4 border-gray-50 z-10 shadow-sm ${
                      activity.type === 'food' ? 'bg-orange-100 text-orange-600' :
                      activity.type === 'nature' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'food' ? <Utensils size={16} /> : 
                       activity.type === 'nature' ? <Sun size={16} /> : 
                       <MapIcon size={16} />}
                    </div>
                    
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                      <button 
                        onClick={() => removeActivity(activeDay, idx)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <CheckCircle2 size={18} className="rotate-45" />
                      </button>

                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-24 shrink-0">
                          <input 
                            type="text" 
                            value={activity.time} 
                            onChange={(e) => updateActivity(activeDay, idx, "time", e.target.value)}
                            className="text-sm font-bold text-midnight-blue/40 w-full bg-transparent focus:outline-none focus:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <input 
                            type="text" 
                            value={activity.title} 
                            onChange={(e) => updateActivity(activeDay, idx, "title", e.target.value)}
                            className="text-xl font-bold text-midnight-blue mb-1 w-full bg-transparent focus:outline-none focus:text-primary"
                          />
                          <textarea 
                            value={activity.description} 
                            onChange={(e) => updateActivity(activeDay, idx, "description", e.target.value)}
                            className="text-sm text-midnight-blue/60 w-full bg-transparent focus:outline-none resize-none hide-scrollbar h-auto"
                            rows={2}
                          />
                          <div className="flex gap-4 mt-4">
                            <select 
                              value={activity.type} 
                              onChange={(e) => updateActivity(activeDay, idx, "type", e.target.value)}
                              className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl border-none outline-none appearance-none cursor-pointer"
                            >
                              <option value="food">Food</option>
                              <option value="nature">Nature</option>
                              <option value="travel">Travel</option>
                              <option value="history">History</option>
                              <option value="shopping">Shopping</option>
                            </select>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-xl">
                              <DollarSign size={10} />
                              <input 
                                type="number" 
                                value={activity.cost} 
                                onChange={(e) => updateActivity(activeDay, idx, "cost", parseInt(e.target.value))}
                                className="w-12 bg-transparent focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Day Ending indicator */}
              <div className="relative">
                <div className="absolute -left-[39px] bg-indigo-100 p-2 rounded-full border-4 border-gray-50 z-10 shadow-sm">
                  <Moon size={16} className="text-indigo-600" />
                </div>
                <div className="py-4 ml-6">
                  <p className="text-xs font-bold text-midnight-blue/20 tracking-widest uppercase">End of {activeDayData?.label}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ItineraryBuilder() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary"><Sparkles className="animate-spin" /></div>}>
      <BuilderContent />
    </Suspense>
  );
}
