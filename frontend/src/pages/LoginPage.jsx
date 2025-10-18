import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
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
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
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
              Login
            </button>

            <div className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-500 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
