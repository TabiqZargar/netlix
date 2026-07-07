"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Plus, Share2, Star, Clock, Calendar } from "lucide-react";
import { tmdb, getBackdropUrl, getPosterUrl, formatRuntime, formatRating } from "@/lib/tmdb";
import { useLocalStorage } from "@/hooks";
import { MovieDetail, CastMember, Video, Movie } from "@/types";
import ContentRow from "@/components/movie/ContentRow";
import { DetailSkeleton } from "@/components/ui/Skeleton";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = Number(params.id);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [myList, setMyList] = useLocalStorage<number[]>("netflix-my-list", []);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const isInMyList = myList.includes(movieId);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const [movieData, creditsData, videosData, similarData] = await Promise.all([
          tmdb.getMovieDetail(movieId),
          tmdb.getMovieCredits(movieId),
          tmdb.getMovieVideos(movieId),
          tmdb.getSimilarMovies(movieId),
        ]);
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 12));
        setSimilarMovies(similarData.results);
        const trailerVideo = videosData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        ) || videosData.results[0];
        setTrailer(trailerVideo || null);
      } catch (err) {
        console.error("Failed to load movie:", err);
      } finally {
        setLoading(false);
      }
    }
    if (movieId) fetchMovie();
  }, [movieId]);

  const toggleMyList = () => {
    if (isInMyList) {
      setMyList((prev) => prev.filter((id) => id !== movieId));
    } else {
      setMyList((prev) => [...prev, movieId]);
    }
  };

  const shareMovie = () => {
    if (navigator.share) {
      navigator.share({
        title: movie?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) return <DetailSkeleton />;

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Movie not found</h2>
          <Link href="/" className="text-netflix-red hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-netflix-dark min-h-screen">
      {/* Backdrop */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        {movie.backdrop_path ? (
          <Image
            src={getBackdropUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-dark/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-40 md:-mt-52 px-4 md:px-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster */}
          {movie.poster_path && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block flex-shrink-0"
            >
              <Image
                src={getPosterUrl(movie.poster_path, "w500")}
                alt={movie.title}
                width={280}
                height={420}
                className="rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
          )}

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-lg text-netflix-light/60 italic mb-4">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}

            <div className="flex items-center gap-4 mb-4 flex-wrap text-sm">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 text-green-400 font-semibold">
                  <Star size={16} fill="currentColor" />
                  {formatRating(movie.vote_average)}
                </span>
              )}
              {movie.release_date && (
                <span className="flex items-center gap-1 text-white/60">
                  <Calendar size={14} />
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              {movie.runtime > 0 && (
                <span className="flex items-center gap-1 text-white/60">
                  <Clock size={14} />
                  {formatRuntime(movie.runtime)}
                </span>
              )}
              <span className="text-white/60">{movie.status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}?type=movie&name=${encodeURIComponent(genre.name)}`}
                  className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/70 hover:border-white/50 hover:text-white transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            {movie.overview && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">
                  Overview
                </h3>
                <p className="text-netflix-light/70 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-white/80 transition-colors">
                <Play size={18} fill="black" />
                Play
              </button>

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-md backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <Play size={18} />
                  Trailer
                </button>
              )}

              <button
                onClick={toggleMyList}
                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isInMyList
                    ? "border-white bg-white/10"
                    : "border-white/50 hover:border-white"
                }`}
              >
                <Plus
                  size={18}
                  className={`text-white ${isInMyList ? "rotate-45" : ""} transition-transform`}
                />
              </button>

              <button
                onClick={shareMovie}
                className="w-11 h-11 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white transition-colors"
              >
                <Share2 size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 md:mt-12"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden bg-neutral-800 mb-2">
                    {member.profile_path ? (
                      <Image
                        src={getPosterUrl(member.profile_path, "w185")}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-lg font-semibold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-white font-medium truncate">{member.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{member.character}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="mt-8 md:mt-12">
            <ContentRow title="Similar Movies" items={similarMovies} size="medium" />
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-netflix-red transition-colors"
            >
              &times;
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
