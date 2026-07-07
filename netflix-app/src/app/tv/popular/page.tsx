"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tmdb } from "@/lib/tmdb";
import { TVShow } from "@/types";
import MovieCard from "@/components/movie/MovieCard";


export default function TVShowsPage() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        const [popular, topRated, onTheAir, airingToday] = await Promise.all([
          tmdb.getPopularTV(),
          tmdb.getTopRatedTV(),
          tmdb.getOnTheAirTV(),
          tmdb.getAiringTodayTV(),
        ]);
        setShows([
          ...popular.results,
          ...topRated.results,
          ...onTheAir.results,
          ...airingToday.results,
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  return (
    <div className="min-h-screen bg-netflix-dark pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-8"
        >
          TV Shows
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton h-[330px] rounded-md" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
              >
                <MovieCard item={show} size="medium" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
