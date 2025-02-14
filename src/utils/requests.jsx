const requests = {
  fetchPopular: "/movie/popular",
  fetchTopRated: "/movie/top_rated",
  fetchUpcoming: "/movie/upcoming",
  fetchNowPlaying: "/movie/now_playing",
  fetchActionMovies: "/discover/movie?with_genres=28", // Action genre ID: 28
  fetchComedyMovies: "/discover/movie?with_genres=35", // Comedy genre ID: 35
  fetchHorrorMovies: "/discover/movie?with_genres=27", // Horror genre ID: 27
  fetchRomanceMovies: "/discover/movie?with_genres=10749", // Romance genre ID: 10749
  fetchDocumentaries: "/discover/movie?with_genres=99", // Documentary genre ID: 99
};

export default requests;
