import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38327915-34951327f1ceffc9b6b1fee95';
const PER_PAGE = 12;

export const fetchImages = async (query, page) => {
  const fetchOptions = {
    url: BASE_URL,
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page,
    },
  };
  const { data } = await axios(fetchOptions);
  return data;
};
