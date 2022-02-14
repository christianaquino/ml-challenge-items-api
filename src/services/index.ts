import axios from 'axios';

export const search = (searchText: string) => axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchText}`);

export const details = (id: string) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  return axios.get(url);
};

export const description = (id: string) => {
  const url = `https://api.mercadolibre.com/items/${id}/description`;

  return axios.get(url);
};
