import React, { useState, useEffect } from 'react';
import './CoffeeOrder.css';
import { coffeeService } from '../api/coffeService';
import { ExtraIngredient } from '../types';

const CoffeeOrder: React.FC = () => {
  const [selectedExtras, setSelectedExtras] = useState<ExtraIngredient[]>([]);
  const [display, setDisplay] = useState({ desc: 'Cargando...', cost: 0 });
  const [loading, setLoading] = useState(false);

  // Sincronización en tiempo real con el Patrón Decorator del Backend
  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true);
      try {
        const data = await coffeeService.previewCoffee(selectedExtras);
        setDisplay({ desc: data.description, cost: data.total_cost });
      } catch (error) {
        console.error("Error al sincronizar con el backend:", error);
        setDisplay({ desc: 'Error de conexión', cost: 0 });
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
        fetchPreview();
    }, 300); // Debounce para no saturar el servidor

    return () => clearTimeout(timeoutId);
  }, [selectedExtras]);

  const toggleExtra = (extra: ExtraIngredient) => {
    setSelectedExtras(prev => 
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const handleSaveOrder = async () => {
    if (window.confirm("¿Confirmar pedido y guardar en base de datos?")) {
      try {
        setLoading(true);
        await coffeeService.orderCoffee(selectedExtras);
        alert("¡Pedido Guardado con éxito!");
        setSelectedExtras([]); // Reinicia la orden
      } catch (error) {
        alert("Error al guardar el pedido");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="cp-container">
      <h2 className="cp-title">SYSTEM: REMOTE DECORATOR</h2>
      
      <div className="cp-button-group">
        {(['milk', 'sugar', 'vanilla'] as ExtraIngredient[]).map((ing) => (
          <button 
            key={ing}
            className={`cp-button ${selectedExtras.includes(ing) ? 'active' : ''}`}
            onClick={() => toggleExtra(ing)}
            disabled={loading}
          >
            {selectedExtras.includes(ing) ? `- ${ing.toUpperCase()}` : `+ ${ing.toUpperCase()}`}
          </button>
        ))}
      </div>

      <div className="cp-order-card">
        <h3 className="cp-subtitle">
            SERVER_STATUS: {loading ? 'FETCHING_LOGIC...' : 'STABLE'}
        </h3>
        <div className="cp-detail">
          <span>DESCRIPCIÓN (CALCULADA POR BACKEND):</span>
          <p>{display.desc}</p>
        </div>
        <div className="cp-detail">
          <span>COSTO TOTAL (SERVER):</span>
          <p className="cp-price">${display.cost.toFixed(2)}</p>
        </div>
        
        <button 
          className="save-btn" 
          onClick={handleSaveOrder} 
          disabled={loading || selectedExtras.length === 0}
        >
          CONFIRMAR Y GUARDAR PEDIDO
        </button>
      </div>
    </div>
  );
};

export default CoffeeOrder;
