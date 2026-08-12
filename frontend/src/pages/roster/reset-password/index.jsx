import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Shield, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import rosterClient from "../../../api/rosterClient";

const PW_RULES = [
  { id: "len",   label: "At least 8 characters",            test: p => p.length >= 8 },
  { id: "upper", label: "One uppercase letter (A–Z)",        test: p => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter (a–z)",        test: p => /[a-z]/.test(p) },
  { id: "num",   label: "One number (0–9)",                  test: p => /[0-9]/.test(p) },
  { id: "spec",  label: "One special character (!@#$%…)",   test: p => /[^A-Za-z0-9]/.test(p) },
];

export default function RosterResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const pwValid = PW_RULES.every(r => r.test(password));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!pwValid) { setError("Please meet all password requirements."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!token) { setError("Invalid reset link. Please request a new one."); return; }
    setLoading(true);
    try {
      await rosterClient.post("/api/roster/member/reset-password", { token, password });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password. The link may have expired.");
    } finally { setLoading(false); }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none border border-border focus:border-primary transition-colors bg-white";

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface-subtle px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-content-primary mb-2">Invalid reset link</h1>
          <p className="text-sm text-content-secondary mb-6">This link is missing the reset token. Please request a new password reset.</p>
          <Link to="/roster/login" className="text-primary font-bold hover:underline text-sm">Back to Login →</Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface-subtle px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
            <Check size={30} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-content-primary mb-3">Password updated!</h1>
          <p className="text-sm text-content-secondary mb-6">Your new password is set. You can now sign in to your account.</p>
          <Link to="/roster/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
            Sign In Now →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | WDC Roster</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center bg-surface-subtle px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
              <Shield size={24} style={{ color: "#009EDB" }} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary">Choose a new password</h1>
            <p className="text-sm text-content-secondary mt-2">Make it strong and memorable</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-content-secondary mb-1.5">New Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`${inputCls} pr-10`} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                    {PW_RULES.map(({ id, label, test }) => {
                      const ok = test(password);
                      return (
                        <div key={id} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${ok ? "bg-green-500" : "bg-gray-200"}`}>
                            {ok && <Check size={10} color="#fff" />}
                          </div>
                          <span className={`text-[11px] font-medium ${ok ? "text-green-600" : "text-gray-400"}`}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-secondary mb-1.5">Confirm Password</label>
                <input type={showPw ? "text" : "password"} value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className={`${inputCls} ${confirm && confirm !== password ? "border-red-300" : ""}`}
                  placeholder="••••••••" />
                {confirm && confirm !== password && (
                  <p className="text-[11px] text-red-500 mt-1">Passwords don't match</p>
                )}
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading || !pwValid || password !== confirm}
                className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                {loading ? "Updating…" : "Set New Password"}
              </button>
            </form>

            <p className="text-center text-xs text-content-tertiary mt-5">
              Remember your password?{" "}
              <Link to="/roster/login" className="text-primary hover:underline">Back to login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
