import React from 'react';
import { AppRoute } from '../types';
import { ArrowRight, FileText, Target, Mic, Users, Sparkles, TrendingUp, Zap } from 'lucide-react';

interface DashboardProps {
  onNavigate: (route: AppRoute) => void;
}

const FeatureCard = ({ 
  title, 
  desc, 
  icon: Icon, 
  gradient,
  delay,
  onClick 
}: { 
  title: string; 
  desc: string; 
  icon: any; 
  gradient: string;
  delay: string;
  onClick: () => void; 
}) => (
  <div 
    onClick={onClick}
    className="
      relative bg-white rounded-3xl p-7 border border-slate-200/60 shadow-card hover:shadow-card-hover 
      transition-all duration-300 ease-out cursor-pointer group flex flex-col h-full animate-fade-in-up overflow-hidden
    "
    style={{ animationDelay: delay }}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.03] rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700`}></div>
    
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} shadow-lg shadow-indigo-500/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
      <Icon className="text-white" size={26} />
    </div>
    
    <h3 className="text-xl font-display font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 font-medium">{desc}</p>
    
    <div className="flex items-center text-indigo-600 text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform duration-300">
      <span className="relative">
        Get Started
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
      </span>
      <ArrowRight size={16} className="ml-2" />
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-2">
        <div className="animate-fade-in-up max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50/80 backdrop-blur-sm border border-indigo-100 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>AI Powered Suite v2.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4 leading-tight">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">Candidate</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl">
            Your personal AI career coach is ready. Optimize your resume, master interviews, and land your dream job faster.
          </p>
        </div>
        
        <div className="hidden md:flex space-x-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
           <div className="glass-panel px-4 py-2.5 rounded-xl shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-sm font-semibold text-slate-600">All Systems Operational</span>
           </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          title="Resume Analyzer" 
          desc="AI-driven audit of your CV. Fix formatting errors and discover missing high-value keywords."
          icon={FileText}
          gradient="from-blue-500 to-blue-600"
          delay="0.1s"
          onClick={() => onNavigate(AppRoute.RESUME)}
        />
        <FeatureCard 
          title="JD Matcher" 
          desc="Compare your profile against any Job Description. Get a match score and gap analysis."
          icon={Target}
          gradient="from-indigo-500 to-indigo-600"
          delay="0.2s"
          onClick={() => onNavigate(AppRoute.JD_MATCH)}
        />
        <FeatureCard 
          title="Mock Interview" 
          desc="Real-time voice simulated interview with instant feedback on your answers and delivery."
          icon={Mic}
          gradient="from-violet-500 to-violet-600"
          delay="0.3s"
          onClick={() => onNavigate(AppRoute.MOCK_INTERVIEW)}
        />
        <FeatureCard 
          title="GD Trainer" 
          desc="Master group discussions with AI-generated pros, cons, and winning opening statements."
          icon={Users}
          gradient="from-pink-500 to-rose-600"
          delay="0.4s"
          onClick={() => onNavigate(AppRoute.GD_TRAINER)}
        />
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-indigo-900/20 animate-fade-in-up group" style={{ animationDelay: '0.5s' }}>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-violet-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-10 right-10 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-[1.5s]">
           <Zap size={120} />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-14 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-indigo-300 font-bold mb-2 uppercase tracking-wide text-xs">
              <TrendingUp size={16} />
              <span>Boost Your Preparation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">Ready to ace your <br/>next technical round?</h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Generate role-specific questions based on real industry standards. 
              Prepare for technical and behavioral rounds efficiently.
            </p>
            <button 
              onClick={() => onNavigate(AppRoute.INTERVIEW_PREP)}
              className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1 active:translate-y-0 flex items-center"
            >
              Start Practice <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          
          {/* Visual Element */}
          <div className="hidden md:flex justify-end perspective-1000">
             <div className="glass-panel bg-white/5 border-white/10 p-6 rounded-2xl w-80 transform rotate-y-12 rotate-z-3 group-hover:rotate-y-6 group-hover:rotate-z-0 transition-all duration-700 shadow-2xl">
                <div className="flex items-center space-x-3 mb-5 border-b border-white/10 pb-4">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold shadow-lg">AI</div>
                   <div className="space-y-1.5">
                      <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                      <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="h-2.5 w-full bg-white/10 rounded-full"></div>
                   <div className="h-2.5 w-5/6 bg-white/10 rounded-full"></div>
                   <div className="h-2.5 w-4/6 bg-white/10 rounded-full"></div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                   <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-lg font-bold border border-emerald-500/30 flex items-center">
                      <Sparkles size={12} className="mr-1" /> 98% Match
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowRight size={14} className="text-white/70" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};