import React from 'react';
import { AppRoute } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle, 
  BookOpen, 
  MessageSquare, 
  Users,
  Menu,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const NavItem = ({ 
  route, 
  active, 
  label, 
  icon: Icon, 
  onClick 
}: { 
  route: AppRoute; 
  active: boolean; 
  label: string; 
  icon: any; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 mb-1.5 relative overflow-hidden ${
      active 
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
        : 'text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-soft'
    }`}
  >
    <div className="flex items-center space-x-3 relative z-10">
      <Icon size={20} className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'} transition-colors duration-300`} />
      <span className={`font-medium tracking-wide text-sm ${active ? 'font-semibold' : ''}`}>{label}</span>
    </div>
    {active && (
      <div className="relative z-10">
         <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
      </div>
    )}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, activeRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-40 w-72 h-full flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 pb-6">
          <div className="flex items-center space-x-3 text-indigo-950 font-display font-bold text-2xl tracking-tight cursor-pointer" onClick={() => onNavigate(AppRoute.DASHBOARD)}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
               <Sparkles className="text-white w-5 h-5" />
            </div>
            <span>JobPrep<span className="text-indigo-500">.ai</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          <NavItem 
            route={AppRoute.DASHBOARD} 
            active={activeRoute === AppRoute.DASHBOARD} 
            label="Dashboard" 
            icon={LayoutDashboard} 
            onClick={() => { onNavigate(AppRoute.DASHBOARD); setMobileMenuOpen(false); }}
          />
          
          <div className="pt-8 pb-3 px-4 flex items-center">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Resume Tools</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          
          <NavItem 
            route={AppRoute.RESUME} 
            active={activeRoute === AppRoute.RESUME} 
            label="Resume Analyzer" 
            icon={FileText} 
            onClick={() => { onNavigate(AppRoute.RESUME); setMobileMenuOpen(false); }}
          />
          <NavItem 
            route={AppRoute.JD_MATCH} 
            active={activeRoute === AppRoute.JD_MATCH} 
            label="JD Matcher" 
            icon={CheckCircle} 
            onClick={() => { onNavigate(AppRoute.JD_MATCH); setMobileMenuOpen(false); }} 
          />
          
          <div className="pt-8 pb-3 px-4 flex items-center">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Preparation</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <NavItem 
            route={AppRoute.INTERVIEW_PREP} 
            active={activeRoute === AppRoute.INTERVIEW_PREP} 
            label="Question Generator" 
            icon={BookOpen} 
            onClick={() => { onNavigate(AppRoute.INTERVIEW_PREP); setMobileMenuOpen(false); }} 
          />
          <NavItem 
            route={AppRoute.MOCK_INTERVIEW} 
            active={activeRoute === AppRoute.MOCK_INTERVIEW} 
            label="Mock Interview" 
            icon={MessageSquare} 
            onClick={() => { onNavigate(AppRoute.MOCK_INTERVIEW); setMobileMenuOpen(false); }} 
          />
          <NavItem 
            route={AppRoute.GD_TRAINER} 
            active={activeRoute === AppRoute.GD_TRAINER} 
            label="GD Trainer" 
            icon={Users} 
            onClick={() => { onNavigate(AppRoute.GD_TRAINER); setMobileMenuOpen(false); }} 
          />
        </nav>
        
        <div className="p-4 border-t border-slate-100/80 bg-slate-50/50 backdrop-blur-sm">
           <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-2xl border border-indigo-100/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-indigo-100/50 rounded-full blur-xl group-hover:bg-indigo-200/50 transition-colors"></div>
             <p className="text-xs text-indigo-900 font-bold mb-1 relative z-10 flex items-center">
               <Sparkles size={12} className="mr-1 text-indigo-500" /> Pro Tip
             </p>
             <p className="text-xs text-slate-600 leading-relaxed relative z-10">
               Tailoring your resume keywords increases ATS pass rates by 70%.
             </p>
           </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center px-4 justify-between shrink-0 z-20 sticky top-0 shadow-sm">
          <div className="flex items-center space-x-2" onClick={() => onNavigate(AppRoute.DASHBOARD)}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold text-xl text-slate-800">JobPrep</span>
          </div>
          <button 
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-fade-in-up pb-10">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};