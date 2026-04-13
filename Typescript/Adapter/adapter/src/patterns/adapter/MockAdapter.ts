import { IDataProvider, LogEntry } from './types';

export class MockDataAdapter implements IDataProvider {
  private logs: LogEntry[] = [
    { id: 1, message: 'Mock: Aplicación iniciada', level: 'info' },
    { id: 2, message: 'Mock: Error simulado', level: 'error' },
  ];

  async getLogs(): Promise<LogEntry[]> {
    console.log('[MockAdapter] Obteniendo logs locales...');
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.logs), 500);
    });
  }

  async postLog(message: string, useExternal: boolean): Promise<{ status: string; adapter: string }> {
    console.log('[MockAdapter] Registrando log local:', message);
    const newLog: LogEntry = {
      id: this.logs.length + 1,
      message: `Mock: ${message}`,
      level: 'info',
    };
    this.logs.push(newLog);
    return { status: 'Log procesado (Mock)', adapter: 'MockDataAdapter' };
  }
}
