import { useEffect, useState } from "react";
import instance from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        // Fetch popular movies
        const response = await instance.get(requests.fetchPopular);
        // console.log(response);
        const movies = response.data.results;
        // console.log(movies);

        // Select a random movie
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (err) {
        setError("Failed to fetch movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  // Truncate function
  const truncate = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str.slice(0, maxLength - 1) + "...";
    }
    return str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie?.title}</h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <p className="banner-overview">{truncate(movie.overview, 150)}</p>
      </div>
    </header>
  );
};

export default Banner;
