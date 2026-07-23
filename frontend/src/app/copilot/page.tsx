"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Bot, Send, User, Sparkles } from 'lucide-react';

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to Sentinel AI Copilot. How can I assist with your investigation today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: `I've analyzed the alerts related to your query. The activity matches MITRE technique T1059 (Command and Scripting Interpreter). I recommend isolating endpoint WIN-SRV-01 immediately and checking for lateral movement via RDP logs.` 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-in fade-in duration-500">
      
      <div className="flex items-center gap-3 mb-2 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center">
          <Bot className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-glow">Security Copilot</h1>
          <p className="text-slate-400 text-sm">AI-assisted threat hunting and incident response</p>
        </div>
      </div>

      {/* Chat Area */}
      <Card glow className="flex-1 flex flex-col p-0 overflow-hidden border-primary/20">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20 text-primary'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {msg.role === 'system' && i > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                    <button className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors flex items-center gap-1">
                      <Sparkles size={12} className="text-cyan-400" /> Action: Isolate Host
                    </button>
                    <button className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors">
                      View Query
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot to analyze an alert, summarize an incident, or write a KQL query..." 
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto custom-scrollbar pb-1">
            {["Analyze latest critical alert", "Explain MITRE T1059", "Summarize open incidents"].map(suggestion => (
              <button 
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-xs text-slate-400 bg-white/5 hover:bg-white/10 hover:text-slate-200 border border-white/5 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
