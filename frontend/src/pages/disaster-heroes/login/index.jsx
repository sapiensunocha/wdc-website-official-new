import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { loginDisasterHero, forgotHeroPassword } from "../../../api/disasterHeroes";
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";

const T = {
  bg:      "#F5F5F7",
  surface: "#FFFFFF",
  border:  "rgba(60,60,67,.22)",
  fg:      "#1D1D1F",
  muted:   "rgba(29,29,31,.60)",
  blue:    "#009EDB",
  shadow:  "0 2px 8px rgba(0,0,0,.08), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowLg:"0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04)",
};

export default function DisasterHeroesLogin() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [mode, setMode]         = useState("login"); // login | reset

  const field = {
    background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10,
    padding: "11px 14px", fontSize: 14, color: T.fg, outline: "none",
    width: "100%", fontFamily: "inherit",
  };

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginDisasterHero(email, password);
      navigate("/disaster-heroes/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed. Check your email and password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotHeroPassword(email);
      setResetSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign In — WDC Disaster Heroes</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ background: T.bg, minHeight: "70vh", display: "flex", alignItems: "center",
                    justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ maxWidth: 400, width: "100%" }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(0,158,219,.10)`,
                          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Shield size={28} style={{ color: T.blue }} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: 0, letterSpacing: "-0.02em" }}>
              {mode === "login" ? "Disaster Heroes Login" : "Reset your password"}
            </h1>
            <p style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>
              {mode === "login" ? "Sign in to access your member dashboard" : "We'll send a reset link to your email"}
            </p>
          </div>

          <div style={{ background: T.surface, borderRadius: 20, padding: "28px 24px", boxShadow: T.shadowLg }}>

            {resetSent ? (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>📬</div>
                <p style={{ fontSize: 14, color: T.fg, fontWeight: 600, marginBottom: 6 }}>Reset link sent!</p>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
                  Check your inbox at <strong>{email}</strong>. Click the link to set a new password.
                </p>
                <button onClick={() => { setResetSent(false); setMode("login"); }}
                  style={{ marginTop: 16, fontSize: 13, color: T.blue, fontWeight: 600,
                           background: "none", border: "none", cursor: "pointer" }}>
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={mode === "login" ? handleLogin : handleReset}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Email</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ ...field, paddingLeft: 36 }} />
                  </div>
                </div>

                {mode === "login" && (
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <Lock size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
                      <input type={showPw ? "text" : "password"} required value={password}
                        onChange={e => setPassword(e.target.value)} placeholder="Your password"
                        style={{ ...field, paddingLeft: 36, paddingRight: 40 }} />
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                 background: "none", border: "none", cursor: "pointer", color: T.muted }}>
                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,.06)",
                                border: "1px solid rgba(239,68,68,.2)", display: "flex", alignItems: "flex-start",
                                gap: 8, fontSize: 13, color: "#DC2626" }}>
                    <AlertCircle size={14} style={{ marginTop: 1, flexShrink: 0 }} /> {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                           padding: "12px", borderRadius: 100, background: loading ? T.border : T.blue,
                           border: "none", fontSize: 14, fontWeight: 700, color: "#fff",
                           cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Send Reset Link"}
                  {!loading && <ArrowRight size={14} />}
                </button>

                <div style={{ textAlign: "center" }}>
                  {mode === "login" ? (
                    <button type="button" onClick={() => { setMode("reset"); setError(""); }}
                      style={{ fontSize: 13, color: T.muted, background: "none", border: "none", cursor: "pointer" }}>
                      Forgot your password?
                    </button>
                  ) : (
                    <button type="button" onClick={() => { setMode("login"); setError(""); }}
                      style={{ fontSize: 13, color: T.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                      Back to login
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: T.muted, marginTop: 20 }}>
            Not a Hero yet?{" "}
            <Link to="/disaster-heroes/apply" style={{ color: T.blue, fontWeight: 600 }}>Apply to join</Link>
          </p>
          <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 8 }}>
            Having trouble? <a href="mailto:office@worlddisastercenter.org" style={{ color: T.blue }}>office@worlddisastercenter.org</a>
          </p>
        </div>
      </div>
    </>
  );
}
