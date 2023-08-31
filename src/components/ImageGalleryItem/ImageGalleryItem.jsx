import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, description }) => {
  return (
    <GalleryItem className="gallery-item">
      <Image src={url} alt={description} />
    </GalleryItem>
  );
};
