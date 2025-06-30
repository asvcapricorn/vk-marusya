// import { GENRE_MAP } from '@/constants/genres'
// type GenreKey = keyof typeof GENRE_MAP

export interface IMovie {
  id: number
  title: string
  originalTitle: string
  language: string
  releaseYear: number
  releaseDate: string
  genres: string[]
  plot: string
  runtime: number
  budget: number
  revenue?: string
  homepage: string
  status: string
  posterUrl: string
  backdropUrl: string
  trailerUrl: string
  trailerYouTubeId: string
  tmdbRating: number
  searchL: string
  keywords: string[]
  countriesOfOrigin: string[]
  languages: string[]
  cast: string[]
  director: string
  production?: string
  awardsSummary?: string
}
