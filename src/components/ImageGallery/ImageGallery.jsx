import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery id="gallery">
      <ImageGalleryItem images={images} openModal={openModal} />
    </Gallery>
  );
};