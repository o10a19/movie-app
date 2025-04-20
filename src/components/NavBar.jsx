import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import "../css/Navbar.css";

function NavBar() {
    const { theme, toggleTheme } = useTheme();

    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/genres" className="nav-link">Genres</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <Link to="/marathon" className="nav-link">Marathon</Link>
            <button onClick={toggleTheme} className="theme-toggle">
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>
        </div>
    </nav>
}

export default NavBar;