import { useState } from 'react';
import PropTypes from 'prop-types';
import AddMovieModal from '../addMovieModal/AddMovieModal';
import './menu.css';

/**
 * Menu component that displays a list of navigation options.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.headerHeight - The dynamic height of the header, used to correctly position the menu.
 */
const Menu = ({ headerHeight }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <div className={`menu`} style={{ top: `${headerHeight}px` }}>
      <ul className="menu-options">
        <li>Inicio</li>
        <li>Series</li>
        <li>Películas</li>
        <li>Agregadas Recientemente</li>
        <li>Populares</li>
        <li>Mis Películas</li>
        <li>Mi Lista</li>
        <li className="add-movie" onClick={toggleModal}>
          + Agregar Película
        </li>
        <li>Cerrar Sesión</li>
        {isModalOpen && (
          <AddMovieModal onClose={toggleModal} headerHeight={headerHeight} />
        )}
      </ul>
    </div>
  );
};

Menu.propTypes = {
  headerHeight: PropTypes.number.isRequired,
};

export default Menu;
