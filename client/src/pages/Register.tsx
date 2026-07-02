import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        fullName,
        username,
        email,
        password,
        role: "developer",
      });

      alert("Registration successful!");

      navigate("/login");

    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-8 rounded-xl w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-slate-800 text-white"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded bg-slate-800 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 py-3 rounded hover:bg-cyan-600"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;