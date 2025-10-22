import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUserStore } from "../store/authUser";

const SignUpPage = () => {
  const { searchParams } = new URL(document.location)
  const emailParam = searchParams.get("email")
  const [email, setEmail] = useState(emailParam || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuthUserStore();
  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="Logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Sign Up
          </h2>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 rounded bg-transparent border border-gray-700 text-white focus:outline-none focus:ring"
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full px-3 py-2 rounded bg-transparent border border-gray-700 text-white focus:outline-none focus:ring"
                type="text"
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 rounded bg-transparent border border-gray-700 text-white focus:outline-none focus:ring"
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
              type="submit"
            >
              Sign Up
            </button>

            <div className="text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
