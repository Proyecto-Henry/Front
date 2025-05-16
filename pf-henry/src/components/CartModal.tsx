'use client';
import { Trash2, Plus, Minus, X } from "lucide-react";
import { ICartModalProps } from "@/interfaces/interfaces";
import { Spinner } from "@heroui/react";

export default function CartModal({
  cart,
  total,
  onClose,
  onRemove,
  onUpdateQuantity,
  onCreateSale,
  isSubmitting,
}: ICartModalProps & { isSubmitting: boolean }) {
  return (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      onClick={onClose}
    />

    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[95vw] max-w-[850px] h-[90vh] md:h-[80vh] flex flex-col overflow-hidden mx-2 sm:mx-0">
      <div className="flex justify-between items-center p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-bold">Carrito de Ventas</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 bg-gray-50 border-b font-medium text-gray-500 uppercase text-xs sm:text-sm">
          <div className="col-span-5 sm:col-span-6">Producto</div>
          <div className="col-span-3 sm:col-span-2 text-center">Cantidad</div>
          <div className="col-span-2 text-right">Precio</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {cart.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">El carrito está vacío</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 items-center hover:bg-gray-50"
              >
                <div className="col-span-5 sm:col-span-6">
                  <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Stock: {item.stock}</p>
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <div className="flex items-center justify-center border rounded max-w-[100px] sm:max-w-[120px] mx-auto">
                    <button
                      className="px-1 sm:px-2 py-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.cantidad - 1)
                      }
                      disabled={item.cantidad <= 1}
                    >
                      <Minus size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <span className="px-2 sm:px-4 py-1 border-x w-8 sm:w-12 text-center text-sm">
                      {item.cantidad}
                    </span>
                    <button
                      className="px-1 sm:px-2 py-1 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.cantidad + 1)
                      }
                      disabled={item.cantidad >= item.stock}
                    >
                      <Plus size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right font-medium text-sm sm:text-base">
                  ${parseFloat(item.price).toFixed(2)}
                </div>

                <div className="col-span-2 text-right">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1 sm:p-2 rounded-full hover:bg-red-50"
                    aria-label="Eliminar producto"
                    title="Eliminar"
                  >
                    <Trash2 size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-base sm:text-lg">
            <span className="block mb-1">Total:</span>
            <span className="text-xl sm:text-2xl">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCreateSale}
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-base sm:text-lg font-medium"
            disabled={cart.length === 0 || isSubmitting}
          >
            Realizar Venta
          </button>
        </div>
      </div>

      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-60">
          <Spinner size="lg" color="primary" />
        </div>
      )}
    </div>
  </>
)
}
