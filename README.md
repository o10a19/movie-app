# Movie App

A React application for browsing and searching movies, built with Vite and The Movie Database (TMDB) API.

## Features

- Browse popular movies
- Search for movies
- View movie details
- Browse movies by genre
- Save favorite movies
- Light/Dark theme support
- Infinite scrolling/Load more functionality

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Get your API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Replace `your_tmdb_api_key_here` in `.env` with your actual TMDB API key

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_TMDB_API_KEY`: Your TMDB API key

## Built With

- React
- Vite
- React Router
- TMDB API

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request
