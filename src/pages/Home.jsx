import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(currentPage);
        if (data && data.results) {
          setMovies(prev => currentPage === 1 ? data.results : [...prev, ...data.results]);
          setTotalPages(data.total_pages);
          setError(null);
        } else {
          setError("No movies found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    if (!isSearching) {
      loadPopularMovies();
    }
  }, [currentPage, isSearching]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setCurrentPage(1);
    setIsSearching(true);
    
    try {
      const data = await searchMovies(searchQuery, 1);
      if (data && data.results) {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(data.results.length === 0 ? "No movies found" : null);
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      
      try {
        const data = await (isSearching ? 
          searchMovies(searchQuery, nextPage) : 
          getPopularMovies(nextPage)
        );
        if (data && data.results) {
          setMovies(prev => [...prev, ...data.results]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load more movies...");
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
    setMovies([]);
    setLoading(true);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          Search
        </button>
        {isSearching && (
          <button type="button" className="clear-search" onClick={handleClearSearch}>
            Clear Search
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies && movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}
      
      {!loading && movies.length > 0 && currentPage < totalPages && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
