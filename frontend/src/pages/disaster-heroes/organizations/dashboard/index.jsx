import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart2, Users, DollarSign, FileText, PlusCircle,
  Eye, CheckCircle, Clock, AlertCircle, Download,
} from "lucide-react";
import SEOMeta from "../../../../components/SEOMeta";
import AnimateIn from "../../../../components/AnimateIn";

const PRIMARY = "#009EDB";
const NAVY = "#001129";
const BG = "#F8FAFC";

// ── Mock data ──────────────────────────────────────────────────────────────────
const MOCK_CASES = [
  {
    id: "org-case-001",
    photo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=100&q=60",
    name: "Ibrahim Family",
    type: "Family",
    country: "Nigeria",
    status: "active",
    monthlyGoal: 90,
    funded: 54,
  },
  {
    id: "org-case-002",
    photo: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=100&q=60",
    name: "Aisha Musa",
    type: "Individual",
    country: "Sudan",
    status: "pending",
    monthlyGoal: 35,
    funded: 0,
  },
  {
    id: "org-case-003",
    photo: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=100&q=60",
    name: "Diallo Family",
    type: "Family",
    country: "Mali",
    status: "active",
    monthlyGoal: 120,
    funded: 96,
  },
];

const MOCK_REPORTS = [
  { month: "August 2026", cases: 3, donors: 8, received: "$270", disbursed: "$243", pending: "$27" },
  { month: "July 2026",   cases: 3, donors: 7, received: "$245", disbursed: "$220", pending: "$25" },
  { month: "June 2026",   cases: 2, donors: 5, received: "$180", disbursed: "$162", pending: "$18" },
];

const MOCK_ACTIVITY = [
  { icon: "💳", text: "New donation received for Ibrahim Family ($30)", time: "2 hours ago", color: "#22c55e" },
  { icon: "📋", text: "Aisha Musa case submitted for ARIA review", time: "1 day ago", color: PRIMARY },
  { icon: "✅", text: "Diallo Family field report approved", time: "3 days ago", color: PRIMARY },
  { icon: "💰", text: "Disbursement of $243 sent to your account", time: "5 days ago", color: "#22c55e" },
];

const STATUS_STYLE = {
  active:  { bg: "#dcfce7", color: "#15803d", label: "Active" },
  pending: { bg: "#fef3c7", color: "#92400e", label: "Pending Review" },
  funded:  { bg: "#EFF9FF", color: "#0369a1", label: "Fully Funded" },
};

const TABS = ["Overview", "My Cases", "Add Beneficiary", "Financial Reports", "Settings"];

