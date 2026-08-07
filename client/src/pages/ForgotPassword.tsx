import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      toast.success(
        response.message ||
          "Password reset email sent successfully."
      );

      setEmail("");

    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-white">
          Forgot Password
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Enter your email address to receive a password reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;