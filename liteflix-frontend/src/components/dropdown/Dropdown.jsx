import { useState } from 'react';
import PropTypes from 'prop-types';
import down_arrow from '../../assets/svgs/arrow_down.svg';
import checkmark from '../../assets/svgs/checkmark.svg';
import './dropdown.css';

/**
 * Dropdown component for selecting viewing options.
 * @param {Object} props - Component props.
 * @param {Array<string>} props.options - Array of options to display in the dropdown.
 * @param {string} props.selectedOption - Currently selected option.
 * @param {Function} props.onSelect - Callback function to handle option selection.
 */
const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={handleToggle}>
        <span className="text-normal">VER:</span>{' '}
        <span className="text-bold">{selectedOption} </span>
        <img src={down_arrow} />
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <li
            key={option}
            className={option === selectedOption ? 'selected' : ''}
            onClick={() => handleSelect(option)}
          >
            {option}
            {option === selectedOption && (
              <img className="checkmark" src={checkmark}></img>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
