"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { tmdb } from "@/lib/tmdb";
import { Movie, TVShow } from "@/types";
import MovieCard from "@/components/movie/MovieCard";


export default function GenrePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const genreId = Number(params.id);
  const genreName = searchParams.get("name") || "Genre";
  const mediaType = (searchParams.get("type") as "movie" | "tv") || "movie";

  const [items, setItems] = useState<(Movie | TVShow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    async function fetchGenre() {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          with_genres: String(genreId),
          sort_by: sortBy,
          page: String(page),
        };

        const res =
          mediaType === "movie"
            ? await tmdb.discoverMovies(params)
            : await tmdb.discoverTV(params);

        setItems(res.results);
        setTotalPages(Math.min(res.total_pages, 20));
      } catch (err) {
        console.error("Failed to load genre:", err);
      } finally {
        setLoading(false);
      }
    }
    if (genreId) fetchGenre();
  }, [genreId, mediaType, page, sortBy]);

  return (
    <div className="min-h-screen bg-netflix-dark pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {genreName}
          </h1>
          <div className="flex items-center gap-4">
            <select
              value={mediaType}
              className="bg-neutral-800 text-white text-sm px-4 py-2 rounded-md border border-white/10 focus:outline-none"
              disabled
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="bg-neutral-800 text-white text-sm px-4 py-2 rounded-md border border-white/10 focus:outline-none"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="vote_average.desc">Top Rated</option>
              <option value="release_date.desc">Newest</option>
              <option value="release_date.asc">Oldest</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton h-[330px] rounded-md" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                >
                  <MovieCard item={item} size="medium" />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-md disabled:opacity-30 hover:bg-neutral-700 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-400 px-4">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-md disabled:opacity-30 hover:bg-neutral-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-2">No content found</h2>
            <p className="text-gray-400 text-sm">Try a different genre or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
