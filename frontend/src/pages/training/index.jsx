import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Play, FileText, HelpCircle, ChevronRight, ChevronLeft, Award, X, Search, Clock, BookOpen, BarChart2, ExternalLink, Printer } from "lucide-react";
import WDCLogo from "../../components/WDCLogo";
import { COURSES } from "./trainingData";
import Section from "../../components/Section";
import Heading from "../../components/Heading";
import { motion } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "wdc_training_progress";
const NAME_KEY = "wdc_training_name";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
function loadName() { return localStorage.getItem(NAME_KEY) || ""; }
function saveName(n) { localStorage.setItem(NAME_KEY, n); }

function courseProgress(courseId, progress) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return 0;
  const done = (progress[courseId] || []).length;
  return Math.round((done / course.totalModules) * 100);
}

function isCourseComplete(courseId, progress) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return false;
  return (progress[courseId] || []).length >= course.totalModules;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModuleIcon({ type }) {
  if (type.includes("video")) return <Play size={14} className="text-primary" />;
  if (type.includes("quiz")) return <HelpCircle size={14} className="text-orange-500" />;
  return <FileText size={14} className="text-gray-500" />;
}

function ProgressRing({ pct, size = 48, stroke = 4 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8F5FC" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#009EDB" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
    </svg>
  );
}

// ─── Certificate ──────────────────────────────────────────────────────────────

