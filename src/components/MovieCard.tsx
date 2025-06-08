import { Movie } from '../types.ts';

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-white rounded shadow p-2">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-bold">{movie.title}</h3>
      <p className="text-sm text-gray-600">{movie.year}</p>
      <p className="text-sm text-yellow-600">⭐ {movie.rating}</p>
    </div>
  );
}

export default MovieCard;