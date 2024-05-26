import { useState, useEffect } from 'react';
import fetchFeaturedMovie from '../../services/featuredMovieService';
import fetchPopularMovies from '../../services/popularMoviesService';
import fetchMyMovies from '../../services/myMoviesService';
import Header from '../../components/header/Header';
import Dropdown from '../../components/dropdown/Dropdown';
import MovieThumbnail from '../../components/movieThumbnail/MovieThumbnail';
import Button from '../../components/button/Button';
import playIcon from '../../assets/svgs/play.svg';
import plusIcon from '../../assets/svgs/plus.svg';
import './HomePage.css';

const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Populares');
  const movieCategories = ['Populares', 'Mis Películas'];

  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movie = await fetchFeaturedMovie();
        setFeaturedMovie(movie);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    initFetch();
  }, []);

  useEffect(() => {
    const loadPopularMovies = async () => {
      if (!featuredMovie) return;
      setIsLoading(true);
      setError(null);
      try {
        const movies = await fetchPopularMovies(featuredMovie.id);
        setPopularMovies(movies);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    loadPopularMovies();
  }, [featuredMovie]);

  useEffect(() => {
    const loadMyMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const myMoviesData = await fetchMyMovies();
        setMyMovies(myMoviesData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    loadMyMovies();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getImageUrl = (path, size = 'original/') =>
    `https://image.tmdb.org/t/p/${size}${path}`;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!featuredMovie) return <div>No Featured Movie Found</div>;

  return (
    <div>
      <div className="mobile-background">
        <img src={getImageUrl(featuredMovie.poster_path)} />
      </div>
      <div className="gradient-background" />
      <div className="desktop-background">
        <img src={getImageUrl(featuredMovie.backdrop_path)} />
      </div>
      <div className="home-page">
        <Header />
        <div className="featured-movie">
          <div className="movie-details">
            <h2>
              <span className="text-normal">original de </span>
              <span className="text-bold">liteflix</span>
            </h2>
            <h1>{featuredMovie.title}</h1>
            <Button icon={playIcon} text="Reproducir" />
            <Button icon={plusIcon} text="Mi Lista" hasBorder />
          </div>
        </div>
        <div className="sidebar">
          <div className="category-selector">
            <Dropdown
              options={movieCategories}
              selectedOption={selectedCategory}
              onSelect={handleCategoryChange}
            />
          </div>
          <div className="movie-list">
            {(selectedCategory === 'Mis Películas'
              ? myMovies
              : popularMovies
            ).map((movie) => (
              <MovieThumbnail
                key={movie.id}
                movie={{
                  ...movie,
                  thumbnail:
                    selectedCategory === 'Mis Películas'
                      ? movie.image
                      : getImageUrl(movie.poster_path),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
