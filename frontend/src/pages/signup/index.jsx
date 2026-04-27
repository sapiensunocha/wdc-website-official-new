import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { profile, signup } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    profile().then((res) => {
      if (res?.success) navigate("/profile");
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please fill in all required fields.");
      return;
    }
    if (password !== confirm) {
      toast.warn("Passwords do not match.");
      return;
    }
    setPending(true);
    const res = await signup({ name, email, password });
    if (res?.success) {
      toast.success("Registration complete. Please sign in.");
      navigate("/signin");
    } else {
      toast.error(res?.response?.data?.error || "Registration failed. Please try again.");
    }
    setPending(false);
  };

  return (
    <div className="min-h-screen bg-surface-subtle flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-primary" />
          <div className="p-8">
            <h1 className="text-2xl font-bold text-content-primary mb-1">Create an Account</h1>
            <p className="text-sm text-content-secondary mb-8">
              Join the World Disaster Center network.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-content-secondary mb-1.5" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
                />
              </div>

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
                  placeholder="Create a password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-content-secondary mb-1.5" htmlFor="confirm">
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  name="confirmpassword"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition-colors duration-200 disabled:opacity-60"
              >
                {pending ? "Creating account…" : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-content-secondary mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
