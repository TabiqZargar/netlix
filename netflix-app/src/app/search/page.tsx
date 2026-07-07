"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { MediaItem } from "@/types";
import MovieCard from "@/components/movie/MovieCard";
import SearchBar from "@/components/ui/SearchBar";
import { ContentRowSkeleton } from "@/components/ui/Skeleton";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query.trim()) return;

    let cancelled = false;
    setLoading(true);
    tmdb.searchMulti(query)
      .then((res) => {
        if (cancelled) return;
        const filtered = res.results.filter(
          (r) => r.media_type === "movie" || r.media_type === "tv"
        );
        setResults(filtered);
        setTotalResults(filtered.length);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="min-h-screen bg-netflix-dark pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <SearchBar />
        </div>

        {query && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400 mb-6"
          >
            {totalResults} result{totalResults !== 1 ? "s" : ""} for &quot;{query}&quot;
          </motion.p>
        )}

        {loading ? (
          <ContentRowSkeleton />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {results.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <MovieCard item={item} size="medium" />
              </motion.div>
            ))}
          </div>
        ) : query ? (
          <div className="flex flex-col items-center justify-center py-20">
            <SearchIcon size={48} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-400 text-sm">
              Try searching for something else
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <SearchIcon size={48} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Search Netflix</h2>
            <p className="text-gray-400 text-sm">
              Search for movies, TV shows, and more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-netflix-dark pt-24 pb-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ContentRowSkeleton />
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
