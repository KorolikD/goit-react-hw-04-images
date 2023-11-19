import React, { useState } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalImage } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <GalleryItem>
      <GalleryItemImage src={largeImageURL} alt={tags} onClick={toggleModal} />

      <ModalImage
        largeImageURL={largeImageURL}
        tags={tags}
        onClose={toggleModal}
        isModalOpen={isModalOpen}
      />
    </GalleryItem>
  );
};
