import React, { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import '../css/MovieCard.css';

const MovieCard = ({ movie }) => {
  const { toggleFavorite, favorites } = useContext(MovieContext);
  const navigate = useNavigate();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
          <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;