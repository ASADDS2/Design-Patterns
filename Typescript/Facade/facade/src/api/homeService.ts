import axios from 'axios';
import { HomeState } from '../types';

const API_URL = 'http://127.0.0.1:8000/control/';

export const homeService = {
  getHistory: async (): Promise<HomeState[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

 
  activateMovieMode: async (): Promise<HomeState> => {
    const response = await axios.post(`${API_URL}movie_mode/`);
    return response.data;
  },

  activateWakeUpMode: async (): Promise<HomeState> => {
    const response = await axios.post(`${API_URL}wake_up/`);
    return response.data;
  }
};
