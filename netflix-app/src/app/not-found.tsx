"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netflix-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-7xl md:text-9xl font-bold text-netflix-red mb-4">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
          Lost your way?
        </h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-white/80 transition-colors"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-md backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Search size={18} />
            Search
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mx-auto"
        >
          <ArrowLeft size={14} />
          Go back
        </button>
      </motion.div>
    </div>
  );
}
