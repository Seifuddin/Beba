"use client"; // Make sure it's a client-side component

import { useState } from "react";
import Link from "next/link"; // Import Next.js Link

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-950 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex text-blue-200 font-bold text-xl">
            BebaRide
          </div>
          <div className="lg:hidden">
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-400">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-400">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-gray-400">
              Services
            </Link>
            <Link href="/contacts" className="text-white hover:text-gray-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 text-white space-y-4 px-4 py-4">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/about" className="block">
            About
          </Link>
          <Link href="/services" className="block">
            Services
          </Link>
          <Link href="/contacts" className="block">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}