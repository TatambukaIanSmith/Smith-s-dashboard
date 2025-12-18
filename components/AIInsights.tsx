import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, Zap, Loader2, Send, Wand2, ArrowRight } from 'lucide-react';
import { getAIPlatformSummary } from '../services/geminiService';
import { GoogleGenAI } from "@google/genai";

export const AIInsights: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [scenario, setScenario] = useState<string>('');
  const [scenarioLoading, setScenarioLoading] = useState<boolean>(false);
  const [scenarioResult, setScenarioResult] = useState<string>('');

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = {
        users: '12,847',
        jobs: '456',
        pending: '89',
        disputes: '12'
      };
      const result = await getAIPlatformSummary(data);
      setSummary(result);
      setLoading(false);
    };

    fetchInsights();
  }, []);

  const runScenario = async () => {
    if (!scenario.trim()) return;
    setScenarioLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As an expert platform strategist, analyze this "What-If" scenario for Job-lyNK: "${scenario}". Provide a concise, professional assessment in 2-3 sentences.`,
      });
      setScenarioResult(response.text || "Assessment failed.");
    } catch (e) {
      setScenarioResult("Error running simulation.");
    }
    setScenarioLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* AI Hero */}
      <div className="bg-black rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-all duration-500">
                <Sparkles className="w-8 h-8 text-white fill-white/10" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight leading-none">Gemini 3.0 Core</h2>
                <p className="text-indigo-400 font-black text-[11px] uppercase tracking-[0.3em] mt-2">Active Strategic Monitoring</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <p className="text-gray-500 font-medium italic">Scanning platform liquidity metrics...</p>
                </div>
              ) : (
                <p className="text-3xl font-bold leading-tight tracking-tight text-white/90">
                  "{summary}"
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
               <div className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-[11px] font-black uppercase tracking-widest text-indigo-400">
                  Tokens Sync: Active
               </div>
               <div className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-[11px] font-black uppercase tracking-widest text-emerald-400">
                  Model: Flash-Latest
               </div>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-6 relative">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 space-y-6 hover:bg-white/10 transition-all">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Wand2 className="w-4 h-4" /></div>
                 <h4 className="font-black text-[11px] uppercase tracking-widest">Network Score</h4>
               </div>
               <div className="flex items-end gap-3">
                 <span className="text-5xl font-black tracking-tighter">9.4</span>
                 <span className="text-indigo-500 font-black text-[14px] mb-1.5">/ 10</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full w-[94%]"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Background Icons */}
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
          <BrainCircuit className="w-[400px] h-[400px] -mr-20 -mt-20" />
        </div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Scenario Simulator */}
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner"><Lightbulb className="w-7 h-7" /></div>
              Strategy Simulator
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed italic mb-8">
              Analyze marketplace outcomes by simulating policy adjustments or market events using generative modeling.
            </p>
            <div className="relative group">
              <input 
                type="text" 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runScenario()}
                placeholder="e.g. Reduce platform fees for workers by 3%..."
                className="w-full px-8 py-5 bg-gray-50 border-none rounded-[1.75rem] text-[15px] font-bold focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-gray-300"
              />
              <button 
                onClick={runScenario}
                disabled={scenarioLoading}
                className="absolute right-3 top-3 p-3 bg-amber-500 text-white rounded-2xl shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-90 disabled:opacity-50"
              >
                {scenarioLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="mt-8">
            {scenarioResult ? (
              <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 animate-in zoom-in duration-300">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">Simulation Result</p>
                <p className="text-[15px] font-bold text-gray-900 leading-relaxed italic">"{scenarioResult}"</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-gray-300 italic text-sm">
                 <ArrowRight className="w-4 h-4" /> Enter a strategy to begin simulation.
              </div>
            )}
          </div>
        </div>

        {/* Real-time Insights Feed */}
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner"><Zap className="w-7 h-7" /></div>
              Neural Feed
            </h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">Live Stream</span>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Market Sentiment', val: 'Highly Bullish', trend: 'up' },
              { label: 'Node Distribution', val: 'Decentralized', trend: 'up' },
              { label: 'Moderation Backlog', val: 'Low Risk', trend: 'down' },
            ].map((insight, idx) => (
              <div key={idx} className="group p-6 bg-gray-50/50 rounded-[2rem] border border-transparent hover:border-blue-100 hover:bg-white transition-all flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{insight.label}</p>
                  <p className="text-[16px] font-black text-gray-900 mt-1">{insight.val}</p>
                </div>
                <div className={`p-2 rounded-xl bg-gray-100 text-gray-600`}>
                   <Zap className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center pt-10 border-t border-gray-100">
         <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.6em] italic leading-relaxed">"Getting jobs to your doorstep."</p>
      </div>
    </div>
  );
};