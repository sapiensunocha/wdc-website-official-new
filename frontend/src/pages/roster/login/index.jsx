import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Eye, EyeOff, Shield, Mail, AlertCircle, Check } from "lucide-react";
import { loginRosterMember } from "../../../api/roster";
import rosterClient from "../../../api/rosterClient";

export default function RosterLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password"); return; }
    setLoading(true);
    try {
      const { data } = await loginRosterMember({ email, password });
      // Bootstrap: store member data so dashboard can render immediately
      // even when cross-origin cookies are blocked by the browser
      if (data?.member) {
        sessionStorage.setItem("roster_bootstrap", JSON.stringify(data.member));
      }
      toast.success("Welcome back!");
      navigate("/roster/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally { setLoading(false); }
  }

  async function handleForgot(e) {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email address"); return; }
    setLoading(true);
    try {
      await rosterClient.post("/api/roster/member/forgot-password", { email });
      setResetSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send reset email. Please try again.");
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
            <h1 className="text-2xl font-bold text-content-primary">
              {mode === "login" ? "Roster Member Login" : "Reset your password"}
            </h1>
            <p className="text-sm text-content-secondary mt-2">
              {mode === "login" ? "Access your WDC expert dashboard" : "We'll send a reset link to your email"}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">

            {resetSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-green-500" />
                </div>
                <p className="font-bold text-content-primary mb-2">Reset link sent!</p>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Check your inbox at <strong>{email}</strong>. Click the link to set a new password. The link expires in 1 hour.
                </p>
                <button onClick={() => { setResetSent(false); setMode("login"); setError(""); }}
                  className="mt-5 text-sm font-semibold text-primary hover:underline">
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={mode === "login" ? handleLogin : handleForgot} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-content-secondary mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className={inputCls} placeholder="you@example.com" autoComplete="email" />
                </div>

                {mode === "login" && (
                  <div>
                    <label className="block text-xs font-semibold text-content-secondary mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPw ? "text" : "password"} value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={`${inputCls} pr-10`} placeholder="••••••••" autoComplete="current-password" />
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                  {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Send Reset Link"}
                </button>

                <div className="text-center">
                  {mode === "login" ? (
                    <button type="button" onClick={() => { setMode("forgot"); setError(""); }}
                      className="text-sm text-content-secondary hover:text-primary transition-colors">
                      Forgot your password?
                    </button>
                  ) : (
                    <button type="button" onClick={() => { setMode("login"); setError(""); }}
                      className="text-sm font-semibold text-primary hover:underline">
                      Back to login
                    </button>
                  )}
                </div>
              </form>
            )}

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
