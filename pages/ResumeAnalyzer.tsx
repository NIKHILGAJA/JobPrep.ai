import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { ResumeAnalysis } from '../types';
import { Upload, Loader2, AlertCircle, Check, X, Award, FileText, ChevronRight, Zap, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await GeminiService.analyzeResume(file);
      setResult(data);
    } catch (err: any) {
      setError("Failed to analyze resume. Please try again or use a different file.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scoreData = result ? [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score },
  ] : [];
  
  const COLORS = ['#6366f1', '#f1f5f9'];

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
        <div>
           <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
              <FileText size={16} />
              <span>Resume Audit</span>
           </div>
           <h2 className="text-3xl font-display font-bold text-slate-900">Resume Analyzer</h2>
           <p className="text-slate-500 mt-2 max-w-xl text-lg">Upload your CV to get an AI-powered deep dive into your strengths and formatting.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-slate-200/60 shadow-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className={`
          relative group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-14 transition-all duration-300
          ${file ? 'border-indigo-400 bg-indigo-50/20' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
        `}>
          <input 
            type="file" 
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`
            w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm
            ${file ? 'bg-indigo-100 text-indigo-600 scale-110' : 'bg-slate-50 text-slate-400 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-500'}
          `}>
             <Upload size={32} strokeWidth={1.5} />
          </div>
          <h3 className="text-slate-900 font-bold text-xl mb-2">{file ? file.name : "Drop your resume here"}</h3>
          <p className="text-slate-500 font-medium">{file ? "Click to change file" : "Supports PDF, PNG, JPG (Max 5MB)"}</p>
        </div>
        
        <div className="flex justify-center mt-10">
           <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className={`
              btn-primary px-12 py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center shadow-lg hover:shadow-indigo-500/30
              ${(!file || loading) ? 'opacity-50 cursor-not-allowed shadow-none grayscale' : 'hover:-translate-y-1'}
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-3" size={22} />
                Analyzing Document...
              </>
            ) : (
              <>
                Start Analysis <ChevronRight size={20} className="ml-2" />
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center justify-center animate-fade-in-up font-medium">
            <AlertCircle size={20} className="mr-2"/> {error}
          </div>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-200 h-96 flex flex-col items-center justify-center relative shadow-sm">
            <div className="h-6 bg-slate-100 rounded-full w-32 mb-10"></div>
            <div className="w-56 h-56 rounded-full border-[20px] border-slate-100 mb-8 relative opacity-50"></div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                 <div className="h-6 bg-slate-100 rounded w-48 mb-6"></div>
                 <div className="space-y-4">
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {/* Score Card */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200/60 shadow-card p-8 flex flex-col items-center relative overflow-hidden group hover:shadow-card-hover transition-all duration-300">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
            <div className="w-full flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-slate-800 flex items-center">
                 <Award className="text-indigo-500 mr-2" size={20}/> Resume Score
               </h3>
               <span className={`px-2 py-1 rounded-lg text-xs font-bold ${result.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                 {result.score >= 70 ? 'GOOD' : 'NEEDS WORK'}
               </span>
            </div>
            
            <div className="h-64 w-full relative my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                    paddingAngle={2}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-6xl font-display font-bold text-indigo-600 tracking-tight">{result.score}</span>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Total Score</span>
              </div>
            </div>
            
            <div className="mt-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-100 w-full text-center">
               <p className="text-slate-600 text-sm leading-relaxed font-medium">{result.summary}</p>
            </div>
          </div>

          {/* Details & Improvements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card hover:shadow-card-hover transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                 <Zap className="text-amber-500 mr-2" size={20}/> Detected Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white text-slate-700 rounded-xl text-sm font-semibold border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Improvements */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card hover:shadow-card-hover transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center text-red-600">
                <AlertCircle className="mr-2" size={20} />
                Critical Improvements
              </h3>
              <ul className="space-y-4">
                {result.improvements.map((item, i) => (
                  <li key={i} className="flex items-start text-slate-700 bg-red-50/50 p-4 rounded-xl border border-red-50 group hover:bg-red-50 transition-colors">
                    <div className="mt-0.5 mr-3 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                       <X size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
             
             {/* Missing Keywords */}
             <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-card hover:shadow-card-hover transition-all duration-300">
              <h3 className="text-lg font-bold text-indigo-600 mb-6 flex items-center">
                 <Target className="mr-2" size={20} /> Suggested Keywords
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100 border-dashed hover:bg-indigo-100 transition-colors cursor-default">
                    + {kw}
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