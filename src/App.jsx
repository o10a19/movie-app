import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import Genre from './pages/Genre';
import Genres from './pages/Genres';
import MarathonPlanner from './pages/MarathonPlanner';
import { MovieProvider } from './contexts/MovieContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MarathonProvider } from './contexts/MarathonContext';
import './css/App.css';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <MarathonProvider>
          <div className="app">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/genre/:id/:name" element={<Genre />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/marathon" element={<MarathonPlanner />} />
            </Routes>
          </div>
        </MarathonProvider>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
