import { useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./row.css";

const Row = ({ title, movies }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close trailer if already open
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error("Error finding trailer:", error));
    }
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-image.jpg"
            }
            alt={movie.title || movie.name}
            className="row-poster"
            onClick={() => handleClick(movie)} // Open trailer on click
          />
        ))}
      </div>

      {/* Trailer Modal */}
      {trailerUrl && (
        <div className="trailer-overlay">
          <div className="trailer-container">
            <button className="trailer-close" onClick={() => setTrailerUrl("")}>
              ✖
            </button>
            <YouTube
              videoId={trailerUrl}
              opts={{
                height: "500",
                width: "100%",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
