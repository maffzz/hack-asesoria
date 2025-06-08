import MovieCard from './MovieCard';
import { Movie } from '../types';

type Props = {
  movies: Movie[];
  loading: boolean;
};

function MoviesGrid({ movies, loading }: Props) {
  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (movies.length === 0) return <p className="text-center mt-8">No se encontraron resultados</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesGrid;
