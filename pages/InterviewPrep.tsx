import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { InterviewQuestion } from '../types';
import { Loader2, Plus, ChevronDown, ChevronUp, Sparkles, Briefcase, FileText, Zap } from 'lucide-react';

export const InterviewPrep: React.FC = () => {
  const [role, setRole] = useState('');
  const [jdSnippet, setJdSnippet] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const generate = async () => {
    if (!role) return;
    setLoading(true);
    setQuestions([]);
    try {
      const data = await GeminiService.generateQuestions(role, jdSnippet);
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-10 pb-10 max-w-5xl mx-auto">
       <div className="animate-fade-in-up">
         <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
            <Zap size={16} />
            <span>Interview Simulator</span>
         </div>
         <h2 className="text-3xl font-display font-bold text-slate-900">Question Generator</h2>
         <p className="text-slate-500 mt-2 max-w-2xl text-lg">Generate AI-curated technical and behavioral questions tailored to your specific role and tech stack.</p>
       </div>

       <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="space-y-3">
             <label className="text-sm font-bold text-slate-700 flex items-center ml-1">
                <Briefcase size={16} className="mr-2 text-indigo-500"/> Target Role
             </label>
             <input 
               type="text" 
               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm outline-none placeholder-slate-400"
               placeholder="e.g. Senior React Developer"
               value={role}
               onChange={(e) => setRole(e.target.value)}
             />
           </div>
           <div className="space-y-3">
             <label className="text-sm font-bold text-slate-700 flex items-center ml-1">
                <FileText size={16} className="mr-2 text-indigo-500"/> Context / Tech Stack
             </label>
             <input 
               type="text" 
               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm outline-none placeholder-slate-400"
               placeholder="Next.js, Tailwind, Fintech, Startup..."
               value={jdSnippet}
               onChange={(e) => setJdSnippet(e.target.value)}
             />
           </div>
         </div>
         <button 
           onClick={generate}
           disabled={!role || loading}
           className={`
             w-full md:w-auto btn-primary px-10 py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all
             ${(!role || loading) ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:-translate-y-1'}
           `}
         >
           {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Sparkles className="mr-2" size={20} />}
           Generate Question Set
         </button>
       </div>

       <div className="space-y-4">
         {loading ? (
            // Modern Skeleton Loading State
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse flex items-center justify-between shadow-sm">
                <div className="flex flex-col space-y-4 w-full">
                  <div className="flex space-x-3">
                      <div className="h-6 w-20 bg-slate-100 rounded-lg"></div>
                      <div className="h-6 w-20 bg-slate-100 rounded-lg"></div>
                  </div>
                  <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            ))
         ) : (
           questions.map((q, idx) => (
             <div 
                key={q.id} 
                className={`
                  bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300
                  animate-fade-in-up group
                `}
                style={{ animationDelay: `${idx * 0.05}s` }}
             >
               <div 
                 className={`
                   p-6 flex items-start md:items-center justify-between cursor-pointer transition-colors
                   ${expandedId === q.id ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}
                 `}
                 onClick={() => toggleExpand(q.id)}
               >
                 <div className="flex-1 pr-6">
                   <div className="flex items-center space-x-2 mb-3">
                     <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg border ${
                       q.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-100' :
                       q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                       'bg-red-50 text-red-700 border-red-100'
                     }`}>
                       {q.difficulty}
                     </span>
                     <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg border ${
                        q.type === 'technical' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'
                     }`}>
                       {q.type}
                     </span>
                   </div>
                   <h3 className={`text-lg font-semibold transition-colors leading-relaxed ${expandedId === q.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                     {q.question}
                   </h3>
                 </div>
                 <div className={`
                    w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-sm
                    group-hover:border-indigo-200 group-hover:text-indigo-500
                    ${expandedId === q.id ? 'rotate-180 bg-indigo-50 text-indigo-600 border-indigo-200' : ''}
                 `}>
                    <ChevronDown size={20} />
                 </div>
               </div>
               
               {/* Accordion Content */}
               <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedId === q.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 {q.followUp && (
                    <div className="px-6 pb-6 pt-2 bg-indigo-50/30 border-t border-indigo-50/50">
                      <div className="bg-white/60 p-5 rounded-xl border border-indigo-100/50">
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center">
                          <Sparkles className="w-3 h-3 mr-2" />
                          Suggested Follow-ups
                        </p>
                        <ul className="space-y-3">
                          {q.followUp.map((fq, i) => (
                            <li key={i} className="flex items-start text-slate-700 text-sm font-medium">
                              <span className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                              {fq}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                 )}
               </div>
             </div>
           ))
         )}
       </div>
    </div>
  );
};