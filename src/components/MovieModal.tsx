import React, { useEffect, useState } from 'react';

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (movieId: number) => void;
}

interface MovieDetails {
  id: number;
  title: string;
  poster: string;
  plot: string;
  director: string;
  actors: string;
  year: number;
  genre: string;
  duration: string;
}

const MovieModal: React.FC<MovieModalProps> = ({
  movieId,
  onClose,
  isFavorite,
  onFavoriteToggle,

}) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://b9ht6qmj-8000.brs.devtunnels.ms/docs/api/movies/${movieId}`
        );
        if (!response.ok) throw new Error('Error al obtener los detalles de la película');
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        setError('Error cargando los detalles.');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return <div className="loading">Cargando detalles...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movieDetails) {
    return <div className="error">Detalles no encontrados.</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">
          X
        </button>
        <img src={movieDetails.poster} alt={movieDetails.title} />
        <h2>{movieDetails.title}</h2>
        <p>{movieDetails.plot}</p>
        <p>
          <strong>Director:</strong> {movieDetails.director}
        </p>
        <p>
          <strong>Actores:</strong> {movieDetails.actors}
        </p>
        <p>
          <strong>Año:</strong> {movieDetails.year}
        </p>
        <p>
          <strong>Género:</strong> {movieDetails.genre}
        </p>
        <p>
          <strong>Duración:</strong> {movieDetails.duration}
        </p>
        <button
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onFavoriteToggle(movieId)}
        >
          {isFavorite ? 'Eliminar de favoritos!' : 'Agregar a favoritos!'}
        </button>
      </div>
    </div>
  );
};


export default MovieModal;