import React, { useEffect, useState } from 'react';
import { AppWraper } from './App.styled';

import { fetchImagesWithQuery } from 'helpers/api';
import { Searchbar, ImageGallery, Loader, Button } from 'components';

//Обробка помилки
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [randomQueryId, setRandomQueryId] = useState(0);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const imagesOnBoard = 15;

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        // завжди скидуємо помилку (error: false) перед кожним HTTP запитом
        // setError(false);

        const initialImages = await fetchImagesWithQuery(
          query, //запит
          page, // сторінка
          imagesOnBoard // к-сть постів на сторінці
        );

        const { hits, total, totalHits } = initialImages;

        if (total === 0) {
          // setError(true);
          toast.error('За вашим запитом нічого не знайдено.');
        } else {
          setImages(prevState => [...prevState, ...hits]);
          setTotalPages(Math.ceil(totalHits / imagesOnBoard));
        }
      } catch (error) {
        // setError(true);
        toast.error(
          'Упс! Щось пішло не так! Спробуйте перезавантажити сторінку.😉'
        );
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page, randomQueryId]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setRandomQueryId(Date.now());
    setImages([]);
    setPage(1);
    // setError(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppWraper className="gallery">
      <Searchbar onSubmit={handleSearchSubmit} />

      <Toaster position="top-right" reverseOrder={false} />

      {isLoading && <Loader />}

      {images.length > 0 ? (
        <>
          <ImageGallery images={images} />
          {totalPages !== page && <Button onClick={handleLoadMore} />}
        </>
      ) : null}
    </AppWraper>
  );
};
