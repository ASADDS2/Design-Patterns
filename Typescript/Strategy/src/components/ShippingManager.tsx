import React, { useState, useEffect } from 'react';
import { Truck, Package, Globe, RotateCcw, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { shippingService, type ShippingHistory } from '../services/api';
import { FedExStrategy, UPSStrategy, DHLStrategy, ShippingCalculator, type IShippingStrategy } from '../strategies';

const ShippingManager: React.FC = () => {
  const [weight, setWeight] = useState<number>(1);
  const [distance, setDistance] = useState<number>(10);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('fedex');
  const [history, setHistory] = useState<ShippingHistory[]>([]);
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);


  const strategies: Record<string, IShippingStrategy> = {
    fedex: new FedExStrategy(),
    ups: new UPSStrategy(),
    dhl: new DHLStrategy()
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await shippingService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleCalculate = async () => {
    setCalculating(true);
    try {
      // Backend calculation
      const response = await shippingService.calculate(weight, distance, selectedStrategy);
      setResult(response.cost);
      fetchHistory();
    } catch (error) {
      console.error('Error calculating:', error);
      // Fallback to client-side if backend is off (demonstrating pattern)
      const calculator = new ShippingCalculator(strategies[selectedStrategy]);
      const clientCost = calculator.calculate(weight, distance);
      setResult(clientCost);
    } finally {
      setTimeout(() => setCalculating(false), 800);
    }
  };

  return (
    <div className="grid">
      <motion.div 
        className="card"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calculator className="text-primary" /> Parámetros de Envío
        </h2>
        
        <div className="input-group">
          <label>Peso del Paquete (kg)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(Number(e.target.value))}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label>Distancia (km)</label>
          <input 
            type="number" 
            value={distance} 
            onChange={(e) => setDistance(Number(e.target.value))}
            min="1"
          />
        </div>

        <label>Seleccionar Carrier (Strategy)</label>
        <div className="strategy-grid">
          <div 
            className={`strategy-item ${selectedStrategy === 'fedex' ? 'active' : ''}`}
            onClick={() => setSelectedStrategy('fedex')}
          >
            <Truck size={32} color="#ff6600" />
            <span>FedEx</span>
          </div>
          <div 
            className={`strategy-item ${selectedStrategy === 'ups' ? 'active' : ''}`}
            onClick={() => setSelectedStrategy('ups')}
          >
            <Package size={32} color="#ffcc00" />
            <span>UPS</span>
          </div>
          <div 
            className={`strategy-item ${selectedStrategy === 'dhl' ? 'active' : ''}`}
            onClick={() => setSelectedStrategy('dhl')}
          >
            <Globe size={32} color="#d40511" />
            <span>DHL</span>
          </div>
        </div>

        <button className="btn" onClick={handleCalculate} disabled={calculating}>
          {calculating ? 'Calculando...' : 'Calcular Costo'}
        </button>

        <AnimatePresence>
          {result !== null && (
            <motion.div 
              className="result-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="subtitle" style={{ fontSize: '0.8rem' }}>Costo Estimado ({selectedStrategy.toUpperCase()})</p>
              <div className="result-val">${result.toFixed(2)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="card history-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2><AnimatePresence><motion.span><RotateCcw style={{ verticalAlign: 'middle', marginRight: '10px' }} size={20} /></motion.span></AnimatePresence> Historial de Cálculos</h2>
          <button className="btn" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={fetchHistory}>Actualizar</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Carrier</th>
                <th>Peso</th>
                <th>Distancia</th>
                <th>Costo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td><span className={`badge badge-${item.strategy_used}`}>{item.strategy_used}</span></td>
                  <td>{item.weight} kg</td>
                  <td>{item.distance} km</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${item.calculated_cost.toFixed(2)}</td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>No hay registros disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ShippingManager;
