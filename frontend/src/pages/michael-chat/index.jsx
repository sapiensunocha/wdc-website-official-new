import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOMeta from "../../components/SEOMeta";
import { Link } from "react-router-dom";
import { Send, Zap, Shield, BarChart3, AlertTriangle, Globe, RefreshCw, ChevronDown, ExternalLink } from "lucide-react";

const API_BASE = "https://michael-api-382117221028.us-central1.run.app";

const AGENTS = [
  {
    id: "manager",
    name: "Risk Manager",
    icon: <BarChart3 size={16} />,
    color: "#009EDB",
    bg: "bg-[#009EDB]/10",
    border: "border-[#009EDB]/30",
    role: "Economic disruption, strategic risk, multi-hazard threat assessment",
    systemHint: "Ask about country risk profiles, economic impact, strategic threats.",
  },
  {
    id: "officer",
    name: "Security Officer",
    icon: <Shield size={16} />,
    color: "#f59e0b",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    role: "Geopolitical threats, conflict zones, access restrictions, security intel",
    systemHint: "Ask about conflict dynamics, NGO access, security corridors.",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    icon: <AlertTriangle size={16} />,
    color: "#ef4444",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    role: "Severe weather, seismic events, cyber threats, environmental hazards",
    systemHint: "Ask about active weather events, earthquake risks, climate hazards.",
  },
];

const SUGGESTED_PROMPTS = [
  { agent: "manager", text: "What are the top 5 countries with the highest disaster risk right now?" },
  { agent: "sentinel", text: "Brief me on active flood threats in West Africa." },
  { agent: "officer", text: "What is the humanitarian access situation in Sudan?" },
  { agent: "manager", text: "Assess the disaster risk for Nepal after the 2026 GLOF event." },
  { agent: "sentinel", text: "Is there ongoing seismic activity in Venezuela following the M7.5 earthquake?" },
  { agent: "officer", text: "What are the security risks for aid workers in the DRC Ebola zone?" },
];

function TypingIndicator({ agentColor }) {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: agentColor + "22", border: `1px solid ${agentColor}44` }}>
        <Zap size={12} style={{ color: agentColor }} />
      </div>
      <div className="bg-[#1e293b] border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-500"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ msg, agentColor, agentIcon }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isUser ? "bg-gray-700" : ""}`}
        style={!isUser ? { backgroundColor: agentColor + "22", border: `1px solid ${agentColor}44` } : {}}>
        {isUser
          ? <span className="text-gray-300 text-xs font-black">YOU</span>
          : <span style={{ color: agentColor }}>{agentIcon}</span>
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? "bg-[#009EDB] text-white rounded-br-sm"
          : "bg-[#1e293b] border border-white/10 text-gray-200 rounded-bl-sm"
      }`}>
        {msg.content}
      </div>
    </motion.div>
  );
}

