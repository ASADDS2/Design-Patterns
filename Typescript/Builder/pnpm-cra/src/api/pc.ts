import axios from 'axios';
import { IPC } from '../types/pc';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/pc-builder',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pcApi = {
  buildCustomPc: async (pcData: IPC) => {
    try {
      const response = await api.post('/build/', {
        ...pcData,
        type: 'custom'
      });
      return response.data;
    } catch (error) {
      console.error('Error building custom PC:', error);
      throw error;
    }
  },

  buildPredefinedPc: async (type: 'gaming' | 'office') => {
    try {
      const response = await api.post('/build/', { type });
      return response.data;
    } catch (error) {
      console.error('Error building predefined PC:', error);
      throw error;
    }
  }
};
