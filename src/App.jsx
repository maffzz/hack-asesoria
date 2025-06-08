import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { moviesAPI, favoritesAPI } from './services/api';
import MovieCard from './components/MovieCard';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favIds = await favoritesAPI.get();
      setFavorites(favIds);
    } catch (error) {
      console.error('Error cargando favoritas:', error);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await moviesAPI.search(query);
      setMovies(results.movies);
    } catch (error) {
      setError('Error buscando películas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (movieId) => {
    const isFavorite = favorites.includes(movieId);
    try {
      if (isFavorite) {
        await favoritesAPI.remove(movieId);
        setFavorites(favorites.filter((id) => id !== movieId));
      } else {
        await favoritesAPI.add(movieId);
        setFavorites([...favorites, movieId]);
      }
    } catch (error) {
      setError('Error actualizando favoritas');
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>🎬 Catálogo de Películas</h1>
          <nav>
            <Link to="/">Buscar Películas</Link> | <Link to="/favorites">Mis Favoritas</Link>
          </nav>
        </header>

        <Switch>
          <Route exact path="/">
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">Buscando películas...</div>}

            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.includes(movie.id)}
                />
              ))}
            </div>
          </Route>

          <Route path="/favorites">
            <FavoritesList onFavoriteToggle={handleFavoriteToggle} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;