import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products/';

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateProductPrice = async (id: number, price: number) => {
  const response = await axios.post(`${API_URL}${id}/change_market_data/`, { price });
  return response.data;
};
