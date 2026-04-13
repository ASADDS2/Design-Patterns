import React, { useState } from 'react';
import { PCBuilder } from '../../lib/patterns/pcBuilder';
import { pcApi } from '../../api/pc';
import { COMPONENTS_OPTIONS, IPC } from '../../types/pc';
import './PCWizard.css';

const builder = new PCBuilder();

const PCWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [pcName, setPcName] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<IPC | null>(null);

  const steps = ["name", "cpu", "gpu", "ram", "storage"];
  const currentField = steps[step];

  const handleSelection = (option: string) => {
    if (currentField === "name") builder.setName(option);
    if (currentField === "cpu") builder.setCPU(option);
    if (currentField === "gpu") builder.setGPU(option);
    if (currentField === "ram") builder.setRAM(option);
    if (currentField === "storage") builder.setStorage(option);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const finalPc = builder.build();
      setResult(finalPc);
      setIsFinished(true);
    }
  };

  const handleSave = async () => {
    if (result) {
      try {
        const savedPc = await pcApi.buildCustomPc(result);
        alert(`¡PC "${savedPc.name}" guardada con éxito!`);
        window.location.reload();
      } catch (err) {
        alert("Error al guardar la configuración.");
      }
    }
  };

  if (isFinished) {
    return (
      <div className="pc-wizard-card finished">
        <div className="success-icon">✅</div>
        <h2>Configuración Finalizada</h2>
        <div className="summary-list">
          <p><strong>Nombre:</strong> {result?.name}</p>
          <p><strong>Procesador:</strong> {result?.cpu}</p>
          <p><strong>Tarjeta Gráfica:</strong> {result?.gpu}</p>
          <p><strong>Memoria RAM:</strong> {result?.ram}</p>
          <p><strong>Almacenamiento:</strong> {result?.storage}</p>
        </div>
        <button className="primary-button" onClick={handleSave}>Enviar al Servidor</button>
        <button className="secondary-button" onClick={() => window.location.reload()}>Empezar de nuevo</button>
      </div>
    );
  }

  return (
    <div className="pc-wizard-card">
      <div className="wizard-progress">
        <div className="progress-fill" style={{ width: `${(step / steps.length) * 100}%` }}></div>
      </div>
      
      <span className="step-count">Paso {step + 1} de {steps.length}</span>
      <h2 className="step-title">Selecciona {currentField.toUpperCase()}</h2>

      {currentField === "name" ? (
        <div className="input-group">
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Ej: My Gaming Beast"
            value={pcName}
            onChange={(e) => setPcName(e.target.value)}
          />
          <button 
            className="primary-button" 
            disabled={!pcName}
            onClick={() => handleSelection(pcName)}
          >
            Siguiente
          </button>
        </div>
      ) : (
        <div className="options-grid">
          {(COMPONENTS_OPTIONS as any)[currentField].map((option: string) => (
            <button key={option} className="option-card" onClick={() => handleSelection(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PCWizard;
