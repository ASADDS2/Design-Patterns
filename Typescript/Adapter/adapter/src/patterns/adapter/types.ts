export interface LogEntry {
  id: number;
  message: string;
  level: 'info' | 'error';
}

export interface IDataProvider {
  getLogs(): Promise<LogEntry[]>;
  postLog(message: string, useExternal: boolean): Promise<{ status: string; adapter: string }>;
}
