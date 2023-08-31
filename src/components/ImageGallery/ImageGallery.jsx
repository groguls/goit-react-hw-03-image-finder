import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <ImageGalleryItem url={image} description={image} />
      ))}
    </GalleryList>
  );
};
