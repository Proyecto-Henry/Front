"use client";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { ProductSearchBar } from "@/components/ProductSearchBar";
import ProductModal from "@/components/ProductModal";
import CartModal from "@/components/CartModal";
import { toast } from "sonner";
import { IProducto, ICartItem } from "@/interfaces/interfaces";
import useUserDataStore from "@/store";
import { apiUrl } from "@/services/config";
import { notFound } from "next/navigation";

interface Props {
  id: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Sucursal({ id }: Props) {
  const { userData, dataUser, setDataUser } = useUserDataStore();
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [sucursalNombre, setSucursalNombre] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProducto | null>(
    null
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSucursal = async () => {
      try {
        const res = await fetch(`${apiUrl}/stores/user/${id}`);
        if (!res.ok) return notFound();
        const data = await res.json();
        setDataUser(data);
        setSucursalNombre(data.name);
        setProductos(data.products);
      } catch (error) {
        console.error("Error al obtener sucursal:", error);
      }
    };

    fetchSucursal();
  }, [id, setDataUser]);

  const addToCart = (producto: IProducto, cantidad: number) => {
    const existingItem = cart.find((item) => item.id === producto.id);
    const totalCantidad = (existingItem?.cantidad || 0) + cantidad;

    if (totalCantidad > producto.stock) {
      toast.error(`No hay suficiente stock`);
      return;
    }

    setCart((prevCart) => {
      return existingItem
        ? prevCart.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: totalCantidad }
              : item
          )
        : [...prevCart, { ...producto, cantidad }];
    });

    toast.success(`Producto agregado con éxito`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info("Producto eliminado del carrito");
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const producto = cart.find((item) => item.id === productId);
    if (!producto) return;

    if (newQuantity > producto.stock) {
      toast.error(
        `No hay suficiente stock. Máximo disponible: ${producto.stock}`
      );
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.cantidad,
    0
  );

  const onCreateSale = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const saleData = {
        date: new Date().toISOString(),
        sale_details: cart.map((item) => ({
          product_id: item.id,
          quantity: item.cantidad,
        })),
        store_id: dataUser?.id,
      };
      console.log(dataUser?.id);
      console.log("SALE DATA", saleData);
      const res = await fetch(`${apiUrl}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify(saleData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al realizar la venta");
      }
      toast.success("Venta realizada con éxito");
      setCart([]);
      setIsCartOpen(false);

      setProductos((prev) =>
        prev.map((p) => {
          const sold = cart.find((i) => i.id === p.id);
          return sold ? { ...p, stock: p.stock - sold.cantidad } : p;
        })
      );
    } catch (error) {
      toast.error("Error al realizar la venta");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.stock > 0 &&
      producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-5 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Sucursal: {sucursalNombre}
        </h1>
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

      <ProductSearchBar value={busqueda} onChange={setBusqueda} />

      <div className="overflow-x-auto h-[calc(100vh-220px)] bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#3066BE] sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
            {productosFiltrados.map((producto, index) => (
              <tr
                key={producto.id}
                className="hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedProduct(producto)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {producto.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  ${parseFloat(producto.price).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {producto.stock}
                </td>
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
          onCreateSale={onCreateSale}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
