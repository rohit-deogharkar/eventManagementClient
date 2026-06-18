import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/authApi";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/getErrorMessage";
import { btnPrimary, inputClass, labelClass } from "../utils/ui";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await verifyEmail({ email, otp });
      navigate("/login", {
        state: { message: "Email verified! You can now sign in." },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Verify your email</h1>
        <p className="mt-1 mb-6 text-slate-500">
          Enter the 6-digit OTP sent to your email. It expires in 10 minutes.
        </p>

        {error && <Alert message={error} onClose={() => setError("")} />}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="otp" className={labelClass}>
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              name="otp"
              className={`${inputClass} text-center text-2xl tracking-[0.5em] font-semibold`}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </div>

          <button
            type="submit"
            className={`${btnPrimary} w-full`}
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already verified?{" "}
          <Link to="/login" className="font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default VerifyEmail;
