"use client";

import Link from "next/link";

export default function GenreNotFound() {
  return (
    <div className="min-h-screen bg-netflix-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-netflix-red mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-3">Genre not found</h2>
        <p className="text-gray-400 mb-8">
          The genre you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/genre"
          className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-white/80 transition-colors inline-block"
        >
          Browse Genres
        </Link>
      </div>
    </div>
  );
}
