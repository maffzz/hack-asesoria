import React, { useEffect, useState } from 'react';
import { moviesAPI, favoritesAPI } from './services/api';
import MovieCard from './MovieCard';

const FavoritesList = ({ onFavoriteToggle }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
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
      <h2>Películas Favoritas</h2>
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
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.includes(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;