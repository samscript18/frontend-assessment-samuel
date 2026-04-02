export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  media_type?: 'movie';
}

export interface TV {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  media_type?: 'tv';
}

export type Content = Movie | TV;

export interface MovieDetail extends Movie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string | null }>;
}

export interface TVDetail extends TV {
  number_of_seasons: number;
  number_of_episodes: number;
  networks: Array<{ id: number; name: string; logo_path: string | null }>;
  genres: Array<{ id: number; name: string }>;
  last_episode_to_air: {
    id: number;
    name: string;
    episode_number: number;
    season_number: number;
    air_date: string;
    overview: string;
  } | null;
}

export interface SearchResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}
