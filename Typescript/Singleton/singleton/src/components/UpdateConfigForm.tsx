import React, { useState } from 'react';

import { RestaurantConfig, UpdateConfigPayload } from '../types/config.types';

interface UpdateConfigFormProps {
  onUpdate: (payload: UpdateConfigPayload) => Promise<void>;
  loading: boolean;
}

const EDITABLE_KEYS: Array<{ key: keyof RestaurantConfig; label: string; type: string }> = [
  { key: 'nombre_negocio', label: 'Nombre del Negocio', type: 'text' },
  { key: 'iva', label: 'IVA (ej: 0.19)', type: 'number' },
  { key: 'propina_por_defecto', label: 'Propina por Defecto (ej: 0.10)', type: 'number' },
  { key: 'horario_apertura', label: 'Horario Apertura (HH:MM)', type: 'text' },
  { key: 'horario_cierre', label: 'Horario Cierre (HH:MM)', type: 'text' },
  { key: 'abierto', label: 'Estado del Restaurante', type: 'boolean' },
];

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
    marginBottom: '20px',
    color: 'var(--text-primary)',
  },
  field: {
    marginBottom: '14px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    fontWeight: 500,
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'var(--accent)',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    marginTop: '4px',
    opacity: 1,
    transition: 'opacity 0.2s',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

const UpdateConfigForm: React.FC<UpdateConfigFormProps> = ({ onUpdate, loading }) => {
  const [selectedKey, setSelectedKey] = useState<keyof RestaurantConfig>('nombre_negocio');
  const [value, setValue] = useState<string>('');

  const selectedField = EDITABLE_KEYS.find((f) => f.key === selectedKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    let parsed: string | number | boolean = value;
    if (selectedField?.type === 'number') parsed = parseFloat(value);
    if (selectedField?.type === 'boolean') parsed = value === 'true';

    await onUpdate({ key: selectedKey, value: parsed });
    setValue('');
  };

  return (
    <div style={styles.card}>
      <p style={styles.title}>✏️ Modificar Singleton</p>
      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Parámetro</label>
          <select
            style={styles.select}
            value={selectedKey}
            onChange={(e) => {
              setSelectedKey(e.target.value as keyof RestaurantConfig);
              setValue('');
            }}
          >
            {EDITABLE_KEYS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Nuevo valor</label>
          {selectedField?.type === 'boolean' ? (
            <select
              style={styles.select}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
              <option value="true">Abierto</option>
              <option value="false">Cerrado</option>
            </select>
          ) : (
            <input
              style={styles.input}
              type={selectedField?.type ?? 'text'}
              placeholder={`Ej: ${selectedField?.type === 'number' ? '0.19' : 'nuevo valor'}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </div>

        <button
          type="submit"
          style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Actualizar Singleton →'}
        </button>
      </form>
    </div>
  );
};

export default UpdateConfigForm;
