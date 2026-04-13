import React, { useState, useEffect } from 'react';
import { IDataProvider, LogEntry } from '../patterns/adapter/types';
import { ApiDataAdapter } from '../patterns/adapter/ApiAdapter';
import { MockDataAdapter } from '../patterns/adapter/MockAdapter';

const LogDashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [useApi, setUseApi] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [useExternalLogging, setUseExternalLogging] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>('');

  const [dataProvider, setDataProvider] = useState<IDataProvider>(new MockDataAdapter());

  useEffect(() => {
    if (useApi) {
      setDataProvider(new ApiDataAdapter());
    } else {
      setDataProvider(new MockDataAdapter());
    }
  }, [useApi]);

  const fetchLogs = async () => {
    try {
      const data = await dataProvider.getLogs();
      setLogs(data);
    } catch (error) {
      console.error(error);
      setStatusMsg('Error cargando logs. ¿Está el backend encendido?');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [dataProvider]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dataProvider.postLog(message, useExternalLogging);
      setStatusMsg(`Éxito: ${result.status} usando ${result.adapter}`);
      setMessage('');
      fetchLogs();
    } catch (error) {
      setStatusMsg('Error al enviar el log.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Dashboard de Logs (Patrón Adapter)</h1>
      
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Configuración del Adapter (Frontend)</h3>
        <label>
          <input 
            type="checkbox" 
            checked={useApi} 
            onChange={(e) => setUseApi(e.target.checked)} 
          />
          Usar API de Django (ApiDataAdapter) en lugar de Mock (MockDataAdapter)
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Registrar Nuevo Log</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Mensaje del log"
            required
          />
          <br />
          <label>
            <input 
              type="checkbox" 
              checked={useExternalLogging} 
              onChange={(e) => setUseExternalLogging(e.target.checked)} 
            />
            Usar servicio de logging externo en Backend
          </label>
          <br />
          <button type="submit">Enviar Log</button>
        </form>
        <p><i>{statusMsg}</i></p>
      </div>

      <div>
        <h3>Lista de Logs</h3>
        <ul>
          {logs.map(log => (
            <li key={log.id} style={{ color: log.level === 'error' ? 'red' : 'black' }}>
              [{log.level.toUpperCase()}] {log.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogDashboard;