// ── Add Beneficiary Sub-form ───────────────────────────────────────────────────
function AddBeneficiaryForm() {
  const [benefType, setBenefType] = useState("individual");
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [crisisType, setCrisisType] = useState("");
  const [story, setStory] = useState("");
  const [photo, setPhoto] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [healthNeed, setHealthNeed] = useState("");
  const [educationNeed, setEducationNeed] = useState("");
  const [shelterNeed, setShelterNeed] = useState("");

  // family extras
  const [familyName, setFamilyName] = useState("");
  const [headOfHousehold, setHeadOfHousehold] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [membersList, setMembersList] = useState("");

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "#EFF9FF", border: `1px solid ${PRIMARY}33` }}
        >
          <CheckCircle size={28} style={{ color: PRIMARY }} />
        </div>
        <h3 className="font-black text-lg mb-2" style={{ color: NAVY }}>Case Submitted!</h3>
        <p className="text-gray-500 text-sm mb-5">
          Your case is now with ARIA for review. You&apos;ll be notified when it&apos;s approved — typically within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setName(""); setFamilyName(""); setStory(""); }}
          className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl"
          style={{ background: PRIMARY, color: "#fff" }}
        >
          <PlusCircle size={14} /> Add Another Case
        </button>
      </div>
    );
  }

  const inputStyle = {
    base: "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all",
    field: { background: "#f8fafc", border: "1px solid #e5e7eb", color: NAVY },
  };

  return (
    <div className="space-y-5">
      {/* Type selector */}
      <div>
        <p className="text-xs font-black mb-2" style={{ color: NAVY }}>Beneficiary Type</p>
        <div className="flex gap-3">
          {["individual", "family"].map((t) => (
            <button
              key={t}
              onClick={() => setBenefType(t)}
              className="flex-1 py-2.5 rounded-xl text-xs font-black capitalize transition-all"
              style={
                benefType === t
                  ? { background: PRIMARY, color: "#fff" }
                  : { background: "#f1f5f9", color: "#334155" }
              }
            >
              {t === "individual" ? "👤 Individual" : "👨‍👩‍👧‍👦 Family"}
            </button>
          ))}
        </div>
      </div>

      {benefType === "individual" ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Name <span style={{ color: "#EF4444" }}>*</span></label>
              <input className={inputStyle.base} style={inputStyle.field} value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Age</label>
              <input type="number" className={inputStyle.base} style={inputStyle.field} value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Family Name <span style={{ color: "#EF4444" }}>*</span></label>
            <input className={inputStyle.base} style={inputStyle.field} value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="e.g. The Diallo Family" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Head of Household</label>
              <input className={inputStyle.base} style={inputStyle.field} value={headOfHousehold} onChange={(e) => setHeadOfHousehold(e.target.value)} placeholder="Name and age" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Family Size</label>
              <input type="number" className={inputStyle.base} style={inputStyle.field} value={familySize} onChange={(e) => setFamilySize(e.target.value)} placeholder="e.g. 6" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Members List</label>
            <textarea
              rows={3}
              className={inputStyle.base + " resize-none"}
              style={inputStyle.field}
              value={membersList}
              onChange={(e) => setMembersList(e.target.value)}
              placeholder="e.g. Amara (42, father), Kadiatou (38, mother), Ibrahim (15)…"
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Country <span style={{ color: "#EF4444" }}>*</span></label>
          <input className={inputStyle.base} style={inputStyle.field} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Kenya" />
        </div>
        <div>
          <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>City / Region</label>
          <input className={inputStyle.base} style={inputStyle.field} value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Nairobi" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Crisis Type <span style={{ color: "#EF4444" }}>*</span></label>
        <input className={inputStyle.base} style={inputStyle.field} value={crisisType} onChange={(e) => setCrisisType(e.target.value)} placeholder="e.g. Drought & Food Insecurity" />
      </div>

      <div>
        <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Story <span style={{ color: "#EF4444" }}>*</span></label>
        <textarea
          rows={5}
          className={inputStyle.base + " resize-none"}
          style={inputStyle.field}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Describe the beneficiary's situation, specific needs, and what support will change for them…"
        />
      </div>

      <div>
        <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Photo URL (community context only)</label>
        <input type="url" className={inputStyle.base} style={inputStyle.field} value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://…" />
      </div>

      <div>
        <label className="block text-xs font-black mb-2" style={{ color: NAVY }}>Needs Allocation ($/month)</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "💊 Health", value: healthNeed, set: setHealthNeed },
            { label: "📚 Education", value: educationNeed, set: setEducationNeed },
            { label: "🏠 Shelter", value: shelterNeed, set: setShelterNeed },
          ].map((n) => (
            <div key={n.label}>
              <label className="block text-[10px] font-bold mb-1 text-gray-500">{n.label}</label>
              <input
                type="number"
                className={inputStyle.base}
                style={inputStyle.field}
                value={n.value}
                onChange={(e) => n.set(e.target.value)}
                placeholder="$0"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>Monthly Goal ($) <span style={{ color: "#EF4444" }}>*</span></label>
        <input type="number" className={inputStyle.base} style={inputStyle.field} value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} placeholder="e.g. 90" />
      </div>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSubmitted(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-white text-sm transition-all"
        style={{ background: PRIMARY }}
      >
        <PlusCircle size={14} /> Submit for ARIA Review
      </motion.button>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function DisasterHeroesOrgsDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const fundedPct = (funded, goal) => Math.min(100, Math.round((funded / goal) * 100));

  return (
    <>
      <SEOMeta
        title="Organization Dashboard — WDC Disaster Heroes"
        description="Manage your beneficiary cases, view financial reports, and track donor impact on the WDC Disaster Heroes partner dashboard."
        url="/disaster-heroes/organizations/dashboard"
      />

      {/* Toast */}
      {toastVisible && (
        <div
          className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-xl"
          style={{ background: NAVY }}
        >
          Export coming soon
        </div>
      )}

      {/* Demo banner */}
      <div
        className="sticky top-0 z-40 flex items-center justify-center gap-2 py-2.5 text-xs font-bold"
        style={{ background: "#fef3c7", color: "#92400e", borderBottom: "1px solid #fde68a" }}
      >
        <AlertCircle size={14} />
        Demo mode — connect your organization account to see live data
      </div>

      <div style={{ background: BG, minHeight: "100vh", paddingBottom: "5rem" }}>
        {/* Header */}
        <div style={{ background: NAVY, padding: "1.5rem 0" }}>
          <div className="container flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: PRIMARY }}>
                Partner Dashboard
              </p>
              <h1 className="text-white font-black text-lg">Demo Organization</h1>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(0,158,219,0.12)", border: `1px solid ${PRIMARY}33` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                <span className="text-[10px] font-black" style={{ color: PRIMARY }}>ARIA Verified</span>
              </div>
              <Link
                to="/disaster-heroes/organizations"
                className="text-white/50 hover:text-white text-xs font-medium transition-colors"
              >
                ← Organizations
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
          <div className="container">
            <div className="flex gap-1 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="shrink-0 text-xs font-black px-4 py-3.5 transition-all border-b-2"
                  style={
                    activeTab === tab
                      ? { color: PRIMARY, borderColor: PRIMARY }
                      : { color: "#94a3b8", borderColor: "transparent" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container pt-8">

          {/* ── OVERVIEW ── */}
          {activeTab === "Overview" && (
            <AnimateIn variant="fadeUp">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: <FileText size={18} style={{ color: PRIMARY }} />, label: "Active Cases", value: "2" },
                  { icon: <DollarSign size={18} style={{ color: "#22c55e" }} />, label: "Total Funded This Month", value: "$150" },
                  { icon: <Users size={18} style={{ color: "#f97316" }} />, label: "Donors", value: "8" },
                  { icon: <BarChart2 size={18} style={{ color: "#8b5cf6" }} />, label: "Impact Score", value: "74 / 100" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-5"
                    style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                  >
                    <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span></div>
                    <p className="text-2xl font-black" style={{ color: NAVY }}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity feed */}
                <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: PRIMARY }}>
                    Recent Activity
                  </p>
                  <div className="space-y-4">
                    {MOCK_ACTIVITY.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-base"
                          style={{ background: a.color + "18" }}
                        >
                          {a.icon}
                        </div>
                        <div>
                          <p className="text-xs text-gray-700">{a.text}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: PRIMARY }}>
                    Quick Actions
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: <PlusCircle size={16} style={{ color: PRIMARY }} />, label: "Add New Beneficiary", action: () => setActiveTab("Add Beneficiary") },
                      { icon: <FileText size={16} style={{ color: "#8b5cf6" }} />, label: "Submit Field Report", action: () => {} },
                      { icon: <DollarSign size={16} style={{ color: "#22c55e" }} />, label: "View Funds", action: () => setActiveTab("Financial Reports") },
                    ].map((q) => (
                      <button
                        key={q.label}
                        onClick={q.action}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all hover:-translate-y-0.5"
                        style={{ background: "#f8fafc", border: "1px solid #e5e7eb", color: NAVY }}
                      >
                        {q.icon} {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* ── MY CASES ── */}
          {activeTab === "My Cases" && (
            <AnimateIn variant="fadeUp">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg" style={{ color: NAVY }}>My Cases</h2>
                <button
                  onClick={() => setActiveTab("Add Beneficiary")}
                  className="inline-flex items-center gap-2 font-black text-xs px-4 py-2.5 rounded-xl"
                  style={{ background: PRIMARY, color: "#fff" }}
                >
                  <PlusCircle size={12} /> Add Case
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Beneficiary", "Country", "Status", "Monthly Goal", "Funded %", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody style={{ background: "#fff" }}>
                      {MOCK_CASES.map((c, i) => {
                        const st = STATUS_STYLE[c.status];
                        const pct = fundedPct(c.funded, c.monthlyGoal);
                        return (
                          <tr key={c.id} style={{ borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={c.photo}
                                  alt=""
                                  className="w-8 h-8 rounded-lg object-cover"
                                  style={{ filter: "saturate(0.7)" }}
                                />
                                <div>
                                  <p className="text-xs font-black" style={{ color: NAVY }}>{c.name}</p>
                                  <p className="text-[10px] text-gray-400">{c.type}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-xs text-gray-600">{c.country}</td>
                            <td className="px-4 py-4">
                              <span
                                className="text-[10px] font-black px-2 py-1 rounded-full"
                                style={{ background: st.bg, color: st.color }}
                              >
                                {st.label}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-xs font-black" style={{ color: NAVY }}>${c.monthlyGoal}/mo</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${pct}%`, background: PRIMARY }}
                                  />
                                </div>
                                <span className="text-[10px] font-black" style={{ color: PRIMARY }}>{pct}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <Link
                                to={`/disaster-heroes/case/${c.id}`}
                                className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                                style={{ background: "#EFF9FF", color: PRIMARY }}
                              >
                                <Eye size={10} /> View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* ── ADD BENEFICIARY ── */}
          {activeTab === "Add Beneficiary" && (
            <AnimateIn variant="fadeUp">
              <h2 className="font-black text-lg mb-6" style={{ color: NAVY }}>Add New Beneficiary</h2>
              <div className="max-w-2xl">
                <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                  <AddBeneficiaryForm />
                </div>
              </div>
            </AnimateIn>
          )}

          {/* ── FINANCIAL REPORTS ── */}
          {activeTab === "Financial Reports" && (
            <AnimateIn variant="fadeUp">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg" style={{ color: NAVY }}>Financial Reports</h2>
                <button
                  onClick={showToast}
                  className="inline-flex items-center gap-2 font-bold text-xs px-4 py-2.5 rounded-xl"
                  style={{ background: "#f1f5f9", color: "#334155" }}
                >
                  <Download size={12} /> Download CSV
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Month", "Cases", "Donors", "Total Received", "Disbursed", "Pending"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody style={{ background: "#fff" }}>
                      {MOCK_REPORTS.map((r, i) => (
                        <tr key={r.month} style={{ borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                          <td className="px-4 py-4 text-xs font-black" style={{ color: NAVY }}>{r.month}</td>
                          <td className="px-4 py-4 text-xs text-gray-600">{r.cases}</td>
                          <td className="px-4 py-4 text-xs text-gray-600">{r.donors}</td>
                          <td className="px-4 py-4 text-xs font-bold" style={{ color: "#22c55e" }}>{r.received}</td>
                          <td className="px-4 py-4 text-xs font-bold" style={{ color: PRIMARY }}>{r.disbursed}</td>
                          <td className="px-4 py-4 text-xs text-gray-600">{r.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-3">
                * All funds flow through the WDC ledger. Disbursements are sent within 5 business days of the month close.
              </p>
            </AnimateIn>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === "Settings" && (
            <AnimateIn variant="fadeUp">
              <h2 className="font-black text-lg mb-6" style={{ color: NAVY }}>Settings</h2>
              <div
                className="rounded-2xl p-8 text-center"
                style={{ background: "#fff", border: "1px solid #e5e7eb" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#EFF9FF" }}
                >
                  <Clock size={22} style={{ color: PRIMARY }} />
                </div>
                <p className="font-black text-sm mb-2" style={{ color: NAVY }}>Settings coming soon</p>
                <p className="text-gray-400 text-xs">
                  Organization profile editing, notification preferences, and bank account management will be available here.
                </p>
              </div>
            </AnimateIn>
          )}

        </div>
      </div>
    </>
  );
}
