import React, { useCallback, useEffect, useState } from 'react';

import ChangeLogPanel from './components/ChangeLogPanel';
import ConfigPanel from './components/ConfigPanel';
import UpdateConfigForm from './components/UpdateConfigForm';
import { fetchConfig, fetchLogs, updateConfig } from './services/api';
import ConfigService from './services/ConfigService';
import { ChangeLogEntry, RestaurantConfig, UpdateConfigPayload } from './types/config.types';

import './App.css';

const App: React.FC = () => {
  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  const [backendInstanceId, setBackendInstanceId] = useState<number>(0);
  const [logs, setLogs] = useState<ChangeLogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const configService = ConfigService.getInstance();

  const loadData = useCallback(async () => {
    try {
      const [configRes, logsRes] = await Promise.all([fetchConfig(), fetchLogs()]);
      setConfig(configRes.config);
      setBackendInstanceId(configRes.instance_id);
      setLogs(logsRes);
      configService.setConfig(configRes.config);
      setError(null);
    } catch {
      setError('No se pudo conectar al backend. ¿Está corriendo en http://localhost:8000?');
    }
  }, [configService]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdate = async (payload: UpdateConfigPayload): Promise<void> => {
    setLoading(true);
    try {
      const res = await updateConfig(payload);
      setConfig(res.config);
      setBackendInstanceId(res.instance_id);
      configService.updateField(payload.key, res.config[payload.key]);
      const logsRes = await fetchLogs();
      setLogs(logsRes);
      setError(null);
    } catch {
      setError('Error al actualizar la configuración.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #111827 60%, #0f172a 100%)',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '30px',
              fontWeight: 700,
              color: '#f1f5f9',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            🍽️ Gestor de Configuración — Restaurante
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Patrón <strong style={{ color: '#818cf8' }}>Singleton</strong> ·{' '}
            Backend Django + Frontend React/TypeScript
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            style={{
              padding: '14px 18px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid #ef4444',
              borderRadius: '10px',
              color: '#ef4444',
              marginBottom: '24px',
              fontSize: '14px',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Loading state */}
        {!config && !error && (
          <p style={{ textAlign: 'center', color: '#64748b', marginTop: '80px', fontSize: '15px' }}>
            Cargando configuración del Singleton...
          </p>
        )}

        {/* Main content */}
        {config && (
          <>
            {/* Top grid: Config panel + Update form */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <ConfigPanel config={config} backendInstanceId={backendInstanceId} />
              <UpdateConfigForm onUpdate={handleUpdate} loading={loading} />
            </div>

            {/* Bottom: Change log */}
            <ChangeLogPanel logs={logs} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
