import React from 'react';
import { motion } from 'framer-motion';
import ShippingManager from './components/ShippingManager';

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Strategy Logistics</h1>
          <p className="subtitle">Gestión Dinámica de Transportistas</p>
        </motion.div>
      </header>

      <main>
        <ShippingManager />
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        <p>© 2026 Strategy Design Pattern Implementation - Premium Logistics System</p>
      </footer>
    </div>
  );
};


export default App;
