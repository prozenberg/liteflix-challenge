import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button component that displays a customizable button with optional icon and border.
 * @param {Object} props - Component props.
 * @param {string} [props.icon] - URL/path of the icon to display in the button.
 * @param {string} props.text - Text to display inside the button.
 * @param {boolean} [props.hasBorder=false] - Whether the button should have a border.
 */
const Button = ({ icon, text, hasBorder }) => {
  return (
    <button className={`custom-button ${hasBorder ? 'bordered' : ''}`}>
      <img src={icon} alt="" className="button-icon" />
      {text}
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
};

export default Button;
