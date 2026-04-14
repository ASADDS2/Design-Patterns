import React from 'react';

import { ChangeLogEntry } from '../types/config.types';

interface ChangeLogPanelProps {
  logs: ChangeLogEntry[];
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px',
    color: 'var(--text-primary)',
  },
  empty: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textAlign: 'center' as const,
    padding: '20px 0',
  },
  entry: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border)',
    marginBottom: '8px',
    gap: '12px',
  },
  keyBadge: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--accent-hover)',
    background: 'var(--accent-glow)',
    padding: '3px 9px',
    borderRadius: '4px',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
  change: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    flex: 1,
  },
  date: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
};

const ChangeLogPanel: React.FC<ChangeLogPanelProps> = ({ logs }) => {
  return (
    <div style={styles.card}>
      <p style={styles.title}>📋 Historial de Cambios en Base de Datos</p>
      {logs.length === 0 ? (
        <p style={styles.empty}>Aún no hay cambios registrados. Modifica un parámetro para comenzar.</p>
      ) : (
        logs.map((log) => (
          <div key={log.id} style={styles.entry}>
            <span style={styles.keyBadge}>{log.key}</span>
            <span style={styles.change}>
              <span style={{ color: 'var(--danger)' }}>{log.old_value || '—'}</span>
              {' → '}
              <span style={{ color: 'var(--success)' }}>{log.new_value}</span>
            </span>
            <span style={styles.date}>
              {new Date(log.changed_at).toLocaleString('es-CO')}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChangeLogPanel;
