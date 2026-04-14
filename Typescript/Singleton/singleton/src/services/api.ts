import { ChangeLogEntry, ConfigResponse, UpdateConfigPayload } from '../types/config.types';

const BASE_URL = 'http://localhost:8000/api/mgs';

export const fetchConfig = async (): Promise<ConfigResponse> => {
  const response = await fetch(`${BASE_URL}/config/`);
  if (!response.ok) throw new Error('Error al obtener la configuración');
  return response.json();
};

export const updateConfig = async (payload: UpdateConfigPayload): Promise<ConfigResponse> => {
  const response = await fetch(`${BASE_URL}/config/update/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Error al actualizar la configuración');
  return response.json();
};

export const fetchLogs = async (): Promise<ChangeLogEntry[]> => {
  const response = await fetch(`${BASE_URL}/config/logs/`);
  if (!response.ok) throw new Error('Error al obtener los logs');
  return response.json();
};
