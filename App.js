import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'd2bace3c'; //API key

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );
        if (response.data.Response === 'True') {
          setResults(response.data.Search);
        } else {
          setResults([]);
          setError(response.data.Error);
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      }

      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="app">
      <h1>Search your Movie here</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {results.map((movie) => (
          <li key={movie.imdbID}>
            <div className="movie">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
