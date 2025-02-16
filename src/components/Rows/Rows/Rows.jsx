import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import requests from "../../../utils/requests";
import Row from "../Row/Row";
import "./rows.css";

const Rows = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRows = async () => {
      try {
        // Define all categories and their endpoints
        const categoryConfigs = [
          { title: "Popular", endpoint: requests.fetchPopular },
          { title: "Top Rated", endpoint: requests.fetchTopRated },
          { title: "Action", endpoint: requests.fetchActionMovies },
          { title: "Comedy", endpoint: requests.fetchComedyMovies },
          { title: "Horror", endpoint: requests.fetchHorrorMovies },
          { title: "Romance", endpoint: requests.fetchRomanceMovies },
          { title: "Documentaries", endpoint: requests.fetchDocumentaries },
        ];

        // Fetch all categories in parallel
        const responses = await Promise.all(
          categoryConfigs.map((config) => instance.get(config.endpoint))
        );

        // Map responses to category data
        const categoryData = categoryConfigs.map((config, index) => ({
          title: config.title,
          movies: responses[index].data.results,
        }));

        setCategories(categoryData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRows();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="rows-container">
      {categories.map((category) => (
        <Row
          key={category.title}
          title={category.title}
          movies={category.movies}
        />
      ))}
    </div>
  );
};

export default Rows;
