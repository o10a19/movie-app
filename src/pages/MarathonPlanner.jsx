import { useState } from 'react';
import { useMarathon } from '../contexts/MarathonContext';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/MarathonPlanner.css';

function MarathonPlanner() {
    const [marathonName, setMarathonName] = useState('');
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [marathonDate, setMarathonDate] = useState('');
    const [selectedMarathon, setSelectedMarathon] = useState(null);
    const { createMarathon, marathons, deleteMarathon } = useMarathon();
    const { favorites } = useMovieContext();

    const calculateRuntime = (movies) => {
        const totalMinutes = movies.reduce((acc, movie) => acc + (parseInt(movie.runtime) || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes, totalMinutes };
    };

    const { hours, minutes } = calculateRuntime(selectedMovies);

    const handleCreateMarathon = () => {
        if (!marathonName || selectedMovies.length === 0 || !marathonDate) return;
        createMarathon(marathonName, selectedMovies, marathonDate);
        setMarathonName('');
        setSelectedMovies([]);
        setMarathonDate('');
    };

    const toggleMovieSelection = (movie) => {
        setSelectedMovies(prev => 
            prev.some(m => m.id === movie.id)
                ? prev.filter(m => m.id !== movie.id)
                : [...prev, movie]
        );
    };

    const handleMarathonClick = (marathon) => {
        setSelectedMarathon(selectedMarathon?.id === marathon.id ? null : marathon);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getBreakSchedule = (movies) => {
        if (!movies || movies.length === 0) return [];
        const breaks = [];
        let currentTime = 0;
        
        movies.forEach((movie, index) => {
            currentTime += (parseInt(movie.runtime) || 0);
            if (currentTime >= 180 && index < movies.length - 1) {
                breaks.push(index);
                currentTime = 0;
            }
        });
        
        return breaks;
    };

    return (
        <div className="marathon-planner">
            <div className="marathons-list">
                <h2>Your Movie Marathons</h2>
                <div className="marathon-cards">
                    {marathons.map(marathon => {
                        const { hours, minutes } = calculateRuntime(marathon.movies);
                        return (
                            <div 
                                key={marathon.id} 
                                className={`marathon-card ${selectedMarathon?.id === marathon.id ? 'expanded' : ''}`}
                                onClick={() => handleMarathonClick(marathon)}
                            >
                                <h3>{marathon.name}</h3>
                                <p className="marathon-date">{formatDate(marathon.date)}</p>
                                <p className="marathon-runtime">{hours}h {minutes}m</p>
                                <p>{marathon.movies.length} movies</p>
                                
                                {selectedMarathon?.id === marathon.id && (
                                    <div className="marathon-details">
                                        <h4>Movie Schedule:</h4>
                                        {marathon.movies.map((movie, index) => (
                                            <div key={movie.id}>
                                                <div className="schedule-movie">
                                                    <img 
                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                        alt={movie.title}
                                                    />
                                                    <div>
                                                        <h5>{movie.title}</h5>
                                                        <p>{movie.runtime}m</p>
                                                    </div>
                                                </div>
                                                {getBreakSchedule(marathon.movies).includes(index) && (
                                                    <div className="break-suggestion">
                                                        Suggested Break (30 minutes)
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <button 
                                            className="delete-marathon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteMarathon(marathon.id);
                                                setSelectedMarathon(null);
                                            }}
                                        >
                                            Delete Marathon
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="marathon-creator">
                <h2>Create New Marathon</h2>
                <div className="marathon-form">
                    <input
                        type="text"
                        placeholder="Marathon Name"
                        value={marathonName}
                        onChange={(e) => setMarathonName(e.target.value)}
                        className="marathon-input"
                    />
                    <input
                        type="date"
                        value={marathonDate}
                        onChange={(e) => setMarathonDate(e.target.value)}
                        className="marathon-input"
                    />
                </div>
                
                <div className="runtime-info">
                    <h3>Total Runtime: {hours}h {minutes}m</h3>
                    <p>Selected Movies: {selectedMovies.length}</p>
                </div>

                {selectedMovies.length > 0 && (
                    <div className="selected-movies">
                        <h3>Your Marathon Schedule:</h3>
                        {selectedMovies.map((movie, index) => (
                            <div key={movie.id}>
                                <div className="schedule-movie">
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <div>
                                        <h4>{movie.title}</h4>
                                        <p>{movie.runtime}m</p>
                                    </div>
                                </div>
                                {getBreakSchedule(selectedMovies).includes(index) && (
                                    <div className="break-suggestion">
                                        Suggested Break (30 minutes)
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="movie-selection">
                    <h3>Select from your favorites:</h3>
                    <div className="movies-grid">
                        {favorites.map(movie => (
                            <div 
                                key={movie.id}
                                className={`movie-card ${
                                    selectedMovies.some(m => m.id === movie.id) ? 'selected' : ''
                                }`}
                                onClick={() => toggleMovieSelection(movie)}
                            >
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="movie-info">
                                    <h4>{movie.title}</h4>
                                    <p>{movie.runtime}m</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className="create-marathon"
                    onClick={handleCreateMarathon}
                    disabled={!marathonName || selectedMovies.length === 0 || !marathonDate}
                >
                    Create Marathon
                </button>
            </div>
        </div>
    );
}

export default MarathonPlanner;