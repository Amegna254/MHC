import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      // Save user and token
      login(data.token, data.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-xl w-96 space-y-5 shadow-lg"
      >
        <h2 className="text-3xl text-white font-bold text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 py-3 rounded hover:bg-cyan-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;