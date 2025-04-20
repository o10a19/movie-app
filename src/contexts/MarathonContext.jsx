import { createContext, useState, useContext, useEffect } from 'react';

export const MarathonContext = createContext();

export const useMarathon = () => useContext(MarathonContext);

export const MarathonProvider = ({ children }) => {
    const [marathons, setMarathons] = useState(() => {
        const stored = localStorage.getItem('movieMarathons');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('movieMarathons', JSON.stringify(marathons));
    }, [marathons]);

    const createMarathon = (name, movies, date) => {
        const totalRuntime = movies.reduce((acc, movie) => acc + (movie.runtime || 0), 0);
        const newMarathon = {
            id: Date.now(),
            name,
            movies,
            totalRuntime,
            date,
            created: new Date().toISOString()
        };

        setMarathons(prev => [...prev, newMarathon]);
    };

    const deleteMarathon = (id) => {
        setMarathons(prev => prev.filter(m => m.id !== id));
    };

    const updateMarathon = (id, updates) => {
        setMarathons(prev => prev.map(marathon => 
            marathon.id === id ? { ...marathon, ...updates } : marathon
        ));
    };

    return (
        <MarathonContext.Provider value={{ 
            marathons, 
            createMarathon, 
            deleteMarathon,
            updateMarathon
        }}>
            {children}
        </MarathonContext.Provider>
    );
};