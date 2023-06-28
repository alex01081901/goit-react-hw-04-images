import { useEffect } from 'react';
import { ModalBody, Overlay } from './Modal.styled';

export const Modal = ({ closeModal, modalImageUrl }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBody>
        <img src={modalImageUrl} alt="" />
      </ModalBody>
    </Overlay>
  );
};