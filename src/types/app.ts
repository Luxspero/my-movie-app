export interface MovieListProps {
  title: string
  path: string
  coverType: 'poster' | 'backdrop'
}

export interface MovieItemProps {
  movie: Movie
  size: { width: number; height: number }
  coverType: 'poster' | 'backdrop'
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchProps {
  page: number
  results: SearchResult
  total_pages: number
  total_results: number
}

export interface SearchResult {
  id: number
  name: string
}
