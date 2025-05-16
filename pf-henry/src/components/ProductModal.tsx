"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { IProductModalProps } from "@/interfaces/interfaces";

export default function ProductModal({
  producto,
  onClose,
  onAddToCart,
}: IProductModalProps) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    onAddToCart(producto, cantidad);
    onClose();
  };

 return (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      onClick={onClose}
    />

    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-[90vw] max-w-md p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold text-gray-800">{producto.name}</h2>
        <span className="text-2xl font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
          ${parseFloat(producto.price).toFixed(2)}
        </span>
      </div>

      <div className="mb-6">
        <p className={`text-sm font-medium ${producto.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {producto.stock > 0 ? `Disponibles: ${producto.stock} unidades` : 'Agotado'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <label className="text-gray-700 font-medium">Cantidad:</label>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            disabled={cantidad <= 1}
            className="text-gray-600 px-3 py-2 disabled:opacity-50 hover:text-black transition-colors"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min="1"
            max={producto.stock}
            value={cantidad}
            onChange={(e) =>
              setCantidad(
                Math.max(1, Math.min(producto.stock, Number(e.target.value)))
              )
            }
            className="w-16 text-center border-x py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
            disabled={cantidad >= producto.stock}
            className="text-gray-600 px-3 py-2 disabled:opacity-50 hover:text-black transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          Cancelar
        </button>
        <button
          onClick={handleAgregar}
          disabled={producto.stock <= 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  </>
)
}