export default function MichaelChat() {
  const [activeAgentId, setActiveAgentId] = useState("manager");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [context, setContext] = useState("Global view");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeAgent = AGENTS.find(a => a.id === activeAgentId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Welcome message when agent changes
  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: `MICHAEL Global Ops — ${activeAgent.name} online.\n\n${activeAgent.systemHint}\n\nI'm monitoring ${context}. What do you need to know?`,
    }]);
  }, [activeAgentId]);

  async function sendMessage(text) {
    const userMsg = text.trim();
    if (!userMsg || loading) return;

    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/intel/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: activeAgentId,
          message: userMsg,
          context: context,
        }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      const reply = data.response || data.message || "[No response received]";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      // Fallback to agent_chat endpoint
      try {
        const res2 = await fetch(`${API_BASE}/api/agent_chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent: activeAgentId,
            message: userMsg,
            coordinates: context,
          }),
        });
        if (!res2.ok) throw new Error(`API ${res2.status}`);
        const data2 = await res2.json();
        setMessages(prev => [...prev, { role: "assistant", content: data2.response || "[No response]" }]);
      } catch (e2) {
        setError("Michael is temporarily offline. Try again in a moment.");
        setMessages(prev => [...prev, {
          role: "assistant",
          content: `[${activeAgentId.toUpperCase()} OFFLINE] Unable to reach MICHAEL API. Check your connection or try again.`,
        }]);
      }
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function useSuggestion(prompt) {
    setActiveAgentId(prompt.agent);
    setTimeout(() => sendMessage(prompt.text), 100);
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <SEOMeta
        title="Chat with Michael — WDC AI Disaster Intelligence"
        description="Chat with Michael, WDC's AI-powered disaster intelligence system. Ask about active crises, early warnings, risk data, and humanitarian response."
        url="/michael-chat"
      />

      {/* Top bar */}
      <div className="border-b border-white/10 bg-[#1C2B39]/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container sm:px-2 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <span className="text-xs font-black text-green-400 uppercase tracking-widest">MICHAEL ONLINE</span>
            </div>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-xs text-gray-400 hidden sm:block">Global Disaster Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/global-products"
              className="text-xs text-[#009EDB] hover:underline font-bold hidden sm:block"
            >
              About Michael <ExternalLink size={10} className="inline ml-0.5" />
            </Link>
            <Link
              to="/request-demo"
              className="text-xs bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-3 py-1.5 rounded transition-colors"
            >
              API Access
            </Link>
          </div>
        </div>
      </div>

      <div className="container sm:px-2 py-6 flex flex-col lg:flex-row gap-5 max-w-6xl">

        {/* Left sidebar — agent selector + context */}
        <div className="lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Agent selector */}
          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Select Agent</p>
            <div className="flex flex-col gap-2">
              {AGENTS.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                    activeAgentId === agent.id
                      ? `${agent.bg} ${agent.border} border`
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: agent.color + "22" }}>
                    <span style={{ color: agent.color }}>{agent.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{agent.name}</p>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5">{agent.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Context/Location */}
          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
              <Globe size={9} className="inline mr-1" />Context
            </p>
            <input
              type="text"
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder="e.g. Sudan, South Asia, Haiti..."
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#009EDB]/50"
            />
            <p className="text-[10px] text-gray-600 mt-1.5">Set geographic context for better intelligence</p>
          </div>

          {/* Suggested prompts */}
          <div className="bg-[#1e293b] border border-white/10 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Suggested Queries</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map((p, i) => {
                const agent = AGENTS.find(a => a.id === p.agent);
                return (
                  <button
                    key={i}
                    onClick={() => useSuggestion(p)}
                    className="text-left text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors leading-snug border border-transparent hover:border-white/10"
                  >
                    <span className="text-[9px] font-black uppercase mr-1" style={{ color: agent.color }}>[{agent.name}]</span>
                    {p.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-4">
            <p className="text-[10px] text-amber-400/70 leading-relaxed">
              <span className="font-bold text-amber-400">AI-Generated Intelligence</span><br />
              MICHAEL responses are AI-generated for situational awareness. Always verify critical information with official sources (OCHA, GDACS, national DRM authorities) before operational decisions.
            </p>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-h-[70vh] bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden">
          {/* Chat header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3"
            style={{ borderLeftColor: activeAgent.color, borderLeftWidth: 3 }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: activeAgent.color + "22" }}>
              <span style={{ color: activeAgent.color }}>{activeAgent.icon}</span>
            </div>
            <div>
              <p className="font-bold text-white text-sm">MICHAEL — {activeAgent.name}</p>
              <p className="text-xs text-gray-500">{activeAgent.role}</p>
            </div>
            <button
              onClick={() => setMessages([{
                role: "assistant",
                content: `MICHAEL Global Ops — ${activeAgent.name} restarted.\n\nContext cleared. ${activeAgent.systemHint}`,
              }])}
              className="ml-auto text-gray-600 hover:text-gray-300 transition-colors"
              title="Clear conversation"
            >
              <RefreshCw size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <Message
                key={i}
                msg={msg}
                agentColor={activeAgent.color}
                agentIcon={activeAgent.icon}
              />
            ))}
            {loading && <TypingIndicator agentColor={activeAgent.color} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            {error && (
              <p className="text-xs text-red-400 mb-2 px-1">{error}</p>
            )}
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`Ask ${activeAgent.name}... (Enter to send)`}
                rows={1}
                className="flex-1 bg-[#0f172a] border border-white/10 focus:border-[#009EDB]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none resize-none leading-relaxed"
                style={{ maxHeight: "120px" }}
              />
              <motion.button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                whileTap={{ scale: 0.93 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
                style={{ backgroundColor: activeAgent.color }}
              >
                {loading
                  ? <RefreshCw size={16} className="text-white animate-spin" />
                  : <Send size={16} className="text-white" />
                }
              </motion.button>
            </div>
            <p className="text-[10px] text-gray-600 mt-2 px-1">
              Powered by MICHAEL Global Ops API · Context: <span className="text-gray-500">{context}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="border-t border-white/10 py-8 mt-4">
        <div className="container sm:px-2 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: <Globe size={18} className="text-[#009EDB]" />, label: "30+ Countries", desc: "Active monitoring coverage" },
              { icon: <Zap size={18} className="text-[#009EDB]" />, label: "Real-Time", desc: "Multi-source intelligence feeds" },
              { icon: <Shield size={18} className="text-[#009EDB]" />, label: "3 AI Agents", desc: "Specialized disaster intelligence" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[#009EDB]/10 rounded-full flex items-center justify-center">{item.icon}</div>
                <p className="font-bold text-white text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/request-demo" className="inline-flex items-center gap-2 text-[#009EDB] text-sm font-bold hover:underline">
              Request full Michael API access for your organization <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
