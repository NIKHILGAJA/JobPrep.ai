import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { JDMatchResult } from '../types';
import { CheckCircle, AlertTriangle, FileText, Briefcase, Loader2, Target, ArrowRight, Star } from 'lucide-react';

export const JDMatcher: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JDMatchResult | null>(null);

  const handleMatch = async () => {
    if (!resumeText || !jdText) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await GeminiService.matchJD(resumeText, jdText);
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Error matching JD. Please check inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="animate-fade-in-up">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
            <Target size={16} />
            <span>Target Practice</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-900">JD Matcher & ATS Score</h2>
        <p className="text-slate-500 mt-2 max-w-2xl text-lg">Compare your resume against a specific job description to find gaps and optimize keywords.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center ml-1">
            <FileText size={16} className="mr-2 text-indigo-500" />
            Paste Resume Content
          </label>
          <div className="relative group flex-1">
            <textarea
              className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-mono text-sm leading-relaxed shadow-sm text-slate-600 placeholder-slate-300 outline-none"
              placeholder="Paste your full resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <div className="absolute inset-0 pointer-events-none rounded-3xl border border-transparent group-hover:border-indigo-200 transition-colors"></div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
           <label className="text-sm font-bold text-slate-700 flex items-center ml-1">
            <Briefcase size={16} className="mr-2 text-indigo-500" />
            Paste Job Description
          </label>
          <div className="relative group flex-1">
            <textarea
              className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-mono text-sm leading-relaxed shadow-sm text-slate-600 placeholder-slate-300 outline-none"
              placeholder="Paste the complete JD here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
             <div className="absolute inset-0 pointer-events-none rounded-3xl border border-transparent group-hover:border-indigo-200 transition-colors"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={handleMatch}
          disabled={loading || !resumeText || !jdText}
          className={`
            btn-primary px-12 py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:shadow-none flex items-center text-lg
            ${!loading && resumeText && jdText ? 'hover:-translate-y-1' : ''}
          `}
        >
          {loading ? <Loader2 className="animate-spin mr-3" /> : <Target className="mr-3" />}
          Run Match Analysis
        </button>
      </div>

      {loading && (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-10 shadow-lg animate-pulse mt-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
             {[1, 2, 3].map(i => (
                <div key={i} className="p-8 bg-slate-50 rounded-2xl flex flex-col items-center border border-slate-100">
                  <div className="h-4 bg-slate-200 rounded w-24 mb-6"></div>
                  <div className="h-12 bg-slate-200 rounded w-20"></div>
                </div>
             ))}
           </div>
           <div className="space-y-6">
             <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="h-48 bg-slate-50 rounded-2xl"></div>
               <div className="h-48 bg-slate-50 rounded-2xl"></div>
             </div>
           </div>
        </div>
      )}

      {result && (
        <div className="space-y-8 animate-scale-in">
           {/* Top Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-card hover:shadow-card-hover transition-all text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4"></div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Match Rate</div>
               <div className={`text-6xl font-display font-bold mb-2 ${result.matchPercentage > 75 ? 'text-green-600' : 'text-amber-500'}`}>
                 {result.matchPercentage}%
               </div>
               <div className="text-sm font-medium text-slate-500">Resume vs JD Compatibility</div>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-card hover:shadow-card-hover transition-all text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4"></div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">ATS Score</div>
               <div className={`text-6xl font-display font-bold mb-2 ${result.atsScore > 80 ? 'text-indigo-600' : 'text-blue-500'}`}>
                 {result.atsScore}
               </div>
               <div className="text-sm font-medium text-slate-500">Predicted Screen Pass Rate</div>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-center">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-sm font-bold text-slate-700">Keyword Density</span>
                   <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">High Priority</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-2">
                  <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${result.matchPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 leading-snug mt-2">
                  Improve this score by adding missing hard skills listed below.
                </p>
             </div>
           </div>

           {/* Feedback Section */}
           <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-card">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
                  <Star className="fill-indigo-500 text-indigo-500 mr-2" size={20} />
                  Recruiter Feedback
              </h3>
              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50 text-slate-700 leading-relaxed font-medium">
                {result.recruiterFeedback}
              </div>
           </div>

           {/* Skills Columns */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-green-100/50 shadow-card hover:shadow-card-hover transition-all">
                 <h3 className="font-bold text-green-700 mb-6 flex items-center text-lg">
                   <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle size={18} className="text-green-600" /> 
                   </div>
                   Matched Skills
                 </h3>
                 <div className="flex flex-wrap gap-2.5">
                   {result.matchedSkills.map(skill => (
                     <span key={skill} className="px-3.5 py-1.5 bg-white text-green-800 rounded-lg text-sm font-bold border border-green-100 shadow-sm flex items-center">
                       {skill}
                     </span>
                   ))}
                 </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-red-100/50 shadow-card hover:shadow-card-hover transition-all">
                 <h3 className="font-bold text-red-700 mb-6 flex items-center text-lg">
                   <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                      <AlertTriangle size={18} className="text-red-600" /> 
                   </div>
                   Missing Skills
                 </h3>
                 <div className="flex flex-wrap gap-2.5">
                   {result.missingSkills.map(skill => (
                     <span key={skill} className="px-3.5 py-1.5 bg-white text-red-700 rounded-lg text-sm font-bold border border-red-100 shadow-sm opacity-90 flex items-center">
                       {skill}
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