const fetchFeaturedMovie = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20',
  );
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  return data.results[0]; // Select the first movie from the results array
};

export default fetchFeaturedMovie;
