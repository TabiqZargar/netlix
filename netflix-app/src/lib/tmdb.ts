import { Movie, TVShow, MediaItem, Genre, MovieDetail, TVShowDetail, SeasonDetail, CastMember, Video } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "demo";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const POSTER_sizes = {
  small: "w185",
  medium: "w342",
  large: "w500",
  original: "original",
};
export const BACKDROP_sizes = {
  small: "w300",
  medium: "w780",
  large: "w1280",
  original: "original",
};

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status}`);
  }
  return res.json();
}

export const tmdb = {
  getTrending: (timeWindow: "day" | "week" = "week") =>
    fetchFromTMDB<{ results: MediaItem[] }>(`/trending/all/${timeWindow}`),

  getPopularMovies: () =>
    fetchFromTMDB<{ results: Movie[] }>("/movie/popular"),

  getTopRatedMovies: () =>
    fetchFromTMDB<{ results: Movie[] }>("/movie/top_rated"),

  getUpcomingMovies: () =>
    fetchFromTMDB<{ results: Movie[] }>("/movie/upcoming"),

  getNowPlayingMovies: () =>
    fetchFromTMDB<{ results: Movie[] }>("/movie/now_playing"),

  getPopularTV: () =>
    fetchFromTMDB<{ results: TVShow[] }>("/tv/popular"),

  getTopRatedTV: () =>
    fetchFromTMDB<{ results: TVShow[] }>("/tv/top_rated"),

  getOnTheAirTV: () =>
    fetchFromTMDB<{ results: TVShow[] }>("/tv/on_the_air"),

  getAiringTodayTV: () =>
    fetchFromTMDB<{ results: TVShow[] }>("/tv/airing_today"),

  getMovieDetail: (id: number) =>
    fetchFromTMDB<MovieDetail>(`/movie/${id}`),

  getTVShowDetail: (id: number) =>
    fetchFromTMDB<TVShowDetail>(`/tv/${id}`),

  getSeasonDetail: (tvId: number, seasonNumber: number) =>
    fetchFromTMDB<SeasonDetail>(`/tv/${tvId}/season/${seasonNumber}`),

  getMovieCredits: (id: number) =>
    fetchFromTMDB<{ cast: CastMember[] }>(`/movie/${id}/credits`),

  getTVCredits: (id: number) =>
    fetchFromTMDB<{ cast: CastMember[] }>(`/tv/${id}/credits`),

  getMovieVideos: (id: number) =>
    fetchFromTMDB<{ results: Video[] }>(`/movie/${id}/videos`),

  getTVVideos: (id: number) =>
    fetchFromTMDB<{ results: Video[] }>(`/tv/${id}/videos`),

  getSimilarMovies: (id: number) =>
    fetchFromTMDB<{ results: Movie[] }>(`/movie/${id}/similar`),

  getSimilarTV: (id: number) =>
    fetchFromTMDB<{ results: TVShow[] }>(`/tv/${id}/similar`),

  getMovieRecommendations: (id: number) =>
    fetchFromTMDB<{ results: Movie[] }>(`/movie/${id}/recommendations`),

  getTVRecommendations: (id: number) =>
    fetchFromTMDB<{ results: TVShow[] }>(`/tv/${id}/recommendations`),

  getMovieGenres: () =>
    fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list"),

  getTVGenres: () =>
    fetchFromTMDB<{ genres: Genre[] }>("/genre/tv/list"),

  discoverMovies: (params: Record<string, string> = {}) =>
    fetchFromTMDB<{ results: Movie[]; total_pages: number; total_results: number }>(
      "/discover/movie",
      { sort_by: "popularity.desc", ...params }
    ),

  discoverTV: (params: Record<string, string> = {}) =>
    fetchFromTMDB<{ results: TVShow[]; total_pages: number; total_results: number }>(
      "/discover/tv",
      { sort_by: "popularity.desc", ...params }
    ),

  searchMulti: (query: string, page: number = 1) =>
    fetchFromTMDB<{ results: MediaItem[]; total_pages: number; total_results: number }>(
      "/search/multi",
      { query, page: String(page), include_adult: "false" }
    ),

  searchMovies: (query: string, page: number = 1) =>
    fetchFromTMDB<{ results: Movie[]; total_pages: number }>(
      "/search/movie",
      { query, page: String(page), include_adult: "false" }
    ),

  searchTV: (query: string, page: number = 1) =>
    fetchFromTMDB<{ results: TVShow[]; total_pages: number }>(
      "/search/tv",
      { query, page: String(page), include_adult: "false" }
    ),

  getTrendingSearches: () =>
    fetchFromTMDB<{ results: MediaItem[] }>("/trending/all/day"),
};

export function getImageUrl(
  path: string | null,
  size: string = "w500"
): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: string = "w1280"
): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getPosterUrl(
  path: string | null,
  size: string = "w342"
): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRuntime(minutes: number): string {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getMediaTitle(item: MediaItem | Movie | TVShow | MovieDetail | TVShowDetail): string {
  if ("title" in item) return item.title || "Untitled";
  if ("name" in item) return item.name || "Untitled";
  return "Untitled";
}

export function getMediaDate(item: MediaItem | Movie | TVShow | MovieDetail | TVShowDetail): string {
  if ("release_date" in item) return item.release_date || "";
  if ("first_air_date" in item) return item.first_air_date || "";
  return "";
}

export function getMediaId(item: MediaItem | Movie | TVShow | MovieDetail | TVShowDetail): number {
  return item.id;
}

export function isTVShow(item: MediaItem | Movie | TVShow): item is TVShow {
  return "name" in item && !("title" in item);
}
