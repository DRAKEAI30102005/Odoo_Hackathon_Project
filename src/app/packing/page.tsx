"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Plus, Trash2, Sparkles, Sun, Umbrella, Briefcase } from "lucide-react";

export default function PackingChecklist() {
  const [items, setItems] = useState([
    { id: 1, text: "Passport & ID", checked: false, category: "essentials" },
    { id: 2, text: "Flight Tickets", checked: false, category: "essentials" },
    { id: 3, text: "Phone Charger", checked: true, category: "electronics" },
    { id: 4, text: "Swimwear", checked: false, category: "clothing", aiSuggested: true },
    { id: 5, text: "Sunscreen SPF 50+", checked: false, category: "toiletries", aiSuggested: true },
    { id: 6, text: "Sunglasses", checked: false, category: "accessories", aiSuggested: true },
  ]);
  const [newItem, setNewItem] = useState("");

  const toggleCheck = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), text: newItem, checked: false, category: "other" }]);
    setNewItem("");
  };

  const completedCount = items.filter(i => i.checked).length;
  const progress = Math.round((completedCount / items.length) * 100) || 0;

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto w-full min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Smart Packing</h1>
          <p className="text-midnight-blue/70">Getting ready for Mystic Goa Escapade</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Briefcase size={16} className="text-primary" />
          <span className="font-bold text-sm">{progress}% Packed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Checklist */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Progress Bar */}
          <div className="glass p-4 rounded-2xl bg-white">
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
              <span>Progress</span>
              <span>{completedCount} / {items.length} items</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }} 
                className="bg-primary h-3 rounded-full" 
              />
            </div>
          </div>

          {/* Add Item Form */}
          <form onSubmit={addItem} className="flex gap-2">
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item..." 
              className="flex-1 bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-primary shadow-sm"
            />
            <button type="submit" className="bg-primary text-white p-3 rounded-xl hover:bg-secondary transition-colors shadow-md">
              <Plus size={24} />
            </button>
          </form>

          {/* Checklist */}
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className={`flex items-center justify-between p-4 rounded-xl border transition-colors group ${
                    item.checked ? "bg-gray-50 border-gray-200 text-gray-400" : "bg-white border-primary/20 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleCheck(item.id)}>
                    {item.checked ? (
                      <CheckCircle2 size={24} className="text-primary" />
                    ) : (
                      <Circle size={24} className="text-gray-300 group-hover:text-primary transition-colors" />
                    )}
                    <span className={`font-medium ${item.checked ? "line-through" : "text-midnight-blue"}`}>
                      {item.text}
                    </span>
                    {item.aiSuggested && !item.checked && (
                      <span className="ml-2 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles size={10} /> AI Pick
                      </span>
                    )}
                  </div>
                  <button onClick={() => deleteItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Recommendations sidebar */}
        <div className="space-y-6">
          <div className="glass-dark bg-midnight-blue p-6 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <Sparkles size={20} />
              <h3 className="font-bold">AI Suggestions</h3>
            </div>
            
            <p className="text-sm text-white/80 mb-6">Based on Goa's current weather (30°C, Sunny) and your beach itinerary:</p>
            
            <div className="space-y-3 relative z-10">
              <button onClick={() => setItems([...items, { id: Date.now(), text: "Mosquito Repellent", checked: false, category: "toiletries", aiSuggested: true }])} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/10 transition-colors text-left text-sm font-medium">
                <span className="flex items-center gap-2"><Umbrella size={16} className="text-blue-300" /> Mosquito Repellent</span>
                <Plus size={16} />
              </button>
              <button onClick={() => setItems([...items, { id: Date.now(), text: "Aloe Vera Gel", checked: false, category: "toiletries", aiSuggested: true }])} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/10 transition-colors text-left text-sm font-medium">
                <span className="flex items-center gap-2"><Sun size={16} className="text-yellow-300" /> Aloe Vera Gel</span>
                <Plus size={16} />
              </button>
              <button onClick={() => setItems([...items, { id: Date.now(), text: "Waterproof Phone Case", checked: false, category: "accessories", aiSuggested: true }])} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/10 transition-colors text-left text-sm font-medium">
                <span className="flex items-center gap-2"><Briefcase size={16} className="text-primary" /> Waterproof Phone Case</span>
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
