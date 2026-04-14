import { useState, useEffect } from 'react';
import { homeService } from '../api/homeService';
import { HomeState } from '../types';

export const useHomeControl = () => {
  const [history, setHistory] = useState<HomeState[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const data = await homeService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error("Error cargando historial", error);
    }
  };

  const runScene = async (sceneFunc: () => Promise<HomeState>) => {
    setLoading(true);
    try {
      await sceneFunc();
      await fetchHistory();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { 
    history, 
    loading, 
    activateMovie: () => runScene(homeService.activateMovieMode),
    activateWakeUp: () => runScene(homeService.activateWakeUpMode)
  };
};
