import { Movie, TVShow, MediaItem, Genre, MovieDetail, TVShowDetail, SeasonDetail, CastMember, Video } from "@/types";
import {
  MOCK_MOVIES,
  MOCK_MOVIE_DETAILS,
  MOCK_MOVIE_CAST,
  MOCK_MOVIE_VIDEOS,
  getMockSimilarMovies,
  getMockMovieRecommendations,
  searchMockMovies,
  discoverMockMovies,
  MOCK_TV_SHOWS,
  MOCK_TV_DETAILS,
  MOCK_TV_SEASONS,
  MOCK_TV_CAST,
  MOCK_TV_VIDEOS,
  MOVIE_GENRES,
  TV_GENRES,
  getMockSimilarTV,
  searchMockMulti,
  discoverMockTV,
  TRENDING_MEDIA,
} from "@/data/mock-data";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const USE_MOCK = !API_KEY || API_KEY === "demo" || API_KEY.length < 10;

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY!);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

function delay(ms: number = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const tmdb = {
  getTrending: async (timeWindow: "day" | "week" = "week"): Promise<{ results: MediaItem[] }> => {
    if (USE_MOCK) { await delay(); return { results: TRENDING_MEDIA }; }
    return fetchFromTMDB<{ results: MediaItem[] }>(`/trending/all/${timeWindow}`);
  },

  getPopularMovies: async (): Promise<{ results: Movie[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_MOVIES }; }
    return fetchFromTMDB<{ results: Movie[] }>("/movie/popular");
  },

  getTopRatedMovies: async (): Promise<{ results: Movie[] }> => {
    if (USE_MOCK) { await delay(); return { results: [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average) }; }
    return fetchFromTMDB<{ results: Movie[] }>("/movie/top_rated");
  },

  getUpcomingMovies: async (): Promise<{ results: Movie[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_MOVIES.slice(10, 20) }; }
    return fetchFromTMDB<{ results: Movie[] }>("/movie/upcoming");
  },

  getNowPlayingMovies: async (): Promise<{ results: Movie[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_MOVIES.slice(5, 15) }; }
    return fetchFromTMDB<{ results: Movie[] }>("/movie/now_playing");
  },

  getPopularTV: async (): Promise<{ results: TVShow[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_TV_SHOWS }; }
    return fetchFromTMDB<{ results: TVShow[] }>("/tv/popular");
  },

  getTopRatedTV: async (): Promise<{ results: TVShow[] }> => {
    if (USE_MOCK) { await delay(); return { results: [...MOCK_TV_SHOWS].sort((a, b) => b.vote_average - a.vote_average) }; }
    return fetchFromTMDB<{ results: TVShow[] }>("/tv/top_rated");
  },

  getOnTheAirTV: async (): Promise<{ results: TVShow[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_TV_SHOWS.slice(0, 6) }; }
    return fetchFromTMDB<{ results: TVShow[] }>("/tv/on_the_air");
  },

  getAiringTodayTV: async (): Promise<{ results: TVShow[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_TV_SHOWS.slice(6, 12) }; }
    return fetchFromTMDB<{ results: TVShow[] }>("/tv/airing_today");
  },

  getMovieDetail: async (id: number): Promise<MovieDetail> => {
    if (USE_MOCK) {
      await delay();
      const detail = MOCK_MOVIE_DETAILS[id];
      if (!detail) throw new Error("Movie not found");
      return detail;
    }
    return fetchFromTMDB<MovieDetail>(`/movie/${id}`);
  },

  getTVShowDetail: async (id: number): Promise<TVShowDetail> => {
    if (USE_MOCK) {
      await delay();
      const detail = MOCK_TV_DETAILS[id];
      if (!detail) throw new Error("TV show not found");
      return detail;
    }
    return fetchFromTMDB<TVShowDetail>(`/tv/${id}`);
  },

  getSeasonDetail: async (tvId: number, seasonNumber: number): Promise<SeasonDetail> => {
    if (USE_MOCK) {
      await delay();
      const key = `${tvId}-${seasonNumber}`;
      const season = MOCK_TV_SEASONS[key];
      if (!season) throw new Error("Season not found");
      return season;
    }
    return fetchFromTMDB<SeasonDetail>(`/tv/${tvId}/season/${seasonNumber}`);
  },

  getMovieCredits: async (id: number): Promise<{ cast: CastMember[] }> => {
    if (USE_MOCK) { await delay(); return { cast: MOCK_MOVIE_CAST[id] || [] }; }
    return fetchFromTMDB<{ cast: CastMember[] }>(`/movie/${id}/credits`);
  },

  getTVCredits: async (id: number): Promise<{ cast: CastMember[] }> => {
    if (USE_MOCK) { await delay(); return { cast: MOCK_TV_CAST[id] || [] }; }
    return fetchFromTMDB<{ cast: CastMember[] }>(`/tv/${id}/credits`);
  },

  getMovieVideos: async (id: number): Promise<{ results: Video[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_MOVIE_VIDEOS[id] || [] }; }
    return fetchFromTMDB<{ results: Video[] }>(`/movie/${id}/videos`);
  },

  getTVVideos: async (id: number): Promise<{ results: Video[] }> => {
    if (USE_MOCK) { await delay(); return { results: MOCK_TV_VIDEOS[id] || [] }; }
    return fetchFromTMDB<{ results: Video[] }>(`/tv/${id}/videos`);
  },

  getSimilarMovies: async (id: number): Promise<{ results: Movie[] }> => {
    if (USE_MOCK) { await delay(); return { results: getMockSimilarMovies(id) }; }
    return fetchFromTMDB<{ results: Movie[] }>(`/movie/${id}/similar`);
  },

  getSimilarTV: async (id: number): Promise<{ results: TVShow[] }> => {
    if (USE_MOCK) { await delay(); return { results: getMockSimilarTV(id) }; }
    return fetchFromTMDB<{ results: TVShow[] }>(`/tv/${id}/similar`);
  },

  getMovieRecommendations: async (id: number): Promise<{ results: Movie[] }> => {
    if (USE_MOCK) { await delay(); return { results: getMockMovieRecommendations(id) }; }
    return fetchFromTMDB<{ results: Movie[] }>(`/movie/${id}/recommendations`);
  },

  getTVRecommendations: async (id: number): Promise<{ results: TVShow[] }> => {
    if (USE_MOCK) { await delay(); return { results: getMockSimilarTV(id).slice(0, 6) }; }
    return fetchFromTMDB<{ results: TVShow[] }>(`/tv/${id}/recommendations`);
  },

  getMovieGenres: async (): Promise<{ genres: Genre[] }> => {
    if (USE_MOCK) { await delay(); return { genres: MOVIE_GENRES }; }
    return fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list");
  },

  getTVGenres: async (): Promise<{ genres: Genre[] }> => {
    if (USE_MOCK) { await delay(); return { genres: TV_GENRES }; }
    return fetchFromTMDB<{ genres: Genre[] }>("/genre/tv/list");
  },

  discoverMovies: async (params: Record<string, string> = {}): Promise<{ results: Movie[]; total_pages: number; total_results: number }> => {
    if (USE_MOCK) {
      await delay();
      const genreId = params.with_genres ? Number(params.with_genres) : undefined;
      const sortBy = params.sort_by || "popularity.desc";
      const page = params.page ? Number(params.page) : 1;
      return discoverMockMovies(genreId, sortBy, page);
    }
    return fetchFromTMDB<{ results: Movie[]; total_pages: number; total_results: number }>(
      "/discover/movie",
      { sort_by: "popularity.desc", ...params }
    );
  },

  discoverTV: async (params: Record<string, string> = {}): Promise<{ results: TVShow[]; total_pages: number; total_results: number }> => {
    if (USE_MOCK) {
      await delay();
      const genreId = params.with_genres ? Number(params.with_genres) : undefined;
      const sortBy = params.sort_by || "popularity.desc";
      const page = params.page ? Number(params.page) : 1;
      return discoverMockTV(genreId, sortBy, page);
    }
    return fetchFromTMDB<{ results: TVShow[]; total_pages: number; total_results: number }>(
      "/discover/tv",
      { sort_by: "popularity.desc", ...params }
    );
  },

  searchMulti: async (query: string, page: number = 1): Promise<{ results: MediaItem[]; total_pages: number; total_results: number }> => {
    if (USE_MOCK) {
      await delay();
      const results = searchMockMulti(query);
      return { results, total_pages: 1, total_results: results.length };
    }
    return fetchFromTMDB<{ results: MediaItem[]; total_pages: number; total_results: number }>(
      "/search/multi",
      { query, page: String(page), include_adult: "false" }
    );
  },

  searchMovies: async (query: string, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    if (USE_MOCK) {
      await delay();
      return { results: searchMockMovies(query), total_pages: 1 };
    }
    return fetchFromTMDB<{ results: Movie[]; total_pages: number }>(
      "/search/movie",
      { query, page: String(page), include_adult: "false" }
    );
  },

  searchTV: async (query: string, page: number = 1): Promise<{ results: TVShow[]; total_pages: number }> => {
    if (USE_MOCK) {
      await delay();
      const lower = query.toLowerCase();
      const results = MOCK_TV_SHOWS.filter(
        (t) => t.name.toLowerCase().includes(lower) || t.overview.toLowerCase().includes(lower)
      );
      return { results, total_pages: 1 };
    }
    return fetchFromTMDB<{ results: TVShow[]; total_pages: number }>(
      "/search/tv",
      { query, page: String(page), include_adult: "false" }
    );
  },

  getTrendingSearches: async (): Promise<{ results: MediaItem[] }> => {
    if (USE_MOCK) { await delay(); return { results: TRENDING_MEDIA.slice(0, 5) }; }
    return fetchFromTMDB<{ results: MediaItem[] }>("/trending/all/day");
  },
} as const;

export function getImageUrl(path: string | null, size: string = "w500"): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: string = "w1280"): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getPosterUrl(path: string | null, size: string = "w342"): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
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
