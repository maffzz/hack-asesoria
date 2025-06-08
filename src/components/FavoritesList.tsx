import React, { useEffect, useState } from 'react';
import { favoritesAPI, moviesAPI } from '../services/api';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface FavoritesListProps {
  onFavoriteToggle: (movieId: number) => void;
}

const FavoritesList = ({ onFavoriteToggle }: FavoritesListProps) => {
  const [favorites, setFavorites] = useState<number[]>([]); 
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favIds = await favoritesAPI.get();
        setFavorites(favIds);

        const moviesData = await Promise.all(
          favIds.map((id) => moviesAPI.getDetails(id))
        );
        setFavoriteMovies(moviesData);
      } catch (error) {
        setError('Error cargando favoritas.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return (
    <div>
      <h2>Mis Favoritas</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {favoriteMovies.length === 0 && !loading && (
        <div className="empty-state">
          <h3>No tienes favoritas aún</h3>
          <p>Busca películas y márcalas como favoritas para verlas aquí.</p>
        </div>
      )}

      <div className="movies-grid">
        {favoriteMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <MovieCard movie={movie} />
            <button onClick={() => onFavoriteToggle(movie.id)}>Eliminar de Favoritos</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;