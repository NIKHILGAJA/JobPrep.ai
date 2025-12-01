import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { GDTopic } from '../types';
import { Users, RefreshCcw, ThumbsUp, ThumbsDown, MessageCircle, Sparkles, Zap, Flag, Search } from 'lucide-react';

export const GDTrainer: React.FC = () => {
  const [topic, setTopic] = useState<GDTopic | null>(null);
  const [loading, setLoading] = useState(false);
  const [customTopic, setCustomTopic] = useState('');

  const fetchTopic = async () => {
    setLoading(true);
    setTopic(null);
    try {
      const data = await GeminiService.generateGDTopic(customTopic);
      setTopic(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-10 max-w-5xl mx-auto">
      <div className="animate-fade-in-up">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
            <Users size={16} />
            <span>Group Discussion</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-900">GD Trainer</h2>
        <p className="text-slate-500 mt-2 max-w-2xl text-lg">Master the art of group discussion with AI-generated arguments, key points, and conclusion strategies.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Custom Topic
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative group flex-1">
                <input 
                  type="text"
                  placeholder="e.g. Impact of AI on Future Jobs..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm outline-none font-medium placeholder-slate-400"
                />
                <Search className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
              </div>
              <button 
                onClick={fetchTopic}
                disabled={loading}
                className="w-full md:w-auto px-8 py-4 btn-primary rounded-xl font-bold text-white flex items-center justify-center whitespace-nowrap shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:shadow-none"
              >
                <RefreshCcw size={20} className={`mr-2.5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Analyzing...' : (customTopic ? 'Analyze Topic' : 'Random Topic')}
              </button>
            </div>
            <p className="text-xs font-medium text-slate-400 pl-1 flex items-center">
              <Sparkles size={12} className="mr-1" /> Leave empty to generate a random trending topic.
            </p>
        </div>
      </div>

      {!topic && !loading && (
        <div className="text-center py-24 bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
              <Users size={32} className="text-slate-300" />
           </div>
           <h3 className="text-xl font-bold text-slate-700 mb-2">Ready to Practice?</h3>
           <p className="text-slate-500 max-w-sm mx-auto">Enter a topic above or click "Random Topic" to generate a complete discussion guide.</p>
        </div>
      )}

      {loading && (
        <div className="space-y-6 animate-pulse mt-8">
            <div className="bg-white p-12 rounded-3xl border border-slate-200 h-64 flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="h-8 w-64 bg-slate-100 rounded-full mb-8"></div>
                 <div className="h-10 w-3/4 bg-slate-100 rounded-xl mb-4"></div>
                 <div className="h-10 w-2/3 bg-slate-100 rounded-xl"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white h-80 rounded-3xl border border-slate-200 p-8">
                      <div className="h-6 w-1/3 bg-slate-100 rounded mb-8"></div>
                      <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map(j => (
                              <div key={j} className="h-4 w-full bg-slate-100 rounded"></div>
                          ))}
                      </div>
                  </div>
                ))}
            </div>
        </div>
      )}

      {topic && (
        <div className="space-y-8 animate-scale-in">
          {/* Main Topic Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-12 rounded-[2rem] shadow-2xl text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-violet-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
            
            <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-sm">
                {customTopic ? 'Custom Topic' : 'Trending Topic'}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 leading-tight">
                {topic.topic}
                </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-card hover:shadow-card-hover transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
               <h3 className="flex items-center font-bold text-xl text-slate-800 mb-8 pb-4 border-b border-slate-100 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mr-4 shadow-sm">
                    <ThumbsUp size={20} />
                 </div>
                 Pros / For the Motion
               </h3>
               <ul className="space-y-4 relative z-10">
                 {topic.pros.map((p, i) => (
                   <li key={i} className="flex items-start text-slate-700 leading-relaxed font-medium">
                     <span className="mt-2 mr-3 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                     {p}
                   </li>
                 ))}
               </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-card hover:shadow-card-hover transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
               <h3 className="flex items-center font-bold text-xl text-slate-800 mb-8 pb-4 border-b border-slate-100 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mr-4 shadow-sm">
                    <ThumbsDown size={20} />
                 </div>
                 Cons / Against the Motion
               </h3>
               <ul className="space-y-4 relative z-10">
                 {topic.cons.map((p, i) => (
                   <li key={i} className="flex items-start text-slate-700 leading-relaxed font-medium">
                     <span className="mt-2 mr-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                     {p}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               {/* Opening Lines */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card">
                  <h3 className="flex items-center font-bold text-lg text-slate-800 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                        <MessageCircle size={20} />
                    </div>
                    Opening Lines
                  </h3>
                  <div className="space-y-4">
                    {topic.openingLines.map((line, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-500 text-slate-700 italic font-medium leading-relaxed relative hover:bg-white hover:shadow-sm transition-all">
                        <span className="absolute -top-3 -left-2 text-5xl text-indigo-200 font-serif opacity-50">"</span>
                        {line}
                      </div>
                    ))}
                  </div>
               </div>

               {/* Conclusions */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card">
                  <h3 className="flex items-center font-bold text-lg text-slate-800 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4">
                        <Flag size={20} />
                    </div>
                    How to Conclude
                  </h3>
                  <div className="space-y-3">
                    {topic.conclusions?.map((line, i) => (
                      <div key={i} className="flex items-start text-slate-700 font-medium leading-relaxed p-3 rounded-xl hover:bg-emerald-50/50 transition-colors">
                        <div className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                        {line}
                      </div>
                    )) || <p className="text-sm text-slate-400">No specific conclusion strategies generated.</p>}
                  </div>
               </div>
            </div>

            {/* Key Points Column */}
            <div className="lg:col-span-1 bg-gradient-to-b from-indigo-50 to-white p-8 rounded-3xl border border-indigo-100 h-fit sticky top-6">
              <h3 className="font-bold text-lg text-indigo-900 mb-6 flex items-center">
                 <Zap className="mr-2 text-indigo-500" size={20} /> Key Points
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {topic.points.map((pt, i) => (
                  <span key={i} className="px-4 py-2 bg-white text-indigo-700 rounded-xl text-xs font-bold border border-indigo-100 shadow-sm hover:scale-105 transition-transform cursor-default">
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};