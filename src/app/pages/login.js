"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter(); // Import Next.js router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage("Login successful!");
      setTimeout(() => {
        router.push("/"); // Redirect to home page
      }, 1000);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-3 w-80" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}