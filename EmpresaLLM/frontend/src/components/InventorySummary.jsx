import React from 'react';
import { Package, Layers, AlertCircle, TrendingDown } from 'lucide-react';
import StatCard from './StatCard';

export default function InventorySummary({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Prod."
        value={data.totalProductos}
        icon={<Package size={20} />}
      />
      <StatCard
        title="Unids. Stock"
        value={data.unidadesStock.toLocaleString()}
        icon={<Layers size={20} />}
      />
      <StatCard
        title="Bajo Stock"
        value={data.productosBajoStock}
        icon={<AlertCircle size={20} />}
        isWarning={data.productosBajoStock > 0}
      />
      <StatCard
        title="Desechos"
        value={`$${data.perdidasDesechos}`}
        icon={<TrendingDown size={20} />}
        isWarning={true}
        subtitle="Valor acumulado"
      />
    </div>
  );
}

