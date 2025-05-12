"use client";
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

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-96 p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{producto.name}</h2>
          <span className="text-2xl font-semibold">
            ${parseFloat(producto.price).toFixed(2)}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Disponibles: {producto.stock}</p>
        </div>

        <div className="flex items-center mb-6">
          <label className="mr-2">Cantidad:</label>
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
            className="border rounded px-3 py-1 w-20"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleAgregar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
}
