import axios from "axios";

// Create an Axios instance with default configurations
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // TMDB API base URL
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY, // Use environment variable for API key
  },
});

export default instance;
