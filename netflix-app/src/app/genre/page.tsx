"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { tmdb } from "@/lib/tmdb";
import { Genre } from "@/types";

const MOVIE_GENRE_COLORS: Record<number, string> = {
  28: "from-red-600/20 to-red-900/20",
  12: "from-amber-600/20 to-amber-900/20",
  16: "from-teal-600/20 to-teal-900/20",
  35: "from-yellow-600/20 to-yellow-900/20",
  80: "from-gray-600/20 to-gray-900/20",
  99: "from-purple-600/20 to-purple-900/20",
  18: "from-blue-600/20 to-blue-900/20",
  10751: "from-pink-600/20 to-pink-900/20",
  14: "from-emerald-600/20 to-emerald-900/20",
  36: "from-orange-600/20 to-orange-900/20",
  27: "from-violet-600/20 to-violet-900/20",
  10402: "from-indigo-600/20 to-indigo-900/20",
  9648: "from-rose-600/20 to-rose-900/20",
  10749: "from-fuchsia-600/20 to-fuchsia-900/20",
  878: "from-cyan-600/20 to-cyan-900/20",
  10770: "from-lime-600/20 to-lime-900/20",
  53: "from-slate-600/20 to-slate-900/20",
  10752: "from-zinc-600/20 to-zinc-900/20",
  37: "from-amber-700/20 to-amber-900/20",
};

const TV_GENRE_COLORS: Record<number, string> = {
  10759: "from-red-600/20 to-red-900/20",
  16: "from-teal-600/20 to-teal-900/20",
  35: "from-yellow-600/20 to-yellow-900/20",
  80: "from-gray-600/20 to-gray-900/20",
  99: "from-purple-600/20 to-purple-900/20",
  18: "from-blue-600/20 to-blue-900/20",
  10751: "from-pink-600/20 to-pink-900/20",
  10762: "from-green-600/20 to-green-900/20",
  10763: "from-sky-600/20 to-sky-900/20",
  10764: "from-cyan-600/20 to-cyan-900/20",
  10765: "from-violet-600/20 to-violet-900/20",
  10766: "from-rose-600/20 to-rose-900/20",
  10767: "from-amber-600/20 to-amber-900/20",
  10768: "from-orange-600/20 to-orange-900/20",
  37: "from-indigo-600/20 to-indigo-900/20",
  9648: "from-fuchsia-600/20 to-fuchsia-900/20",
  10769: "from-emerald-600/20 to-emerald-900/20",
};

export default function BrowseGenrePage() {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const [movieData, tvData] = await Promise.all([
          tmdb.getMovieGenres(),
          tmdb.getTVGenres(),
        ]);
        setMovieGenres(movieData.genres);
        setTvGenres(tvData.genres);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  const renderGenreSection = (
    title: string,
    genres: Genre[],
    type: "movie" | "tv",
    colorMap: Record<number, string>
  ) => (
    <section className="mb-10">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {genres.map((genre, index) => {
          const gradient = colorMap[genre.id] || "from-neutral-600/20 to-neutral-900/20";
          return (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={`/genre/${genre.id}?type=${type}&name=${encodeURIComponent(genre.name)}`}
                className={`block bg-gradient-to-br ${gradient} border border-white/10 rounded-lg p-6 hover:border-white/25 transition-all duration-200 hover:scale-105`}
              >
                <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                  {genre.name}
                </h3>
                <p className="text-xs text-gray-400 capitalize">{type === "movie" ? "Movies" : "TV Shows"}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-netflix-dark pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-8"
        >
          Browse by Genre
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {renderGenreSection("Movie Genres", movieGenres, "movie", MOVIE_GENRE_COLORS)}
            {renderGenreSection("TV Show Genres", tvGenres, "tv", TV_GENRE_COLORS)}
          </>
        )}
      </div>
    </div>
  );
}
