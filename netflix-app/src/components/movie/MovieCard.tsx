"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Plus, ChevronDown, Star } from "lucide-react";
import { getPosterUrl } from "@/lib/tmdb";
import { MediaItem, Movie, TVShow } from "@/types";

interface MovieCardProps {
  item: MediaItem | Movie | TVShow;
  priority?: boolean;
  size?: "small" | "medium" | "large";
}

function getItemTitle(item: MediaItem | Movie | TVShow): string {
  if ("title" in item) return (item as Movie).title || "Untitled";
  if ("name" in item) return (item as TVShow).name || "Untitled";
  return "Untitled";
}

function getItemDate(item: MediaItem | Movie | TVShow): string {
  if ("release_date" in item) return (item as Movie).release_date || "";
  if ("first_air_date" in item) return (item as TVShow).first_air_date || "";
  return "";
}

function getMediaType(item: MediaItem | Movie | TVShow): string {
  if ("media_type" in item && item.media_type) return item.media_type;
  if ("title" in item) return "movie";
  if ("name" in item) return "tv";
  return "movie";
}

function getLinkHref(item: MediaItem | Movie | TVShow): string {
  const mediaType = getMediaType(item);
  return `/${mediaType}/${item.id}`;
}

const sizeClasses = {
  small: "w-[130px] md:w-[160px]",
  medium: "w-[180px] md:w-[220px]",
  large: "w-[200px] md:w-[260px]",
};

const heightClasses = {
  small: "h-[195px] md:h-[240px]",
  medium: "h-[270px] md:h-[330px]",
  large: "h-[300px] md:h-[390px]",
};

export default function MovieCard({ item, priority = false, size = "medium" }: MovieCardProps) {
  const title = getItemTitle(item);
  const date = getItemDate(item);
  const year = date ? new Date(date).getFullYear() : "";
  const href = getLinkHref(item);

  return (
    <Link href={href} className="block group">
      <motion.div
        whileHover={{ scale: 1.08, zIndex: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`relative ${sizeClasses[size]} ${heightClasses[size]} rounded-md overflow-hidden cursor-pointer flex-shrink-0`}
      >
        {item.poster_path ? (
          <Image
            src={getPosterUrl(item.poster_path, size === "small" ? "w185" : "w342")}
            alt={title}
            fill
            sizes="(max-width: 768px) 160px, 260px"
            className="object-cover transition-transform duration-300"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <span className="text-neutral-500 text-xs text-center px-2">{title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-1.5 mb-1.5">
            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors">
              <Play size={12} fill="black" className="text-black ml-0.5" />
            </button>
            <button
              className="w-7 h-7 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Plus size={12} className="text-white" />
            </button>
            <button
              className="w-7 h-7 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white transition-colors ml-auto"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ChevronDown size={12} className="text-white" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {item.vote_average > 0 && (
              <span className="flex items-center gap-0.5 text-green-400 font-semibold">
                <Star size={10} fill="currentColor" />
                {item.vote_average.toFixed(1)}
              </span>
            )}
            {year && <span className="text-white/70">{year}</span>}
          </div>
        </div>
      </motion.div>

      {size !== "small" && (
        <h3 className="mt-1.5 text-xs md:text-sm text-netflix-light/80 truncate group-hover:text-white transition-colors">
          {title}
        </h3>
      )}
    </Link>
  );
}
