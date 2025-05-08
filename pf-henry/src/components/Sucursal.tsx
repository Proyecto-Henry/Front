'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductSearchBar } from '@/components/ProductSearchBar';
import ProductModal from '@/components/ProductModal';
import CartModal from '@/components/CartModal';
import { toast } from 'sonner';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface CartItem extends Producto {
  cantidad: number;
}

interface SucursalProps {
  productos: Producto[];
}

export default function Sucursal({ productos }: SucursalProps) {
  const [busqueda, setBusqueda] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const productosFiltrados = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const addToCart = (producto: Producto, cantidad: number) => {
    const existingItem = cart.find(item => item.id === producto.id);
    const totalCantidad = (existingItem?.cantidad || 0) + cantidad;

    if (totalCantidad > producto.stock) {
      toast.error(`No hay suficiente stock`);
      return;
    }

    setCart(prevCart => {
      return existingItem
        ? prevCart.map(item => 
            item.id === producto.id 
              ? { ...item, cantidad: totalCantidad } 
              : item
          )
        : [...prevCart, { ...producto, cantidad }];
    });

    toast.success(`Producto agregado con exíto`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.info('Producto eliminado del carrito');
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const producto = cart.find(item => item.id === productId);
    if (!producto) return;
    
    if (newQuantity > producto.stock) {
      toast.error(`No hay suficiente stock. Máximo disponible: ${producto.stock}`);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-5 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sucursal</h1>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={24} className="text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
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
              <tr 
                key={producto.id} 
                className="hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedProduct(producto)}
              >
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

      {selectedProduct && (
        <ProductModal 
          producto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {isCartOpen && (
        <CartModal
          cart={cart}
          total={total}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </div>
  );
}