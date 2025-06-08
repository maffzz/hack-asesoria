import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MoviesGrid from './components/MoviesGrid';
import { Movie } from './types';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); 

  async function searchMovies(query: string) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://b9ht6qmj-8000.brs.devtunnels.ms/docs/api/movies?search=${query}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error en la búsqueda');

      const data: Movie[] = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SearchBar onSearch={searchMovies} />
      <MoviesGrid movies={movies} loading={loading} />
    </div>
  );
}

export default App;
