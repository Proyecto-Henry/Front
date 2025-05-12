'use client';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { ICartModalProps } from '@/interfaces/interfaces';

export default function CartModal({
  cart,
  total,
  onClose,
  onRemove,
  onUpdateQuantity,
  onCreateSale, 
}: ICartModalProps) {
  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[850px] h-[80vh] flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Carrito de Ventas</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b font-medium text-gray-500 uppercase text-sm">
            <div className="col-span-6">Producto</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-right">Precio</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">El carrito está vacío</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {cart.map(item => (
                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
                  <div className="col-span-6">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center justify-center border rounded max-w-[120px] mx-auto">
                      <button 
                        className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                        onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 border-x w-12 text-center">{item.cantidad}</span>
                      <button 
                        className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                        onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                        disabled={item.cantidad >= item.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-right font-medium">
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                      aria-label="Eliminar producto"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">
              <span className="block mb-1">Total:</span>
              <span className="text-2xl">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCreateSale} 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-lg font-medium"
              disabled={cart.length === 0}
            >
              Realizar Venta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
