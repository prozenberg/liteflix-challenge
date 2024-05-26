const fetchMyMovies = async () => {
  const response = await fetch('http://localhost:3000/movies');
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export default fetchMyMovies;
