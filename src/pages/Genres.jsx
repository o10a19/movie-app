import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/api';
import '../css/Genres.css';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Failed to load genres');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="genres-page">
      <h1>Movie Genres</h1>
      <div className="genres-grid">
        {genres.map(genre => (
          <Link 
            to={`/genre/${genre.id}/${encodeURIComponent(genre.name)}`}
            key={genre.id}
            className="genre-card"
          >
            <h2>{genre.name}</h2>
            <div className="genre-overlay">
              <span>Browse Movies</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;