function Certificate({ course, userName, onClose }) {
  const ref = useRef();
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const handlePrint = () => {
    const content = ref.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>WDC Certificate</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Georgia', serif; background: #fff; }
        .cert { width:900px; margin:0 auto; padding:60px; border:8px solid #009EDB; position:relative; }
        .cert-inner { border:2px solid #009EDB; padding:50px; min-height:580px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; text-align:center; }
        .logo-area { margin-bottom:10px; }
        .logo-area svg { width:280px; height:80px; color:#009EDB; }
        .badge { display:inline-block; background:#009EDB; color:#fff; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:6px 18px; margin-bottom:16px; }
        h1 { font-size:38px; color:#0D1F2D; font-weight:normal; letter-spacing:2px; }
        .certify { font-size:14px; color:#475569; margin:8px 0; }
        .name { font-size:32px; color:#009EDB; font-style:italic; font-weight:bold; border-bottom:2px solid #009EDB; padding-bottom:6px; margin:8px 0; min-width:300px; }
        .course-title { font-size:18px; color:#0D1F2D; font-weight:bold; margin:4px 0; }
        .desc { font-size:13px; color:#475569; max-width:500px; margin:4px auto; }
        .footer { display:flex; justify-content:space-between; align-items:flex-end; width:100%; margin-top:36px; padding-top:20px; border-top:1px solid #E2E8F0; }
        .sig-block { text-align:center; }
        .sig-monogram { font-size:36px; font-weight:900; font-style:italic; color:#009EDB; letter-spacing:-1px; font-family:Georgia,serif; line-height:1; border-bottom:2px solid #009EDB; padding-bottom:4px; margin-bottom:4px; display:inline-block; min-width:80px; }
        .sig-full { font-size:13px; color:#0D1F2D; font-weight:bold; margin-bottom:2px; }
        .sig-role { font-size:11px; color:#475569; letter-spacing:1px; text-transform:uppercase; }
        .verify { font-size:10px; color:#94A3B8; text-align:center; margin-top:14px; letter-spacing:0.5px; }
        .date-block { text-align:center; }
        .date-val { font-size:14px; color:#0D1F2D; font-weight:bold; }
        .date-lbl { font-size:11px; color:#475569; text-transform:uppercase; letter-spacing:1px; }
        .corner { position:absolute; width:40px; height:40px; border-color:#009EDB; border-style:solid; }
        .tl { top:12px; left:12px; border-width:3px 0 0 3px; }
        .tr { top:12px; right:12px; border-width:3px 3px 0 0; }
        .bl { bottom:12px; left:12px; border-width:0 0 3px 3px; }
        .br { bottom:12px; right:12px; border-width:0 3px 3px 0; }
      </style></head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-content-primary">Your Certificate</h2>
          <div className="flex gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded text-sm font-bold transition-colors">
              <Printer size={15} /> Print / Save PDF
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20} /></button>
          </div>
        </div>

        {/* Certificate design */}
        <div ref={ref} className="p-6">
          <div className="relative border-[6px] border-primary p-1">
            <div className="border-2 border-primary p-10 flex flex-col items-center text-center gap-4 min-h-[480px] justify-center">
              {/* Corner accents */}
              <span className="absolute top-3 left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-primary" />
              <span className="absolute top-3 right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-primary" />
              <span className="absolute bottom-3 left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-primary" />
              <span className="absolute bottom-3 right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-primary" />

              <div className="logo-area">
                <WDCLogo className="w-64 h-16 text-primary" />
              </div>

              <span className="inline-block bg-primary text-white text-[10px] font-black uppercase tracking-[3px] px-4 py-1.5">
                Certificate of Completion
              </span>

              <h1 className="text-3xl font-serif text-content-primary tracking-wide">
                Certificate of Achievement
              </h1>

              <p className="text-sm text-content-secondary">This certifies that</p>

              <p className="text-2xl font-bold italic text-primary border-b-2 border-primary pb-1 px-8">
                {userName}
              </p>

              <p className="text-sm text-content-secondary">has successfully completed the WDC training course</p>

              <p className="text-xl font-bold text-content-primary">{course.title}</p>
              <p className="text-sm text-content-secondary max-w-md">
                {course.totalModules} modules · {course.duration} · Level: {course.level}
              </p>

              <div className="w-full mt-4 pt-4 border-t border-gray-200 flex justify-between items-end px-4">
                {/* SNK Signature block */}
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <span className="sig-monogram text-4xl font-black italic text-primary font-serif border-b-2 border-primary pb-0.5 mb-1 px-2" style={{ fontFamily: "Georgia, serif", letterSpacing: "-1px" }}>
                      SNK
                    </span>
                    <p className="text-xs font-bold text-content-primary">Sapiens Ndatabaye Kanyunyi</p>
                    <p className="text-[10px] uppercase tracking-widest text-content-tertiary font-semibold">
                      Executive Director, WDC
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-content-primary">{today}</p>
                  <p className="text-[10px] uppercase tracking-widest text-content-tertiary font-semibold mt-0.5">Date Issued</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-content-primary">worlddisastercenter.org</p>
                  <p className="text-[10px] uppercase tracking-widest text-content-tertiary font-semibold mt-0.5">Issued By</p>
                </div>
              </div>

              {/* Verification note */}
              <p className="text-[10px] text-content-tertiary mt-3 tracking-wide">
                For a verifiable certificate or advanced training, email{" "}
                <span className="font-semibold text-primary">office@worlddisastercenter.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Quiz Component ───────────────────────────────────────────────────────────

function Quiz({ quiz, onPass }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === quiz.correct) setTimeout(onPass, 1200);
  };

  const reset = () => { setSelected(null); setSubmitted(false); };

  return (
    <div className="mt-8 bg-surface-subtle border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={18} className="text-orange-500" />
        <span className="font-bold text-content-primary text-sm uppercase tracking-wide">Knowledge Check</span>
      </div>
      <p className="text-content-primary font-semibold mb-5">{quiz.question}</p>
      <div className="space-y-3 mb-5">
        {quiz.options.map((opt, i) => {
          let cls = "border border-gray-300 bg-white text-content-primary";
          if (submitted) {
            if (i === quiz.correct) cls = "border-green-500 bg-green-50 text-green-800";
            else if (i === selected) cls = "border-red-400 bg-red-50 text-red-700";
          } else if (i === selected) cls = "border-primary bg-primary-muted text-primary";
          return (
            <button key={i} onClick={() => !submitted && setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded text-sm transition-all ${cls}`}>
              <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
            </button>
          );
        })}
      </div>
      {submitted && (
        <div className={`text-sm rounded px-4 py-3 mb-4 ${selected === quiz.correct ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {selected === quiz.correct ? "✓ Correct! " : "✗ Not quite. "}{quiz.explanation}
        </div>
      )}
      <div className="flex gap-3">
        {!submitted && (
          <button onClick={handleSubmit} disabled={selected === null}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2 rounded text-sm transition-colors disabled:opacity-40">
            Submit Answer
          </button>
        )}
        {submitted && selected !== quiz.correct && (
          <button onClick={reset} className="border border-gray-300 hover:border-primary text-content-primary hover:text-primary font-bold px-5 py-2 rounded text-sm transition-colors">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Module View ──────────────────────────────────────────────────────────────

function ModuleView({ course, module, moduleIdx, isCompleted, onComplete, onBack }) {
  const [quizPassed, setQuizPassed] = useState(isCompleted);
  const noQuiz = !module.quiz;

  const markDone = () => {
    if (!isCompleted) onComplete();
  };

  // Render markdown-like content
  const renderContent = (text) => {
    const lines = text.trim().split("\n");
    const elements = [];
    let tableBuffer = [];
    let inTable = false;

    const flushTable = () => {
      if (!tableBuffer.length) return;
      const rows = tableBuffer.map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
      const header = rows[0];
      const body = rows.slice(2);
      elements.push(
        <div key={elements.length} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-gray-200 rounded">
            <thead>
              <tr className="bg-primary-muted">
                {header.map((h, i) => <th key={i} className="px-4 py-2 text-left font-bold text-content-primary border-b border-gray-200">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 even:bg-surface-subtle">
                  {row.map((cell, ci) => <td key={ci} className="px-4 py-2 text-content-secondary">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
      inTable = false;
    };

    lines.forEach((line, i) => {
      if (line.startsWith("|")) {
        inTable = true;
        tableBuffer.push(line);
        return;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-xl font-bold text-content-primary mt-6 mb-3">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={i} className="text-base font-bold text-content-primary mt-5 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(<p key={i} className="font-bold text-content-primary my-1">{line.slice(2, -2)}</p>);
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-primary bg-primary-muted px-4 py-2 my-3 rounded-r text-content-primary font-semibold italic text-sm">
            {line.slice(2)}
          </blockquote>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-4 text-content-secondary text-sm leading-relaxed list-disc">
            {line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
          </li>
        );
      } else if (/^\d+\. /.test(line)) {
        elements.push(
          <li key={i} className="ml-4 text-content-secondary text-sm leading-relaxed list-decimal">
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="my-2" />);
      } else {
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-primary">$1</code>');
        elements.push(
          <p key={i} className="text-content-secondary text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      }
    });
    if (inTable) flushTable();
    return elements;
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-content-tertiary mb-6">
        <button onClick={onBack} className="hover:text-primary transition-colors">{course.title}</button>
        <ChevronRight size={12} />
        <span className="text-content-secondary font-semibold">{module.title}</span>
      </div>

      {/* Module header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary-muted px-2 py-0.5 rounded">
              Module {moduleIdx + 1} of {course.totalModules}
            </span>
            {isCompleted && (
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle size={10} /> Completed
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-content-primary">{module.title}</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-content-tertiary">
            <Clock size={12} /> <span>{module.duration}</span>
          </div>
        </div>
      </div>

      {/* Video section */}
      {module.type.includes("video") && (
        <div className="mb-6">
          {module.youtubeId ? (
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-black aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${module.youtubeId}?rel=0&modestbranding=1`}
                title={module.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(module.youtubeSearch)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-gray-900 text-white rounded-lg p-10 border border-gray-200 hover:bg-gray-800 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={22} fill="white" />
              </div>
              <div>
                <p className="font-bold">Watch Training Video</p>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
                  Search on YouTube <ExternalLink size={12} />
                </p>
              </div>
            </a>
          )}
        </div>
      )}

      {/* Reading content */}
      <div className="prose-custom bg-white border border-gray-100 rounded-lg p-6 mb-6">
        {renderContent(module.content)}
      </div>

      {/* Quiz */}
      {module.quiz && (
        <Quiz quiz={module.quiz} onPass={() => { setQuizPassed(true); if (!isCompleted) onComplete(); }} />
      )}

      {/* Complete button (for no-quiz or already-passed-quiz modules) */}
      {(noQuiz || quizPassed) && !isCompleted && (
        <div className="mt-6 flex justify-end">
          <button onClick={markDone}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded flex items-center gap-2 transition-colors">
            <CheckCircle size={18} /> Mark as Complete
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="mt-6 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded px-4 py-3">
          <CheckCircle size={18} />
          <span className="font-semibold text-sm">Module completed. Well done!</span>
        </div>
      )}
    </div>
  );
}

// ─── Course View ──────────────────────────────────────────────────────────────

function CourseView({ course, progress, userName, onSelectModule, onBack, onCertificate }) {
  const pct = courseProgress(course.id, progress);
  const completed = progress[course.id] || [];
  const isComplete = isCourseComplete(course.id, progress);

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-content-tertiary hover:text-primary transition-colors mb-6">
        <ChevronLeft size={16} /> Back to Courses
      </button>

      {/* Course header */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className={`${course.color} px-8 py-10 text-white`}>
          <span className="text-4xl mb-3 block">{course.icon}</span>
          <span className="text-xs font-black uppercase tracking-widest opacity-80">{course.level}</span>
          <h1 className="text-3xl font-bold mt-1 mb-2">{course.title}</h1>
          <p className="text-white/80 text-sm max-w-2xl">{course.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> {course.totalModules} modules</span>
          </div>
        </div>

        {/* Progress */}
        <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ProgressRing pct={pct} />
            <div>
              <p className="text-sm font-bold text-content-primary">{pct}% complete</p>
              <p className="text-xs text-content-tertiary">{completed.length} of {course.totalModules} modules done</p>
            </div>
          </div>
          {isComplete && (
            <button onClick={onCertificate}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded transition-colors text-sm">
              <Award size={16} /> Get Certificate
            </button>
          )}
        </div>
      </div>

      {/* Module list */}
      <h2 className="text-lg font-bold text-content-primary mb-4">Course Modules</h2>
      <div className="space-y-3">
        {course.modules.map((mod, idx) => {
          const done = completed.includes(mod.id);
          const prev = idx === 0 || completed.includes(course.modules[idx - 1].id);
          return (
            <button key={mod.id} onClick={() => onSelectModule(mod, idx)}
              className={`w-full text-left bg-white border rounded-lg px-5 py-4 flex items-center gap-4 transition-all hover:shadow-sm
                ${done ? "border-green-300" : prev ? "border-gray-200 hover:border-primary" : "border-gray-200 opacity-60"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-green-500 text-white" : "bg-surface-subtle border border-gray-200"}`}>
                {done ? <CheckCircle size={16} /> : <span className="text-xs font-bold text-content-tertiary">{idx + 1}</span>}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${done ? "text-green-800" : "text-content-primary"}`}>{mod.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-content-tertiary flex items-center gap-1"><Clock size={10} /> {mod.duration}</span>
                  <span className="text-xs text-content-tertiary flex items-center gap-1"><ModuleIcon type={mod.type} /> {mod.type.replace("+", " · ")}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Catalog ──────────────────────────────────────────────────────────────────

const COLOR_MAP = {
  "bg-amber-500": "#F59E0B",
  "bg-blue-600": "#2563EB",
  "bg-red-600": "#DC2626",
  "bg-indigo-600": "#4F46E5",
  "bg-green-600": "#16A34A",
  "bg-orange-500": "#F97316",
  "bg-purple-600": "#9333EA",
};

function Catalog({ progress, onSelectCourse }) {
  const [search, setSearch] = useState("");
  const featured = COURSES.find((c) => c.featured);
  const others = COURSES.filter((c) => !c.featured);
  const filtered = (search
    ? COURSES
    : others
  ).filter((c) =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Featured hero course */}
      {!search && featured && (
        <button
          onClick={() => onSelectCourse(featured)}
          className="group w-full text-left bg-amber-50 border-2 border-amber-400 rounded-xl overflow-hidden hover:shadow-lg transition-all mb-10 animate-fade-in"
        >
          <div className="bg-amber-500 px-8 py-5 flex items-center gap-4">
            <span className="text-5xl">{featured.icon}</span>
            <div>
              <span className="inline-block bg-white/30 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-1">
                Start Here · Required for All Members
              </span>
              <h2 className="text-2xl font-bold text-white group-hover:underline">{featured.title}</h2>
            </div>
            {isCourseComplete(featured.id, progress) && (
              <Award size={28} className="text-white ml-auto shrink-0" />
            )}
          </div>
          <div className="px-8 py-5 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <p className="text-sm text-amber-900 mb-3">{featured.tagline}</p>
              <p className="text-xs text-amber-800/80 line-clamp-2">{featured.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-amber-700">
                <span className="flex items-center gap-1"><Clock size={11} /> {featured.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={11} /> {featured.totalModules} modules</span>
                <span className="flex items-center gap-1"><BarChart2 size={11} /> {featured.level}</span>
              </div>
            </div>
            <div className="min-w-[160px]">
              <div className="w-full bg-amber-200 rounded-full h-2 mb-1">
                <div className="bg-amber-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${courseProgress(featured.id, progress)}%` }} />
              </div>
              <p className="text-[11px] text-amber-700 font-semibold">
                {courseProgress(featured.id, progress) === 0 ? "Not started" :
                  courseProgress(featured.id, progress) === 100 ? "Completed ✓" :
                  `${courseProgress(featured.id, progress)}% complete`}
              </p>
            </div>
          </div>
        </button>
      )}

      {/* Search */}
      <div className="flex items-center bg-white border border-gray-300 rounded px-4 py-3 mb-6 max-w-md shadow-sm focus-within:border-primary transition-all">
        <Search size={16} className="text-gray-400 mr-3 shrink-0" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all courses..."
          className="bg-transparent border-none outline-none text-sm text-content-primary w-full"
        />
      </div>

      {!search && (
        <h3 className="text-sm font-bold uppercase tracking-widest text-content-tertiary mb-4">All Courses</h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course, idx) => {
          const pct = courseProgress(course.id, progress);
          const complete = isCourseComplete(course.id, progress);
          const topColor = COLOR_MAP[course.color] || "#009EDB";
          return (
            <motion.button key={course.id} onClick={() => onSelectCourse(course)}
              className="group text-left bg-white rounded-lg border border-gray-200 overflow-hidden"
              style={{ borderTop: `4px solid ${topColor}` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(idx % 3, 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            >
              <div className={`${course.color} px-5 py-4 text-white`}>
                <span className="text-2xl">{course.icon}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-content-primary text-sm leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
                  {complete && <Award size={16} className="text-primary shrink-0 mt-0.5" />}
                </div>
                <p className="text-xs text-content-secondary line-clamp-2 mb-3">{course.description}</p>
                <div className="flex items-center gap-3 text-xs text-content-tertiary mb-3">
                  <span className="flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={10} /> {course.totalModules} modules</span>
                  <span className="flex items-center gap-1"><BarChart2 size={10} /> {course.level}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                  <div className="bg-primary h-1.5 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-content-tertiary">{pct === 0 ? "Not started" : pct === 100 ? "Completed ✓" : `${pct}% complete`}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Name Dialog ──────────────────────────────────────────────────────────────

function NameDialog({ onSave }) {
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md border-t-4 border-primary shadow-2xl p-8 animate-slide-up">
        <WDCLogo className="w-48 h-12 text-primary mb-6" />
        <h2 className="text-xl font-bold text-content-primary mb-1">Welcome to WDC Training</h2>
        <p className="text-sm text-content-secondary mb-6">
          Enter your full name to begin. It will appear on your certificates.
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onSave(name.trim())}
          placeholder="Your full name"
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-content-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-4"
        />
        <button
          onClick={() => name.trim() && onSave(name.trim())}
          disabled={!name.trim()}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition-colors disabled:opacity-40"
        >
          Start Training
        </button>
      </div>
    </div>
  );
}

// ─── Training Plan Estimator ──────────────────────────────────────────────────

const TRAINING_TOPICS = [
  { id: "preparedness", label: "Disaster Preparedness Fundamentals" },
  { id: "response", label: "Emergency Response & First Aid" },
  { id: "data-tech", label: "Humanitarian Data & Technology" },
  { id: "community", label: "Community Resilience Building" },
  { id: "climate", label: "Climate Change & Disaster Risk" },
  { id: "communication", label: "Crisis Communication in Emergencies" },
  { id: "early-warning", label: "Early Warning Systems & Technologies" },
  { id: "needs-assessment", label: "Rapid Needs Assessment" },
  { id: "coordination", label: "Humanitarian Coordination & Clusters" },
  { id: "psychosocial", label: "Psychosocial Support (PFA)" },
  { id: "drr-policy", label: "DRR Policy & Governance" },
  { id: "gender", label: "Gender, Inclusion & Disaster Risk" },
  { id: "search-rescue", label: "Search & Rescue Operations" },
  { id: "wash", label: "WASH in Emergencies" },
  { id: "food-security", label: "Food Security & Livelihoods in Crisis" },
  { id: "protection", label: "Protection in Humanitarian Settings" },
  { id: "tot", label: "Training of Trainers (ToT) Programme" },
  { id: "custom", label: "Custom / Organisation-Specific Training" },
];

function getEstimate(format, groupSize, duration) {
  if (!format || !groupSize) return null;
  if (format === "online") {
    const map = {
      "1":    { label: "Free", note: "Access the WDC Academy courses above at no cost." },
      "2-5":  { label: "Free – USD 200/year", note: "Individual access is free. Optional institutional package for shared reporting." },
      "6-15": { label: "USD 500 – 1,500/year", note: "Institutional licence for up to 15 users with admin dashboard." },
      "16+":  { label: "From USD 1,500/year", note: "Enterprise licence. Contact us for a custom multi-seat quote." },
    };
    return map[groupSize] || null;
  }
  if (!duration) return null;
  const TABLE = {
    "virtual-live": {
      "half-day": { "1": "USD 200",           "2-5": "USD 600 – 800",     "6-15": "USD 1,200 – 1,500", "16+": "From USD 2,000" },
      "1-day":    { "1": "USD 350",           "2-5": "USD 1,000 – 1,500", "6-15": "USD 2,000 – 2,800", "16+": "From USD 3,500" },
      "3-5-day":  { "1": "USD 900 – 1,400",  "2-5": "USD 2,500 – 4,000", "6-15": "USD 5,000 – 8,000", "16+": "From USD 8,000" },
      "1-week":   { "1": "USD 1,500 – 2,000", "2-5": "USD 4,000 – 6,000","6-15": "USD 8,000 – 12,000","16+": "From USD 12,000" },
    },
    "in-person": {
      "half-day": { "1": "USD 1,200 – 1,500", "2-5": "USD 1,800 – 2,200", "6-15": "USD 2,500 – 3,500", "16+": "From USD 3,500" },
      "1-day":    { "1": "USD 1,800 – 2,200", "2-5": "USD 2,500 – 3,500", "6-15": "USD 3,500 – 5,000", "16+": "From USD 5,000" },
      "3-5-day":  { "1": "USD 4,500 – 6,000", "2-5": "USD 7,000 – 10,000","6-15": "USD 10,000 – 15,000","16+": "From USD 15,000" },
      "1-week":   { "1": "USD 7,000 – 9,000", "2-5": "USD 12,000 – 16,000","6-15": "USD 18,000 – 25,000","16+": "From USD 25,000" },
    },
  };
  const label = TABLE[format]?.[duration]?.[groupSize];
  if (!label) return null;
  const note = format === "in-person"
    ? "Excludes travel and accommodation. Travel costs apply for locations outside Geneva/Brussels."
    : "Per session fees. Content customisation and facilitator selection may affect final price.";
  return { label, note };
}

function TrainingPlanEstimator() {
  const [topics, setTopics] = useState([]);
  const [format, setFormat] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [notes, setNotes] = useState("");

  const toggleTopic = (id) =>
    setTopics((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const needsDuration = format === "virtual-live" || format === "in-person";
  const isReady =
    topics.length > 0 &&
    format &&
    groupSize &&
    (!needsDuration || duration);

  const estimate = getEstimate(format, groupSize, duration);

  const buildBody = () => {
    const topicNames = topics.map((id) => TRAINING_TOPICS.find((t) => t.id === id)?.label).join(", ");
    const fmtLabel = { online: "Online Self-Paced", "virtual-live": "Virtual Instructor-Led", "in-person": "In-Person Workshop" }[format] || format;
    const grpLabel = { "1": "Individual (1 person)", "2-5": "Small Group (2–5)", "6-15": "Medium Group (6–15)", "16+": "Large Group (16+)" }[groupSize] || groupSize;
    const durLabel = { "half-day": "Half-Day (3–4 h)", "1-day": "Full Day (6–8 h)", "3-5-day": "3–5 Days", "1-week": "1 Week" }[duration] || (format === "online" ? "Self-paced" : "–");
    return `Training Plan Request — World Disaster Center

Name: ${name}
Organisation: ${org || "–"}
Email: ${email}

─── Training Plan ───────────────
Topics selected:
${topicNames || "Not specified"}

Format:      ${fmtLabel}
Group size:  ${grpLabel}
Duration:    ${durLabel}
Estimate:    ${estimate?.label || "To be discussed"}

─── Additional Notes ───────────
${notes || "–"}

──────────────────────────────────
Generated via WDC Training Academy
worlddisastercenter.org`;
  };

  const handleSend = () => {
    if (!name.trim() || !email.trim()) return;
    const subject = encodeURIComponent("Training Plan Request — WDC Academy");
    const body = encodeURIComponent(buildBody());
    window.open(`mailto:office@worlddisastercenter.org?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div id="estimator" className="bg-gray-50 border-t-2 border-[#418FDE] py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimateIn variant="fadeUp" className="mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#418FDE] mb-2 block">WDC Academy</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Request Custom Training</h2>
            <p className="text-gray-600 max-w-2xl">
              Need training tailored to your organisation, team, or community? Select your requirements to get an instant estimate, then send a request — our team responds within 48 hours.
            </p>
          </AnimateIn>

          {/* Step 1: Topics */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5">
            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#418FDE] text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
              Select Training Topics
              <span className="text-xs font-normal text-gray-400 ml-1">(choose one or more)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 ml-8">
              {TRAINING_TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTopic(t.id)}
                  className={`text-left px-4 py-2.5 rounded text-sm transition-all border ${
                    topics.includes(t.id)
                      ? "bg-[#E8F5FC] border-[#418FDE] text-[#418FDE] font-semibold"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#418FDE]"
                  }`}
                >
                  {topics.includes(t.id) && <span className="mr-1.5 font-black">✓</span>}
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Format */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#418FDE] text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
              Training Format
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-8">
              {[
                { id: "online", icon: "💻", label: "Online Self-Paced", desc: "Learners access WDC Academy courses at their own pace, anytime." },
                { id: "virtual-live", icon: "📡", label: "Virtual Instructor-Led", desc: "Live online sessions facilitated by a WDC expert trainer." },
                { id: "in-person", icon: "🏛️", label: "In-Person Workshop", desc: "On-site training at your location or a WDC venue." },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setFormat(f.id); setDuration(""); }}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    format === f.id ? "border-[#418FDE] bg-[#E8F5FC]" : "border-gray-200 hover:border-[#418FDE]/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <p className={`font-bold text-sm mb-1 ${format === f.id ? "text-[#418FDE]" : "text-gray-900"}`}>{f.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Group size */}
          {format && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#418FDE] text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                Number of Participants
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ml-8">
                {[
                  { id: "1", label: "Individual", desc: "1 person" },
                  { id: "2-5", label: "Small Group", desc: "2–5 people" },
                  { id: "6-15", label: "Medium Group", desc: "6–15 people" },
                  { id: "16+", label: "Large Group", desc: "16+ people" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGroupSize(g.id)}
                    className={`text-center p-3 rounded-lg border-2 transition-all ${
                      groupSize === g.id ? "border-[#418FDE] bg-[#E8F5FC]" : "border-gray-200 hover:border-[#418FDE]/50"
                    }`}
                  >
                    <p className={`font-bold text-sm ${groupSize === g.id ? "text-[#418FDE]" : "text-gray-900"}`}>{g.label}</p>
                    <p className="text-xs text-gray-500">{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Duration (ILT / in-person only) */}
          {needsDuration && groupSize && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-5 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#418FDE] text-white text-xs font-black flex items-center justify-center shrink-0">4</span>
                Training Duration
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ml-8">
                {[
                  { id: "half-day", label: "Half-Day", desc: "3–4 hours" },
                  { id: "1-day", label: "Full Day", desc: "6–8 hours" },
                  { id: "3-5-day", label: "3–5 Days", desc: "Intensive training" },
                  { id: "1-week", label: "1 Week", desc: "Comprehensive programme" },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`text-center p-3 rounded-lg border-2 transition-all ${
                      duration === d.id ? "border-[#418FDE] bg-[#E8F5FC]" : "border-gray-200 hover:border-[#418FDE]/50"
                    }`}
                  >
                    <p className={`font-bold text-sm ${duration === d.id ? "text-[#418FDE]" : "text-gray-900"}`}>{d.label}</p>
                    <p className="text-xs text-gray-500">{d.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Estimate banner */}
          {isReady && estimate && (
            <div className="bg-[#009EDB] text-white rounded-lg p-7 mb-5 animate-fade-in">
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-1">Estimated Investment</p>
              <p className="text-4xl font-black mb-2">{estimate.label}</p>
              <p className="text-white/80 text-sm">{estimate.note}</p>
            </div>
          )}

          {/* Contact / email form */}
          {isReady && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-1">Send Your Training Request</h3>
              <p className="text-sm text-gray-500 mb-5">
                Your selections will be pre-filled in the email. Our team responds within 48 hours with a detailed proposal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wide">Full Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-[#418FDE] focus:ring-1 focus:ring-[#418FDE]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wide">Email Address *</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-[#418FDE] focus:ring-1 focus:ring-[#418FDE]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wide">Organisation</label>
                  <input
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Your organisation or agency (optional)"
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-[#418FDE] focus:ring-1 focus:ring-[#418FDE]"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wide">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Preferred dates, location, specific objectives, languages needed, or any other context..."
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-[#418FDE] focus:ring-1 focus:ring-[#418FDE] resize-none"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!name.trim() || !email.trim()}
                className="bg-[#418FDE] hover:bg-[#005b9f] text-white font-bold px-8 py-3 rounded transition-colors disabled:opacity-40 text-sm"
              >
                Send Training Request via Email
              </button>
              <p className="text-xs text-gray-400 mt-2">
                Opens your email client pre-filled with your plan. Fields marked * are required.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TrainingPage() {
  const [userName, setUserName] = useState(() => loadName());
  const [progress, setProgress] = useState(() => loadProgress());
  const [view, setView] = useState("catalog"); // catalog | course | module
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const [showCert, setShowCert] = useState(false);
  const [certCourse, setCertCourse] = useState(null);

  const handleSaveName = (name) => {
    saveName(name);
    setUserName(name);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setView("course");
    window.scrollTo(0, 0);
  };

  const handleSelectModule = (mod, idx) => {
    setSelectedModule(mod);
    setSelectedModuleIdx(idx);
    setView("module");
    window.scrollTo(0, 0);
  };

  const handleCompleteModule = () => {
    const courseId = selectedCourse.id;
    const modId = selectedModule.id;
    setProgress((prev) => {
      const next = { ...prev };
      if (!next[courseId]) next[courseId] = [];
      if (!next[courseId].includes(modId)) next[courseId] = [...next[courseId], modId];
      saveProgress(next);
      return next;
    });
  };

  const handleBackToCourse = () => { setView("course"); window.scrollTo(0, 0); };
  const handleBackToCatalog = () => { setView("catalog"); setSelectedCourse(null); window.scrollTo(0, 0); };

  const handleOpenCertificate = (course) => {
    setCertCourse(course);
    setShowCert(true);
  };

  const totalCompleted = COURSES.filter((c) => isCourseComplete(c.id, progress)).length;

  return (
    <>
      {!userName && <NameDialog onSave={handleSaveName} />}
      {showCert && certCourse && (
        <Certificate course={certCourse} userName={userName} onClose={() => setShowCert(false)} />
      )}

      {/* Hero */}
      <div className="bg-primary py-12 px-4">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <AnimateIn variant="fadeLeft">
              <span className="text-xs font-black uppercase tracking-widest text-white/70 mb-2 block">WDC Academy</span>
              <h1 className="text-3xl font-bold text-white mb-1">Training & Certification</h1>
              <p className="text-white/80 text-sm max-w-xl">
                Professional disaster management training designed for humanitarian workers, community leaders, government officials, and concerned citizens worldwide.
              </p>
            </AnimateIn>
            {userName && (
              <motion.div
                className="bg-white/15 border border-white/30 rounded-lg px-6 py-4 text-center shrink-0"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Learning as</p>
                <p className="text-white font-bold">{userName}</p>
                <p className="text-white/60 text-xs mt-1">
                  {totalCompleted} / {COURSES.length} courses completed
                </p>
                <button onClick={() => { saveName(""); setUserName(""); }}
                  className="text-white/50 text-[10px] hover:text-white mt-2 block mx-auto transition-colors">
                  Change name
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-content-secondary">
              <BookOpen size={16} className="text-primary" />
              <span><strong className="text-content-primary">{COURSES.length}</strong> courses available</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <Clock size={16} className="text-primary" />
              <span><strong className="text-content-primary">17 hours</strong> of content</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <CheckCircle size={16} className="text-green-500" />
              <span><strong className="text-content-primary">{COURSES.reduce((a, c) => a + c.totalModules, 0)}</strong> total modules</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <Award size={16} className="text-primary" />
              <span>Certificate upon completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <Section>
        <div className="container py-10">
          {view === "catalog" && (
            <>
              <Heading title="Our Courses" tag="WDC Academy" className="mb-8" />
              <Catalog progress={progress} onSelectCourse={handleSelectCourse} />
            </>
          )}

          {view === "course" && selectedCourse && (
            <CourseView
              course={selectedCourse}
              progress={progress}
              userName={userName}
              onSelectModule={handleSelectModule}
              onBack={handleBackToCatalog}
              onCertificate={() => handleOpenCertificate(selectedCourse)}
            />
          )}

          {view === "module" && selectedCourse && selectedModule && (
            <ModuleView
              course={selectedCourse}
              module={selectedModule}
              moduleIdx={selectedModuleIdx}
              isCompleted={(progress[selectedCourse.id] || []).includes(selectedModule.id)}
              onComplete={handleCompleteModule}
              onBack={handleBackToCourse}
            />
          )}
        </div>
      </Section>

      {/* Custom training estimator — shown only from the catalog view */}
      {view === "catalog" && <TrainingPlanEstimator />}
    </>
  );
}
