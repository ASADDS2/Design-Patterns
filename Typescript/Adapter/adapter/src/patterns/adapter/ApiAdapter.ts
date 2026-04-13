import { IDataProvider, LogEntry } from './types';

export class ApiDataAdapter implements IDataProvider {
  private baseUrl = 'http://localhost:8000/api';

  async getLogs(): Promise<LogEntry[]> {
    console.log('[ApiAdapter] Obteniendo logs de la API Django...');
    const response = await fetch(`${this.baseUrl}/logs/`);
    if (!response.ok) {
      throw new Error('Error al obtener logs de la API');
    }
    return response.json();
  }

  async postLog(message: string, useExternal: boolean): Promise<{ status: string; adapter: string }> {
    console.log('[ApiAdapter] Enviando log a la API Django...');
    const response = await fetch(`${this.baseUrl}/logs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, use_external: useExternal }),
    });
    if (!response.ok) {
      throw new Error('Error al enviar log a la API');
    }
    return response.json();
  }
}
