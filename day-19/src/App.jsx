import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState("home"); 
  const [favorites, setFavorites] = useState([]);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const searchMovies = async () => {
    if (!searchTerm) return;

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
    );

    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };
  const toggleFavorite = (movie) => {
  const exists = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  if (exists) {
    setFavorites(
      favorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      )
    );
  } else {
    setFavorites([...favorites, movie]);
  }
};
  return (
  <div>

    <div className="sidebar">
      <h2>CineFinder 🎬</h2>

      <button onClick={() => setPage("home")}>
        🏠 Home
      </button>

      <button onClick={() => setPage("favorites")}>
        ❤️ Favorites
      </button>
    </div>  
      <h1 className="title">
  CineFinder 🎬
</h1>

<p className="subtitle">
  Discover your next favorite movie
</p>
      <div className="search-container">
  <input
    type="text"
    placeholder="Search movies..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <button onClick={searchMovies}>
    Search
  </button>
</div>

      <div className="movies-container">
        {(page === "home"
  ? movies
  : favorites).map((movie) => (
          <div
  key={movie.imdbID}
  className="movie-card"
>
  {movie.Poster !== "N/A" ? (
    <img
  src={movie.Poster}
  alt={movie.Title}
/>
  ) : (
    <div
      style={{
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
      }}
    >
      No Poster Available
    </div>
  )}

  <h3>{movie.Title}</h3>

<p>Year: {movie.Year}</p>

<p>Type: {movie.Type}</p>

<button
  className="favorite-btn"
  onClick={() => toggleFavorite(movie)}
>
  {favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  )
    ? "❤️"
    : "🤍"}
</button>
</div>
        ))}
      </div>
    </div>
    
  );
}

export default App;