import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import '../css/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [id]);

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.id}/${encodeURIComponent(genre.name)}`);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <div className="movie-backdrop" style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <div className="backdrop-overlay"></div>
      </div>
      <div className="movie-content">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
          <div className="movie-meta">
            <span>{movie.release_date?.split('-')[0]}</span>
            <span>{movie.runtime} minutes</span>
            <span>{movie.vote_average.toFixed(1)} ⭐</span>
          </div>
          <h3>Overview</h3>
          <p className="overview">{movie.overview}</p>
          <div className="genres">
            {movie.genres?.map(genre => (
              <button 
                key={genre.id} 
                className="genre-tag"
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;