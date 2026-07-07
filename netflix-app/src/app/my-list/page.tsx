"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ListX } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { useLocalStorage } from "@/hooks";
import { Movie, TVShow } from "@/types";
import MovieCard from "@/components/movie/MovieCard";

export default function MyListPage() {
  const [myListIds] = useLocalStorage<number[]>("netflix-my-list", []);
  const [items, setItems] = useState<(Movie | TVShow)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      if (myListIds.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          myListIds.map(async (id) => {
            try {
              const movie = await tmdb.getMovieDetail(id);
              return movie as unknown as Movie;
            } catch {
              try {
                const tv = await tmdb.getTVShowDetail(id);
                return tv as unknown as TVShow;
              } catch {
                return null;
              }
            }
          })
        );
        setItems(results.filter(Boolean) as (Movie | TVShow)[]);
      } catch (err) {
        console.error("Failed to load list:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [myListIds]);

  return (
    <div className="min-h-screen bg-netflix-dark pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-8"
        >
          My List
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: myListIds.length || 6 }).map((_, i) => (
              <div key={i} className="skeleton h-[330px] rounded-md" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard item={item} size="medium" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <ListX size={64} className="text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your list is empty</h2>
            <p className="text-gray-400 text-sm text-center max-w-md">
              Add movies and TV shows to your list by clicking the + button on any title.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
