"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Info, Star } from "lucide-react";
import { getBackdropUrl, getMediaTitle, formatRating } from "@/lib/tmdb";
import { MovieDetail, TVShowDetail, MediaItem } from "@/types";

interface HeroBannerProps {
  item: MovieDetail | TVShowDetail | MediaItem;
  mediaType?: "movie" | "tv";
}

export default function HeroBanner({ item, mediaType = "movie" }: HeroBannerProps) {
  const title = getMediaTitle(item);
  const href = `/${mediaType}/${item.id}`;

  const backdropUrl = "backdrop_path" in item
    ? getBackdropUrl(item.backdrop_path, "original")
    : "";

  const overview = item.overview || "";
  const rating = item.vote_average || 0;

  const genres = "genres" in item
    ? item.genres?.slice(0, 3).map((g) => g.name).join(" · ")
    : "";

  return (
    <div className="relative w-full h-[85vh] min-h-[500px] max-h-[900px]">
      {backdropUrl ? (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-netflix-dark" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-[15%] left-0 right-0 px-4 md:px-12"
      >
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg leading-tight"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mb-3 md:mb-4 flex-wrap"
          >
            {rating > 0 && (
              <span className="flex items-center gap-1 text-green-400 font-semibold text-sm">
                <Star size={14} fill="currentColor" />
                {formatRating(rating)}
              </span>
            )}
            {genres && (
              <span className="text-netflix-light/80 text-sm">{genres}</span>
            )}
          </motion.div>

          {overview && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm md:text-base text-netflix-light/80 mb-4 md:mb-6 line-clamp-3 max-w-xl leading-relaxed"
            >
              {overview}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <Link
              href={href}
              className="flex items-center gap-2 bg-white text-black font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-md hover:bg-white/80 transition-colors text-sm md:text-base"
            >
              <Play size={18} fill="black" />
              Play
            </Link>

            <Link
              href={href}
              className="flex items-center gap-2 bg-white/20 text-white font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-md backdrop-blur-sm hover:bg-white/30 transition-colors text-sm md:text-base"
            >
              <Info size={18} />
              More Info
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
