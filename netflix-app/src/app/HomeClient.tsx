"use client";

import React, { useState, useEffect } from "react";
import { tmdb } from "@/lib/tmdb";
import HeroBanner from "@/components/movie/HeroBanner";
import ContentRow from "@/components/movie/ContentRow";
import { HeroSkeleton, ContentRowSkeleton } from "@/components/ui/Skeleton";
import { MediaItem, Movie, TVShow, MovieDetail } from "@/types";

interface HomeData {
  heroItem: MovieDetail | MediaItem;
  trending: MediaItem[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  nowPlayingMovies: Movie[];
  popularTV: TVShow[];
  topRatedTV: TVShow[];
  onTheAirTV: TVShow[];
}

export default function HomeClient() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [
          trending,
          popularMovies,
          topRatedMovies,
          upcomingMovies,
          nowPlaying,
          popularTV,
          topRatedTV,
          onTheAir,
        ] = await Promise.all([
          tmdb.getTrending("week"),
          tmdb.getPopularMovies(),
          tmdb.getTopRatedMovies(),
          tmdb.getUpcomingMovies(),
          tmdb.getNowPlayingMovies(),
          tmdb.getPopularTV(),
          tmdb.getTopRatedTV(),
          tmdb.getOnTheAirTV(),
        ]);

        const heroItem = trending.results[0];
        let heroDetail: MovieDetail | MediaItem = heroItem;

        if (heroItem.media_type === "movie") {
          try {
            heroDetail = await tmdb.getMovieDetail(heroItem.id);
          } catch {
            heroDetail = heroItem;
          }
        }

        setData({
          heroItem: heroDetail,
          trending: trending.results.slice(1),
          popularMovies: popularMovies.results,
          topRatedMovies: topRatedMovies.results,
          upcomingMovies: upcomingMovies.results,
          nowPlayingMovies: nowPlaying.results,
          popularTV: popularTV.results,
          topRatedTV: topRatedTV.results,
          onTheAirTV: onTheAir.results,
        });
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-netflix-red text-white rounded hover:bg-netflix-red-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-netflix-dark min-h-screen">
      {loading ? (
        <>
          <HeroSkeleton />
          <div className="-mt-20 relative z-10">
            <ContentRowSkeleton size="medium" />
            <ContentRowSkeleton size="medium" />
            <ContentRowSkeleton size="small" />
            <ContentRowSkeleton size="medium" />
          </div>
        </>
      ) : data ? (
        <>
          <HeroBanner item={data.heroItem} mediaType={"media_type" in data.heroItem ? data.heroItem.media_type || "movie" : "movie"} />

          <div className="relative z-10 -mt-24 md:-mt-32">
            <ContentRow title="Trending Now" items={data.trending} size="medium" />
            <ContentRow title="Popular Movies" items={data.popularMovies} size="medium" />
            <ContentRow title="Top Rated Movies" items={data.topRatedMovies} size="medium" />
            <ContentRow title="Now Playing" items={data.nowPlayingMovies} size="small" />
            <ContentRow title="Upcoming Movies" items={data.upcomingMovies} size="medium" />
            <ContentRow title="Popular TV Shows" items={data.popularTV} size="medium" />
            <ContentRow title="Top Rated TV Shows" items={data.topRatedTV} size="medium" />
            <ContentRow title="On The Air" items={data.onTheAirTV} size="small" />
          </div>
        </>
      ) : null}
    </div>
  );
}
