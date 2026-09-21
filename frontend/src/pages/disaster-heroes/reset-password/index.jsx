import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Shield, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { resetHeroPassword } from "../../../api/disasterHeroes";

const PW_RULES = [
  { id: "len",   label: "At least 8 characters",          test: p => p.length >= 8 },
  { id: "upper", label: "One uppercase letter (A–Z)",      test: p => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter (a–z)",      test: p => /[a-z]/.test(p) },
  { id: "num",   label: "One number (0–9)",                test: p => /[0-9]/.test(p) },
  { id: "spec",  label: "One special character (!@#$%…)", test: p => /[^A-Za-z0-9]/.test(p) },
];

const T = {
  bg: "#F5F5F7", surface: "#FFFFFF", border: "rgba(60,60,67,.22)",
  fg: "#1D1D1F", muted: "rgba(29,29,31,.60)", blue: "#009EDB",
  shadowLg: "0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04)",
};

export default function DisasterHeroesResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [done, setDone]         = useState(false);

  const pwValid = PW_RULES.every(r => r.test(password));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!pwValid)          { setError("Please meet all password requirements."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!token)            { setError("Invalid reset link. Please request a new one."); return; }
    setLoading(true);
    try {
      await resetHeroPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password. The link may have expired.");
    } finally { setLoading(false); }
  }

  const field = {
    background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10,
    padding: "11px 14px", fontSize: 14, color: T.fg, outline: "none",
    width: "100%", fontFamily: "inherit",
  };

  if (!token) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: "40px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <AlertCircle size={40} style={{ color: "#EF4444", margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: 20, fontWeight: 800, color: T.fg, marginBottom: 8 }}>Invalid reset link</h1>
          <p style={{ fontSize: 13, color: T.muted, marginBottom: 20, lineHeight: 1.6 }}>
            This link is missing the reset token. Please request a new password reset.
          </p>
          <Link to="/disaster-heroes/login" style={{ color: T.blue, fontWeight: 700, fontSize: 13 }}>
            Back to Login →
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: "40px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Check size={30} style={{ color: "#22C55E" }} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: T.fg, marginBottom: 8 }}>Password updated!</h1>
          <p style={{ fontSize: 13, color: T.muted, marginBottom: 24, lineHeight: 1.6 }}>
            Your new password is set. You can now sign in to your Disaster Heroes account.
          </p>
          <Link to="/disaster-heroes/login"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 100, background: T.blue, color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Sign In Now →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password — WDC Disaster Heroes</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(0,158,219,.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Shield size={28} style={{ color: T.blue }} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: 0, letterSpacing: "-0.02em" }}>Choose a new password</h1>
            <p style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>Make it strong and memorable</p>
          </div>

          <div style={{ background: T.surface, borderRadius: 20, padding: "28px 24px", boxShadow: T.shadowLg }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>New Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" style={{ ...field, paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.muted }}>
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {password && (
                  <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 10, background: "#F5F5F7", border: "1px solid rgba(0,0,0,.06)", display: "flex", flexDirection: "column", gap: 6 }}>
                    {PW_RULES.map(({ id, label, test }) => {
                      const ok = test(password);
                      return (
                        <div key={id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 16, height: 16, borderRadius: "50%", background: ok ? "#22C55E" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {ok && <Check size={10} color="#fff" />}
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 500, color: ok ? "#16A34A" : "#9CA3AF" }}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Confirm Password</label>
                <input type={showPw ? "text" : "password"} value={confirm}
                  onChange={e => setConfirm(e.target.value)} placeholder="••••••••"
                  style={{ ...field, border: confirm && confirm !== password ? "1px solid rgba(239,68,68,.5)" : field.border }} />
                {confirm && confirm !== password && (
                  <p style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>Passwords don't match</p>
                )}
              </div>

              {error && (
                <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.2)", display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#DC2626" }}>
                  <AlertCircle size={14} style={{ marginTop: 1, flexShrink: 0 }} /> {error}
                </div>
              )}

              <button type="submit" disabled={loading || !pwValid || password !== confirm}
                style={{ padding: "12px", borderRadius: 100, background: loading || !pwValid || password !== confirm ? T.border : T.blue, border: "none", fontSize: 14, fontWeight: 700, color: "#fff", cursor: loading || !pwValid || password !== confirm ? "not-allowed" : "pointer" }}>
                {loading ? "Updating…" : "Set New Password"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 16 }}>
              Remember your password?{" "}
              <Link to="/disaster-heroes/login" style={{ color: T.blue, fontWeight: 600 }}>Back to login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
