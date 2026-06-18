import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/getErrorMessage";
import { btnPrimary, inputClass, labelClass } from "../utils/ui";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(formData);
      navigate("/verifyEmail", { state: { email: formData.email } });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Create account</h1>
        <p className="mt-1 mb-6 text-slate-500">
          Join EventHub to discover and attend events
        </p>

        {error && <Alert message={error} onClose={() => setError("")} />}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={inputClass}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={inputClass}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={inputClass}
              placeholder="Min 8 chars, upper, lower, number & symbol"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <span className="text-xs text-slate-400">
              Must include uppercase, lowercase, number, and special character
            </span>
          </div>

          <button type="submit" className={`${btnPrimary} w-full`} disabled={loading}>
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
