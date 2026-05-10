"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Wallet, TrendingDown, TrendingUp, AlertCircle, PieChart as PieChartIcon, Target, Sparkles, Coffee, Home, Plane, Ticket } from "lucide-react";

function BudgetContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city") || "Goa";
  const [budgetTitle, setBudgetTitle] = useState(`Mystic ${cityParam} Escapade`);
  const [budgetData, setBudgetData] = useState({
    total: 2500,
    flights: 650,
    accommodation: 320,
    food: 180,
    activities: 90,
    dailyAverage: 155,
    savingsTip: "Switching to local restaurants for the next 2 days can save you ~$80."
  });

  // Load from cache if generated
  useState(() => {
    if (typeof window !== "undefined") {
      const cacheKey = `traveloop_trip_${cityParam}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.tripName) setBudgetTitle(parsed.tripName);
        if (parsed.budget) {
          setBudgetData({
            total: parsed.budget.total || 2500,
            flights: parsed.budget.flights || 650,
            accommodation: parsed.budget.accommodation || 320,
            food: parsed.budget.food || 180,
            activities: parsed.budget.activities || 90,
            dailyAverage: parsed.budget.dailyAverage || 155,
            savingsTip: parsed.budget.savingsTip || "Try exploring local street food markets."
          });
        }
      }
    }
  });

  const spent = budgetData.flights + budgetData.accommodation + budgetData.food + budgetData.activities;
  const remaining = budgetData.total - spent;
  const remainingPercent = ((remaining / budgetData.total) * 100).toFixed(1);
  const targetAvg = Math.round(budgetData.total / 4); // Assuming 4 days

  const flightPercent = ((budgetData.flights / spent) * 100).toFixed(0);
  const accPercent = ((budgetData.accommodation / spent) * 100).toFixed(0);
  const foodPercent = ((budgetData.food / spent) * 100).toFixed(0);
  const actPercent = ((budgetData.activities / spent) * 100).toFixed(0);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto w-full min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Budget Planner</h1>
          <p className="text-midnight-blue/70">Track your expenses for {budgetTitle}</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
          <Target size={16} /> Budget Goal: ${budgetData.total}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Overview & Analytics */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass p-6 rounded-3xl bg-gradient-to-br from-primary to-blue-500 text-white">
              <div className="flex items-center gap-2 mb-4 text-white/80">
                <Wallet size={20} /> <span className="font-bold text-sm">Total Spent</span>
              </div>
              <h2 className="text-4xl font-bold mb-2">${spent}</h2>
              <p className="text-sm text-white/80 flex items-center gap-1">
                <TrendingUp size={16} className="text-red-300" /> AI Estimated
              </p>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-3xl bg-white">
              <div className="flex items-center gap-2 mb-4 text-midnight-blue/60">
                <PieChartIcon size={20} /> <span className="font-bold text-sm">Remaining</span>
              </div>
              <h2 className="text-4xl font-bold mb-2 text-accent">${remaining}</h2>
              <p className="text-sm text-midnight-blue/60 flex items-center gap-1">
                <AlertCircle size={16} className={remaining < 0 ? "text-red-500" : "text-yellow-500"} /> {remainingPercent}% of budget
              </p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-3xl bg-white">
              <div className="flex items-center gap-2 mb-4 text-midnight-blue/60">
                <TrendingDown size={20} /> <span className="font-bold text-sm">Daily Avg</span>
              </div>
              <h2 className="text-4xl font-bold mb-2">${budgetData.dailyAverage}</h2>
              <p className="text-sm text-midnight-blue/60">Target: ${targetAvg}/day</p>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div className={`h-1.5 rounded-full ${budgetData.dailyAverage > targetAvg ? "bg-red-400" : "bg-green-400"}`} style={{ width: `${Math.min((budgetData.dailyAverage / targetAvg) * 100, 100)}%` }}></div>
              </div>
            </motion.div>
          </div>

          {/* Expense Analytics Chart (Mocked) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-3xl bg-white">
            <h3 className="text-lg font-bold mb-6">Spending Breakdown</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Plane size={16} /></div>
                    <span className="font-bold text-sm">Flights & Transport</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">${budgetData.flights}</span>
                    <span className="text-xs text-gray-500">{flightPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${flightPercent}%` }} transition={{ duration: 1 }} className="bg-blue-500 h-2 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Home size={16} /></div>
                    <span className="font-bold text-sm">Accommodation</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">${budgetData.accommodation}</span>
                    <span className="text-xs text-gray-500">{accPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${accPercent}%` }} transition={{ duration: 1, delay: 0.2 }} className="bg-purple-500 h-2 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Coffee size={16} /></div>
                    <span className="font-bold text-sm">Food & Dining</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">${budgetData.food}</span>
                    <span className="text-xs text-gray-500">{foodPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${foodPercent}%` }} transition={{ duration: 1, delay: 0.4 }} className="bg-orange-500 h-2 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Ticket size={16} /></div>
                    <span className="font-bold text-sm">Activities & Tours</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">${budgetData.activities}</span>
                    <span className="text-xs text-gray-500">{actPercent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${actPercent}%` }} transition={{ duration: 1, delay: 0.6 }} className="bg-green-500 h-2 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column - AI Insights & Recent */}
        <div className="space-y-8">
          
          {/* AI Smart Savings */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-dark p-6 rounded-3xl bg-midnight-blue text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Sparkles className="text-yellow-400" size={20} />
              <h3 className="font-bold text-lg">AI Smart Prediction</h3>
            </div>
            
            <p className="text-white/80 text-sm mb-4 relative z-10 leading-relaxed">
              Based on the AI estimation for {cityParam}, your projected daily average is <strong className="text-yellow-400">${budgetData.dailyAverage}</strong>.
            </p>
            
            <div className="bg-white/10 rounded-xl p-4 relative z-10">
              <h4 className="font-bold text-sm text-yellow-400 mb-2">Savings Tip:</h4>
              <p className="text-xs text-white/90">
                {budgetData.savingsTip}
              </p>
            </div>
          </motion.div>

          {/* Quick Add Expense */}
          <div className="glass p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Add Expense</h3>
            <form className="space-y-4">
              <div>
                <input type="number" placeholder="Amount ($)" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <input type="text" placeholder="Description (e.g. Lunch)" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50">Food</button>
                <button type="button" className="py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50">Transport</button>
              </div>
              <button type="button" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors mt-2 text-sm">
                Save Expense
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function BudgetPlanner() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary"><Sparkles className="animate-spin" /></div>}>
      <BudgetContent />
    </Suspense>
  );
}
