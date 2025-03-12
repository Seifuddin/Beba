"use client"; // Ensure it's a client component

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for App Router

export default function Login() {
  const router = useRouter(); // Now this works!

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic...
    setMessage("Login successful!");
    router.push("/dashboard"); // Redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-200 shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full mb-2 bg-gray-50 text-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full mb-2 bg-gray-100 text-gray-700"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign In
        </button>

        <Link
  href="/register"
  className="bg-blue-600 text-white px-4 py-3 rounded mx-2"
>
  Sign Up
</Link>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </form>
    </div>
  );
}