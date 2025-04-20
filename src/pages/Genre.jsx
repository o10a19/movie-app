import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre } from '../services/api';
import MovieCard from '../components/MovieCard';
import '../css/Genre.css';

const Genre = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMoviesByGenre(id, currentPage);
        setMovies(prev => currentPage === 1 ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching genre movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id, currentPage]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="genre-page">
      <h1>{decodeURIComponent(name)} Movies</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {!loading && currentPage < totalPages && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Genre;