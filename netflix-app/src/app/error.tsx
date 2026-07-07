"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-netflix-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-netflix-red mb-4">Oops!</h1>
        <h2 className="text-xl font-semibold text-white mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-white/80 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/20 text-white font-semibold rounded-md backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
