"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-5">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Register</h1>
      <form className="flex flex-col gap-3 w-80 " onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded text-gray-700"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded text-gray-700"
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white text-center px-4 py-2 rounded">
                  Register
                </button>
        
                <Link
          href="/login"
          className=" text-orange-600 px-4 py-2 rounded"
        >
          Click here to go back to login page...
        </Link>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}