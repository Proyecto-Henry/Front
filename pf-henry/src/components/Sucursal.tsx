'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductSearchBar } from '@/components/ProductSearchBar';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface SucursalProps {
  productos: Producto[];
}

export default function Sucursal({ productos }: SucursalProps) {
  const [busqueda, setBusqueda] = useState('');
  
  const productosFiltrados = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-5 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sucursal</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ShoppingCart size={24} className="text-gray-700" />
        </button>
      </div>

      <ProductSearchBar 
        value={busqueda}
        onChange={setBusqueda}
      />

      <div className="overflow-x-auto h-[calc(100vh-220px)] bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#3066BE] sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
            {productosFiltrados.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{producto.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{producto.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${producto.precio.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {productosFiltrados.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No se encontraron productos
          </div>
        )}
      </div>
    </div>
  );
}