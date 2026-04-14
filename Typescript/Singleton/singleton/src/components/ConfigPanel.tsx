import React from 'react';

import ConfigService from '../services/ConfigService';
import { RestaurantConfig } from '../types/config.types';

interface ConfigPanelProps {
  config: RestaurantConfig;
  backendInstanceId: number;
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px',
    backdropFilter: 'blur(12px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  badge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '20px',
    letterSpacing: '0.5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  row: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
    border: '1px solid var(--border)',
  },
  label: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  instanceBox: {
    marginTop: '16px',
    padding: '12px 14px',
    borderRadius: '8px',
    background: 'var(--accent-glow)',
    border: '1px solid var(--accent)',
    fontSize: '12px',
    color: 'var(--accent-hover)',
    lineHeight: '1.8',
  },
};

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, backendInstanceId }) => {
  const frontendService = ConfigService.getInstance();

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>⚙️ Configuración Global Activa</span>
        <span
          style={{
            ...styles.badge,
            background: config.abierto ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            color: config.abierto ? 'var(--success)' : 'var(--danger)',
          }}
        >
          {config.abierto ? 'ABIERTO' : 'CERRADO'}
        </span>
      </div>

      <div style={styles.grid}>
        <div style={styles.row}>
          <span style={styles.label}>Negocio</span>
          <span style={styles.value}>{config.nombre_negocio}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Moneda</span>
          <span style={styles.value}>{config.moneda}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>IVA</span>
          <span style={styles.value}>{(config.iva * 100).toFixed(0)}%</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Propina por defecto</span>
          <span style={styles.value}>{(config.propina_por_defecto * 100).toFixed(0)}%</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Apertura</span>
          <span style={styles.value}>{config.horario_apertura}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Cierre</span>
          <span style={styles.value}>{config.horario_cierre}</span>
        </div>
      </div>

      <div style={styles.instanceBox}>
        🔒 <strong>Backend Instance ID:</strong> {backendInstanceId}
        <br />
        🔒 <strong>Frontend Instance ID:</strong> {frontendService.getInstanceId()}
        <br />
        <span style={{ opacity: 0.75, fontSize: '11px' }}>
          Ambos IDs son constantes — sin importar cuántas veces se llame al constructor,
          siempre se devuelve la misma instancia Singleton.
        </span>
      </div>
    </div>
  );
};

export default ConfigPanel;
