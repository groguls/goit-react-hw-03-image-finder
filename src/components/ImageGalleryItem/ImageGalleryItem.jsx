import { Modal } from 'components/Modal/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  modalToggle = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    return (
      <GalleryItem>
        <Image src={webformatURL} alt={tags} onClick={this.modalToggle} />
        {this.state.isModalOpen && (
          <Modal onClose={this.modalToggle}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}
