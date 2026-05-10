"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, Image as ImageIcon, Smile, Frown, Meh, Heart, Plus, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const moods = [
  { id: "amazing", icon: Heart, color: "text-pink-500", bg: "bg-pink-100" },
  { id: "happy", icon: Smile, color: "text-green-500", bg: "bg-green-100" },
  { id: "neutral", icon: Meh, color: "text-yellow-500", bg: "bg-yellow-100" },
  { id: "tired", icon: Frown, color: "text-blue-500", bg: "bg-blue-100" },
];

const journalEntries = [
  {
    id: 1,
    date: "Oct 12, 2026",
    location: "Kolkata, India",
    content: "Started the trip with amazing breakfast at Flurys. The city has so much charm and the architecture is incredible! Met some lovely locals who showed us around the Victoria Memorial.",
    mood: "amazing",
    images: [
      "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop"
    ],
    hasVoiceNote: false
  },
  {
    id: 2,
    date: "Oct 13, 2026",
    location: "Goa, India",
    content: "Arrived in Goa! The flight was a bit delayed, hence the tired mood, but the sunset at the beach completely made up for it. The sound of the waves is so relaxing.",
    mood: "tired",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop"
    ],
    hasVoiceNote: true
  }
];

export default function TripJournal() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [entryText, setEntryText] = useState("");

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto w-full min-h-screen">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Travel Journal</h1>
        <p className="text-midnight-blue/70">Capture your memories, thoughts, and feelings.</p>
      </div>

      {/* Create Entry Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-3xl bg-white shadow-md border border-primary/20 mb-10"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-sm flex items-center gap-2">
            <Calendar size={16} className="text-primary" /> Today, Oct 14
          </p>
          <div className="flex gap-2">
            {moods.map(mood => {
              const Icon = mood.icon;
              return (
                <button 
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-2 rounded-full transition-transform hover:scale-110 ${selectedMood === mood.id ? mood.bg : 'bg-gray-50'}`}
                >
                  <Icon size={20} className={`${selectedMood === mood.id ? mood.color : 'text-gray-400'}`} />
                </button>
              )
            })}
          </div>
        </div>

        <textarea 
          placeholder="What made you smile today?"
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          className="w-full bg-gray-50 border-none rounded-2xl p-4 min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20 focus:outline-none mb-4 text-midnight-blue"
        />

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="p-3 bg-gray-50 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors text-gray-500">
              <Camera size={20} />
            </button>
            <button className="p-3 bg-gray-50 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors text-gray-500">
              <ImageIcon size={20} />
            </button>
            <button 
              onClick={handleRecord}
              className={`p-3 rounded-xl transition-colors flex items-center gap-2 ${isRecording ? 'bg-red-100 text-red-500' : 'bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-500'}`}
            >
              <Mic size={20} />
              {isRecording && <span className="text-xs font-bold animate-pulse">Recording...</span>}
            </button>
          </div>
          <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-secondary transition-colors flex items-center gap-2 shadow-md">
            <Plus size={18} /> Save Memory
          </button>
        </div>
      </motion.div>

      {/* Past Entries */}
      <div className="space-y-8 relative before:absolute before:left-8 before:top-4 before:bottom-0 before:w-[2px] before:bg-primary/20">
        
        {journalEntries.map((entry, idx) => {
          const moodData = moods.find(m => m.id === entry.mood) || moods[0];
          const MoodIcon = moodData.icon;

          return (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-20"
            >
              {/* Timeline dot */}
              <div className={`absolute left-[20px] top-4 w-12 h-12 -translate-x-1/2 rounded-full border-4 border-white flex items-center justify-center z-10 ${moodData.bg} ${moodData.color} shadow-sm`}>
                <MoodIcon size={20} />
              </div>

              <div className="glass p-6 rounded-3xl bg-white/80 hover:bg-white transition-colors border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{entry.date}</h3>
                    <p className="text-xs font-bold text-primary flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {entry.location}
                    </p>
                  </div>
                </div>

                <p className="text-midnight-blue/80 leading-relaxed mb-4">
                  {entry.content}
                </p>

                {entry.images && entry.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
                    {entry.images.map((img, i) => (
                      <div key={i} className="relative w-40 h-32 shrink-0 rounded-xl overflow-hidden cursor-pointer group">
                        <Image src={img} alt={`Journal ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                )}

                {entry.hasVoiceNote && (
                  <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                    <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                    <div className="flex gap-1 items-center h-4">
                      {[1,2,3,4,5,4,3,5,2,1].map((h, i) => (
                        <div key={i} className="w-1 bg-primary/40 rounded-full" style={{ height: `${h * 20}%` }} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-500 ml-2">0:45</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}

      </div>
    </div>
  );
}
