import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, Bot, RefreshCw, Loader2, Play, Sparkles, Mic } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const MockInterview: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const startSession = () => {
    setStarted(true);
    const initialMsg: ChatMessage = {
      id: 'init',
      role: 'model',
      text: "Hello! I am your AI HR Interviewer. I'm here to conduct a mock interview with you. To begin, please tell me the role you are applying for and briefly introduce yourself.",
      timestamp: new Date()
    };
    setMessages([initialMsg]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await GeminiService.getInterviewFeedback(history, userMsg.text);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.nextQuestion,
        feedback: response.feedback,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (e) {
      console.error(e);
      const errorMsg: ChatMessage = {
        id: 'error',
        role: 'model',
        text: "I encountered an error processing your response. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] animate-fade-in-up">
        <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200/60 shadow-2xl text-center max-w-lg relative overflow-hidden group">
          {/* Decorative gradients */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg shadow-indigo-500/10 border border-slate-50">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center">
                 <Mic size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">Mock Interview</h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed px-4">
              Practice with our AI HR Manager. Get real-time feedback on your answers, tone, and clarity.
            </p>
            <button 
              onClick={startSession}
              className="w-full btn-primary px-8 py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <Play size={22} className="fill-current mr-3" />
              Start New Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden animate-fade-in-up ring-1 ring-slate-100">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur z-20 sticky top-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
             <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
             <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50"></div>
          </div>
          <div>
            <span className="font-bold text-slate-800 block text-sm">AI Interviewer</span>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Live Session</span>
          </div>
        </div>
        <button 
          onClick={() => { setStarted(false); setMessages([]); }}
          className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl flex items-center transition-colors border border-red-100"
        >
          <RefreshCw size={14} className="mr-2" /> End Session
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-scale-in`}>
            <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mx-3 mt-auto shadow-sm border ${
                msg.role === 'user' ? 'bg-indigo-600 text-white border-transparent' : 'bg-white text-indigo-600 border-slate-200'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div className="flex flex-col space-y-2">
                <div className={`p-5 rounded-[1.25rem] text-[15px] leading-relaxed shadow-sm relative ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-sm' 
                    : 'bg-white text-slate-700 border border-slate-200/60 rounded-bl-sm'
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                
                {msg.feedback && (
                  <div className="ml-1 p-4 bg-amber-50 border border-amber-100/60 rounded-2xl text-sm text-slate-700 animate-fade-in-up shadow-sm">
                    <div className="flex items-center font-bold text-amber-600 mb-2 text-xs uppercase tracking-wider">
                       <Sparkles size={12} className="mr-1.5" /> AI Feedback
                    </div>
                    {msg.feedback}
                  </div>
                )}
                
                <span className={`text-[10px] font-bold text-slate-400 mx-1 opacity-70 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>

            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start animate-fade-in-up">
             <div className="flex max-w-[80%] flex-row items-end">
                <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mx-3 bg-white text-indigo-600 border border-slate-200 shadow-sm">
                    <Bot size={18} />
                </div>
                <div className="bg-white border border-slate-200 px-6 py-4 rounded-[1.25rem] rounded-bl-sm shadow-sm flex items-center space-x-1.5">
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                </div>
             </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100 z-20">
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your answer..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-base text-slate-800 placeholder-slate-400 px-4 py-3"
            disabled={loading}
            autoFocus
          />
          <button 
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className={`p-3.5 rounded-xl transition-all transform duration-200 ${
              input.trim() && !loading 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} className={input.trim() && !loading ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};