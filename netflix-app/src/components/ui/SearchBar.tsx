"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { MediaItem } from "@/types";

function getInitialRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("recentSearches");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function SearchBar() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<MediaItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(getInitialRecentSearches);
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    let cancelled = false;
    tmdb.getTrendingSearches().then((res) => {
      if (!cancelled) setTrending(res.results.slice(0, 5));
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setLoading(true);
      tmdb.searchMulti(query.trim())
        .then((res) => {
          setSuggestions(
            res.results
              .filter((r) => r.media_type === "movie" || r.media_type === "tv")
              .slice(0, 6)
          );
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSearch = (e: React.FormEvent, searchTerm?: string) => {
    e.preventDefault();
    const q = searchTerm || query.trim();
    if (!q) return;

    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const removeRecent = (term: string) => {
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const getTitle = (item: MediaItem) => item.title || item.name || "Untitled";
  const getDate = (item: MediaItem) => item.release_date || item.first_air_date || "";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search movies, TV shows..."
          className="w-full bg-black/75 border border-white/30 text-white pl-10 pr-10 py-3 rounded-md focus:outline-none focus:border-white/60 placeholder:text-gray-400 text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); setSuggestions([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {loading && (
              <div className="p-4 text-center text-gray-400 text-sm">
                Searching...
              </div>
            )}

            {!loading && query.trim().length < 2 && recentSearches.length > 0 && (
              <div className="p-3">
                <h4 className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Recent Searches</h4>
                {recentSearches.map((term) => (
                  <div key={term} className="flex items-center gap-3 py-2 px-2 hover:bg-white/5 rounded cursor-pointer group">
                    <Clock size={14} className="text-gray-500" />
                    <span
                      className="flex-1 text-sm text-white/80 group-hover:text-white"
                      onClick={(e) => { e.preventDefault(); handleSearch(e, term); }}
                    >
                      {term}
                    </span>
                    <button
                      onClick={(e) => { e.preventDefault(); removeRecent(term); }}
                      className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading && query.trim().length < 2 && trending.length > 0 && (
              <div className="p-3 border-t border-white/5">
                <h4 className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Trending</h4>
                {trending.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 px-2 hover:bg-white/5 rounded cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const q = getTitle(item);
                      handleSearch(e, q);
                    }}
                  >
                    <TrendingUp size={14} className="text-netflix-red" />
                    <span className="text-sm text-white/80">{getTitle(item)}</span>
                  </div>
                ))}
              </div>
            )}

            {!loading && suggestions.length > 0 && (
              <div className="p-2">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/${item.media_type}/${item.id}`);
                      setShowDropdown(false);
                      setQuery("");
                    }}
                  >
                    <div className="w-10 h-14 bg-neutral-800 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {item.poster_path ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          alt={getTitle(item)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[8px] text-gray-500">N/A</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{getTitle(item)}</p>
                      <p className="text-xs text-gray-400">
                        {item.media_type === "movie" ? "Movie" : "TV"} · {getDate(item) ? new Date(getDate(item)).getFullYear() : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && query.trim().length >= 2 && suggestions.length === 0 && (
              <div className="p-6 text-center text-gray-400 text-sm">
                No results found
              </div>
            )}

            <button
              onClick={(e) => { e.preventDefault(); handleSearch(e); }}
              className="w-full p-3 text-center text-sm text-white/60 hover:text-white hover:bg-white/5 border-t border-white/5 transition-colors"
            >
              See all results for &quot;{query}&quot;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
