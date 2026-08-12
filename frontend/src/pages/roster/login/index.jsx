import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Eye, EyeOff, Shield } from "lucide-react";
import { loginRosterMember } from "../../../api/roster";

export default function RosterLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { toast.error("Please enter your email and password"); return; }
    setLoading(true);
    try {
      await loginRosterMember({ email, password });
      toast.success("Welcome back!");
      navigate("/roster/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally { setLoading(false); }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none border border-border focus:border-primary transition-colors bg-white";

  return (
    <>
      <Helmet>
        <title>Roster Member Login | World Disaster Center</title>
        <meta name="description" content="Sign in to your WDC Expert Roster account to access deployment opportunities, track your profile, and manage your humanitarian career." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center bg-surface-subtle px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
              <Shield size={24} style={{ color: "#009EDB" }} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary">Roster Member Login</h1>
            <p className="text-sm text-content-secondary mt-2">Access your WDC expert dashboard</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-content-secondary mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" autoComplete="email" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-content-secondary mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className={`${inputCls} pr-10`} placeholder="••••••••" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-content-secondary">
                Started an application?{" "}
                <Link to="/roster/apply" className="text-sm font-bold text-primary hover:underline">Continue applying →</Link>
              </p>
              <p className="text-sm text-content-secondary">
                Not on the roster yet?{" "}
                <Link to="/roster/apply" className="text-sm font-bold text-primary hover:underline">Apply to Join →</Link>
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-xs text-content-tertiary mb-1">Are you an organisation?</p>
              <Link to="/roster/partner" className="text-xs font-semibold text-content-secondary hover:text-primary transition-colors">Partner Login →</Link>
            </div>
            <p className="text-center text-xs text-content-tertiary mt-5">
              Having trouble?{" "}
              <a href="mailto:office@worlddisastercenter.org" className="text-primary hover:underline">
                office@worlddisastercenter.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
