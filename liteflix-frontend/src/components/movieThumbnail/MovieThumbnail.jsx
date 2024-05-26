import { useState } from 'react';
import PropTypes from 'prop-types';
import './MovieThumbnail.css';
import play_circle_icon from '../../assets/svgs/play_circle.svg';
import star from '../../assets/svgs/star.svg';

/**
 * MovieThumbnail component displaying a movie thumbnail with hover effects.
 * @param {Object} props - Component props.
 * @param {Object} props.movie - Movie data.
 * @param {string} props.movie.thumbnail - URL of the movie thumbnail.
 * @param {string} props.movie.title - Title of the movie.
 * @param {string} props.movie.release_date - Release date of the movie.
 * @param {number} props.movie.vote_average - Average vote of the movie.
 */
const MovieThumbnail = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const getYearFromReleaseDate = (date) => {
    return date.split('-')[0]; // Extracts the year from the YYYY-MM-DD format
  };

  return (
    <div className={'movie-thumbnail'} onClick={toggleDetails}>
      <img src={movie.thumbnail} alt={movie.title} />
      <div className="movie-title-and-details">
        <div className={`movie-title ${showDetails ? 'details' : ''}`}>
          <img src={play_circle_icon} alt="Play Icon" />
          <span>{movie.title}</span>
        </div>
        {showDetails && (
          <div className="movie-details">
            <div className="movie-vote-date">
              <div className="movie-vote-icon">
                <img src={star} alt="Star Icon" />
                <span className="movie-vote">{movie.vote_average}</span>
              </div>
              <span className="movie-date">
                {movie.release_date &&
                  getYearFromReleaseDate(movie.release_date)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MovieThumbnail.propTypes = {
  movie: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieThumbnail;
