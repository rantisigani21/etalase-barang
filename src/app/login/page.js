"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = (event) => {
    event.preventDefault();

    if (email === "admin@shelfify.com" && password === "admin123") {
      alert("Welcome Admin!");
      router.push("/halamanutama-admin");
    } else if (email === "user@shelfify.com" && password === "user123") {
      alert("Welcome to Shelfify!");
      router.push("/halaman-utama-user");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-6xl text-pink-200" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Login
        </h2>

        <form onSubmit={handleLoginClick}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
              placeholder="Enter your password"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-pink-300 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="flex items-center mt-4 mb-6 text-black">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-300 text-white py-2 rounded-md hover:bg-pink-200 transition-colors"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-black">
            Don't have an account?{" "}
            <a href="#" className="text-pink-300 hover:underline">
              Create One
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
