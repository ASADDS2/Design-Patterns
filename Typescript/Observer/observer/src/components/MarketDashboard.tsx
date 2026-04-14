import React, { useEffect, useState } from 'react';
import { marketStore, ProductData } from '../services/MarketStore';
import { getProducts, updateProductPrice } from '../services/api';
import { Observer } from '../patterns/Observer';
import { TrendingUp, Package, History, RefreshCcw } from 'lucide-react';

const MarketDashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Definimos este componente como un observador
    const dashboardObserver: Observer = {
      getId: () => 'MainDashboard',
      update: (data: ProductData[]) => {
        setProducts([...data]);
      }
    };

    // 2. Nos suscribimos al store
    marketStore.attach(dashboardObserver);

    // 3. Carga inicial
    getProducts()
      .then(data => {
        marketStore.setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading products:", err);
        setLoading(false);
      });

    // Limpieza al desmontar
    return () => marketStore.detach(dashboardObserver);
  }, []);

  const handlePriceChange = async (id: number) => {
    const newPrice = Math.floor(Math.random() * 1000) + 100;
    try {
      const response = await updateProductPrice(id, newPrice);
      // Al actualizar en el store, todos los observadores recibirán la noticia
      marketStore.updateProduct(response.product);
    } catch (err) {
      alert("Error updating price. Is the backend running?");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-200">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
          Royal Egyptian Trade Hub
        </h1>
        <p className="text-slate-500 italic">Global Observer System - Real-time Commodity Tracking</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map(product => (
          <div key={product.id} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-amber-900/20 hover:border-amber-500/40 transition-all duration-300 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Package size={80} />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              {product.name}
            </h2>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-emerald-400">{product.price}</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">Debens</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <TrendingUp size={12} className="text-emerald-500" />
                <span>Market value fluctuates based on Nile levels</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 uppercase font-bold tracking-tighter">Current Stock</span>
                <span className={`font-mono ${product.stock < 10 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
                  {product.stock} units
                </span>
              </div>

              <button 
                onClick={() => handlePriceChange(product.id)}
                className="w-full bg-gradient-to-br from-amber-500 to-yellow-700 hover:from-amber-400 hover:to-yellow-600 text-slate-950 py-3 rounded-xl font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                Update Price
              </button>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <h3 className="text-xs uppercase text-amber-500/60 font-black mb-4 flex items-center gap-2">
                <History size={14} />
                Transaction History
              </h3>
              <ul className="space-y-3">
                {product.history_logs && product.history_logs.length > 0 ? (
                  product.history_logs.slice(-3).reverse().map((log, i) => (
                    <li key={i} className="flex justify-between items-center bg-slate-800/30 p-2 rounded-lg border border-slate-800/50">
                      <span className="text-emerald-500/80 font-mono text-sm">{log.price_at_moment} DB</span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-700 text-xs italic">No history recorded yet...</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-slate-600">No products found in the desert. Check your connection to the Nile.</p>
        </div>
      )}
    </div>
  );
};

export default MarketDashboard;
