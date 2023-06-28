import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../services/api';
import { Button } from './Button/Button';
import { Container } from './App.styled';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getVisibleImages() {
      setLoader(true);
      const visibleImages = await getImages(searchQuery, page);
      setImages(prev => [...prev, ...visibleImages.hits]);
      setLoader(false);
    }
    if (searchQuery) {
      getVisibleImages();
    }
  }, [searchQuery, page]);

  const handleSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery.trim()) {
      setImages([]);
      setPage(1);
      setSearchQuery(newSearchQuery.trim());
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);

    const { height: cardHeight } = document
      .querySelector('#gallery')
      .firstElementChild.getBoundingClientRect();

    setTimeout(() => {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 500);
  };

  const openModal = modalImageUrl => {
    setModalImageUrl(modalImageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      {showModal && (
        <Modal modalImageUrl={modalImageUrl} closeModal={closeModal} />
      )}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      <Loader visible={loader} />
      {images.length !== 0 && !loader && (
        <Button handleLoadMore={handleLoadMore} />
      )}
    </Container>
  );
};