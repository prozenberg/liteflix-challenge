const fetchPopularMovies = async (excludeId) => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20',
  );
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  return data.results.filter((movie) => movie.id !== excludeId).slice(0, 4);
};

export default fetchPopularMovies;
