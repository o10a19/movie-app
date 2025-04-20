import {createContext, useState, useContext, useEffect} from "react"

export const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const storedFavs = localStorage.getItem("favorites")
            return storedFavs ? JSON.parse(storedFavs) : []
        } catch (error) {
            console.error('Error loading favorites:', error)
            return []
        }
    })

    useEffect(() => {
        try {
            if (favorites && Array.isArray(favorites)) {
                localStorage.setItem('favorites', JSON.stringify(favorites))
            }
        } catch (error) {
            console.error('Error saving favorites:', error)
        }
    }, [favorites])

    const addToFavorites = (movie) => {
        if (!movie || !movie.id) return
        setFavorites(prev => {
            // Avoid duplicates
            if (prev.some(m => m.id === movie.id)) return prev
            return [...prev, movie]
        })
    }

    const removeFromFavorites = (movieId) => {
        if (!movieId) return
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites && Array.isArray(favorites) && 
            favorites.some(movie => movie && movie.id === movieId)
    }

    const toggleFavorite = (movie) => {
        if (!movie || !movie.id) return
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id)
        } else {
            addToFavorites(movie)
        }
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}