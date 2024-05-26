import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import ModalButton from '../modalButton/ModalButton';
import uploadMovie from '../../services/uploadMovieService';
import './AddMovieModal.css';
import attachment from '../../assets/svgs/attachment.svg';

/**
 * Component for adding a new movie through a modal dialog.
 * Allows users to upload a movie file and set its title.
 *
 * @component
 * @param {Object} props - Props for AddMovieModal
 * @param {Function} props.onClose - Function to close the modal
 */
const AddMovieModal = ({ onClose, headerHeight }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState('initial'); // 'initial', 'uploading', 'error', 'success'

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) {
      setUploadState('error');
      console.log(uploadState);
      return;
    }

    setUploadState('uploading');

    try {
      await uploadMovie(file, title);
      setUploadState('success');
    } catch (error) {
      setUploadState('error');
    }
  };

  return (
    <div className="modal-container" style={{ top: `${headerHeight}px` }}>
      <h2>AGREGAR PELÍCULA</h2>
      {uploadState === 'initial' && (
        <>
          <div className="dropzone" {...getRootProps()}>
            <img src={attachment} alt="attachment" />
            <input {...getInputProps()} />
            {file ? file.name : 'AGREGÁ UN ARCHIVO'}
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="TÍTULO"
            className="title-input"
          />
          <div className="button-container">
            <ModalButton
              text="SUBIR PELÍCULA"
              hasBorder
              hasBackground
              onClick={handleUpload}
            ></ModalButton>
            <ModalButton text="SALIR" hasBorder onClick={onClose}></ModalButton>
          </div>
        </>
      )}
      {uploadState === 'uploading' && (
        <div className="uploading">
          <p>Cargando...</p>
          <progress value="40" max="100"></progress>
          <ModalButton
            text="CANCELAR"
            hasBorder
            onClick={setUploadState('initial')}
          ></ModalButton>
        </div>
      )}
      {uploadState === 'error' && (
        <div className="error">
          <p>¡Error! No se pudo cargar la película</p>
          <ModalButton
            text="REINTENTAR"
            hasBorder
            onClick={setUploadState('initial')}
          ></ModalButton>
        </div>
      )}
      {uploadState === 'success' && (
        <div className="success">
          <p>¡Felicitaciones! La película fue correctamente subida</p>
          <ModalButton
            text="IR A HOME"
            hasBorder
            onClick={onClose}
          ></ModalButton>
        </div>
      )}
    </div>
  );
};

AddMovieModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  headerHeight: PropTypes.number.isRequired,
};

export default AddMovieModal;
