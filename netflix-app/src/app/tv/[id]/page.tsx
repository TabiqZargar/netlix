"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Share2, Star, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { tmdb, getBackdropUrl, getPosterUrl, formatRating } from "@/lib/tmdb";
import { useLocalStorage } from "@/hooks";
import { TVShowDetail, CastMember, Video, SeasonDetail, TVShow } from "@/types";
import ContentRow from "@/components/movie/ContentRow";
import { DetailSkeleton } from "@/components/ui/Skeleton";

export default function TVShowDetailPage() {
  const params = useParams();
  const tvId = Number(params.id);
  const [show, setShow] = useState<TVShowDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [seasonDetail, setSeasonDetail] = useState<SeasonDetail | null>(null);
  const [loadingSeason, setLoadingSeason] = useState(false);
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);
  const [myList, setMyList] = useLocalStorage<number[]>("netflix-my-list", []);
  const [similarShows, setSimilarShows] = useState<TVShow[]>([]);

  const isInMyList = myList.includes(tvId);

  useEffect(() => {
    async function fetchShow() {
      setLoading(true);
      try {
        const [showData, creditsData, videosData, similarData] = await Promise.all([
          tmdb.getTVShowDetail(tvId),
          tmdb.getTVCredits(tvId),
          tmdb.getTVVideos(tvId),
          tmdb.getSimilarTV(tvId),
        ]);
        setShow(showData);
        setCast(creditsData.cast.slice(0, 12));
        setSimilarShows(similarData.results);
        const trailerVideo = videosData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        ) || videosData.results[0];
        setTrailer(trailerVideo || null);
      } catch (err) {
        console.error("Failed to load TV show:", err);
      } finally {
        setLoading(false);
      }
    }
    if (tvId) fetchShow();
  }, [tvId]);

  useEffect(() => {
    async function fetchSeason() {
      if (!show) return;
      setLoadingSeason(true);
      try {
        const data = await tmdb.getSeasonDetail(tvId, selectedSeason);
        setSeasonDetail(data);
      } catch (err) {
        console.error("Failed to load season:", err);
      } finally {
        setLoadingSeason(false);
      }
    }
    fetchSeason();
  }, [tvId, selectedSeason, show]);

  const toggleMyList = () => {
    if (isInMyList) {
      setMyList((prev) => prev.filter((id) => id !== tvId));
    } else {
      setMyList((prev) => [...prev, tvId]);
    }
  };

  const shareShow = () => {
    if (navigator.share) {
      navigator.share({ title: show?.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) return <DetailSkeleton />;

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Show not found</h2>
          <Link href="/" className="text-netflix-red hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-netflix-dark min-h-screen">
      {/* Backdrop */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        {show.backdrop_path ? (
          <Image
            src={getBackdropUrl(show.backdrop_path, "original")}
            alt={show.name}
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
          {show.poster_path && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block flex-shrink-0"
            >
              <Image
                src={getPosterUrl(show.poster_path, "w500")}
                alt={show.name}
                width={280}
                height={420}
                className="rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {show.name}
            </h1>

            {show.tagline && (
              <p className="text-lg text-netflix-light/60 italic mb-4">
                &ldquo;{show.tagline}&rdquo;
              </p>
            )}

            <div className="flex items-center gap-4 mb-4 flex-wrap text-sm">
              {show.vote_average > 0 && (
                <span className="flex items-center gap-1 text-green-400 font-semibold">
                  <Star size={16} fill="currentColor" />
                  {formatRating(show.vote_average)}
                </span>
              )}
              {show.first_air_date && (
                <span className="flex items-center gap-1 text-white/60">
                  <Calendar size={14} />
                  {new Date(show.first_air_date).getFullYear()}
                </span>
              )}
              <span className="text-white/60">{show.status}</span>
              <span className="text-white/60">
                {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {show.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}?type=tv&name=${encodeURIComponent(genre.name)}`}
                  className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/70 hover:border-white/50 hover:text-white transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            {show.overview && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">Overview</h3>
                <p className="text-netflix-light/70 leading-relaxed">{show.overview}</p>
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
                  isInMyList ? "border-white bg-white/10" : "border-white/50 hover:border-white"
                }`}
              >
                <Plus size={18} className={`text-white ${isInMyList ? "rotate-45" : ""} transition-transform`} />
              </button>

              <button
                onClick={shareShow}
                className="w-11 h-11 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white transition-colors"
              >
                <Share2 size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Seasons & Episodes */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Episodes</h2>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="bg-neutral-800 text-white text-sm px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:border-white/30"
            >
              {show.seasons
                .filter((s) => s.season_number > 0)
                .map((season) => (
                  <option key={season.id} value={season.season_number}>
                    Season {season.season_number}
                  </option>
                ))}
            </select>
          </div>

          {loadingSeason ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton h-20 rounded-lg" />
              ))}
            </div>
          ) : seasonDetail ? (
            <div className="space-y-2">
              {seasonDetail.episodes.map((episode) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-neutral-900/50 border border-white/5 rounded-lg overflow-hidden hover:border-white/10 transition-colors"
                >
                  <button
                    onClick={() =>
                      setExpandedEpisode(
                        expandedEpisode === episode.episode_number
                          ? null
                          : episode.episode_number
                      )
                    }
                    className="w-full flex items-center gap-4 p-4 text-left"
                  >
                    <span className="text-lg font-bold text-white/40 w-8 text-center">
                      {episode.episode_number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">{episode.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        {episode.runtime > 0 && <span>{episode.runtime}m</span>}
                        {episode.vote_average > 0 && (
                          <span className="flex items-center gap-0.5">
                            <Star size={10} fill="currentColor" className="text-green-400" />
                            {episode.vote_average.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    {expandedEpisode === episode.episode_number ? (
                      <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedEpisode === episode.episode_number && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          {episode.still_path && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                              <Image
                                src={getPosterUrl(episode.still_path, "w780")}
                                alt={episode.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <p className="text-sm text-netflix-light/60 leading-relaxed">
                            {episode.overview || "No description available."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : null}
        </motion.section>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-8 md:mt-12">
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
          </section>
        )}

        {/* Similar Shows */}
        {similarShows.length > 0 && (
          <div className="mt-8 md:mt-12">
            <ContentRow title="Similar Shows" items={similarShows} size="medium" />
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
