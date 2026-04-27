import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { profile, signin } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    profile().then((res) => {
      if (res?.success) navigate("/profile");
      else localStorage.removeItem("userAuth");
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please fill in all required fields.");
      return;
    }
    setPending(true);
    const res = await signin({ email, password });
    if (res?.success) {
      toast.success(`Welcome back, ${email}`);
      localStorage.setItem(
        "userAuth",
        JSON.stringify({ email, id: res.id, token: res.token, role: res?.role })
      );
      setPending(false);
      navigate("/");
    } else {
      toast.error(res?.response?.data?.error || "Login failed. Please check your credentials.");
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-subtle flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* UNOCHA top accent bar */}
          <div className="h-1 w-full bg-primary" />

          <div className="p-8">
            <h1 className="text-2xl font-bold text-content-primary mb-1">Sign In</h1>
            <p className="text-sm text-content-secondary mb-8">
              Access your World Disaster Center account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-content-secondary mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-content-secondary mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Your password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition-colors duration-200 disabled:opacity-60"
              >
                {pending ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-content-secondary mt-6">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
