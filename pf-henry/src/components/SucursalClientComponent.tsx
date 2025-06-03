"use client";
import { useEffect, useState } from "react";
import { CirclePlus, X, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/services/config";
import useUserDataStore from "@/store";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import Link from "next/link";

interface Props {
  id: string;
}
interface IProduct {
  id: string;
  name: string;
  price: number;
  stock_min: number;
  stock: number;
  store_id: string;
  admin_id?: string;
}

export default function SucursalClientComponent({ id }: Props) {
  const router = useRouter();
  const { sucursales, userData } = useUserDataStore();
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const sucursal = sucursales.find((item) => item.id === id);
  const [productos, setProductos] = useState<IProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeletingStore, setIsDeletingStore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });
  useEffect(() => {
    const message = localStorage.getItem("loginSuccessMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("loginSuccessMessage");
    }
  }, []);

  useEffect(() => {
    if (!sucursal) {
      router.push("/admin");
      return;
    }
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/products/${sucursal.id}`);
        const data = await res.json();

        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [id, sucursal, router]);

  if (!sucursal) {
    router.push("/admin");
    return;
  }

  const handleDeleteStore = async () => {
    if (!sucursal) return;
    setIsDeletingStore(true);
    try {
      const res = await fetch(`${apiUrl}/stores/${sucursal.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar la sucursal");
      }

      toast.success("Sucursal eliminada exitosamente");
      setShowDeleteModal(false);
      router.push("/admin");
      const updatedSucursales = sucursales.filter((item) => item.id !== id);
      useUserDataStore.setState({ sucursales: updatedSucursales });
    } catch (error) {
      console.error("Error eliminando sucursal:", error);
      toast.error((error as Error).message);
    } finally {
      setIsDeletingStore(false);
    }
  };

  const handleCreateProduct = async (product: IProduct) => {
    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear el producto");
      }
      toast.success("Producto creado exitosamente");
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  // Crear producto desde formulario
  const handleCreate = async () => {
    setIsCreating(true);
    const nuevoProducto: IProduct = {
      id: " ",
      name: form.nombre,
      price: parseFloat(form.precio),
      stock: parseInt(form.stock),
      stock_min: 8,
      store_id: sucursal.id,
      admin_id: userData?.user.id,
    };

    try {
      const creado = await handleCreateProduct(nuevoProducto);
      setProductos((prev) => [...prev, creado]);
      setForm({ nombre: "", precio: "", stock: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error creando producto:", err);
      toast.error((err as Error).message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (productId: string) => {
    setDeletingId(productId);
    try {
      const res = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }

      setProductos((prev) => prev.filter((p) => p.id !== productId));
      toast.success("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando producto:", error);
      toast.error("Hubo un error al eliminar el producto");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefeff] to-[#4470af] p-8 flex flex-col items-center transition-all duration-300 ease-in-out">
      <div className="text-2xl font-bold mb-6 flex justify-center items-center gap-4 relative group">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 drop-shadow-md">
          {sucursal.name}
        </h1>
        <div className="relative group">
          <CirclePlus
            className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer transition-transform duration-200 transform hover:scale-110"
            onClick={() => setShowModal(true)}
          />
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10">
            Agregar Producto
          </span>
        </div>
      </div>

      <table className="min-w-full bg-blue-600 text-white rounded-md shadow-md overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left bg-blue-700">ID</th>
            <th className="px-4 py-3 text-left bg-blue-700">PRODUCTOS</th>
            <th className="px-4 py-3 text-left bg-blue-700">PRECIO</th>
            <th className="px-4 py-3 text-left bg-blue-700">STOCK</th>
            <th className="px-4 py-3 text-left bg-blue-700">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner size="lg" color="white" />
              </td>
            </tr>
          )}
          {!loading && productos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No hay productos registrados.
              </td>
            </tr>
          )}
          {productos.map((prod, id) => (
            <tr
              key={id}
              className="bg-blue-500 hover:bg-blue-400 transition-colors"
            >
              <td className="px-4 py-2">{id + 1}</td>
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">${prod.price}</td>
              <td className="px-4 py-2">{prod.stock}</td>
              <td className="px-4 py-2">
                <button
                  className="text-white hover:text-red-400 font-bold text-lg transition-transform hover:scale-110"
                  onClick={() => handleDelete(prod.id)}
                  disabled={deletingId === prod.id}
                >
                  {deletingId === prod.id ? (
                    <div className="flex justify-center mt-4">
                      <Spinner size="sm" color="danger" />
                    </div>
                  ) : (
                    <Trash2 />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-200 transition-colors"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5 text-red-600" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
              Agregar Producto
            </h2>

            <input
              type="text"
              placeholder="Nombre producto"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full mb-3 p-3 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Precio"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              className="w-full mb-3 p-3 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full mb-4 p-3 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Crear
            </button>

            {isCreating && (
              <div className="flex justify-center mt-4">
                <Spinner size="lg" color="primary" />
              </div>
            )}
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-200"
              onClick={() => setShowDeleteModal(false)}
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
              ¿Eliminar esta sucursal?
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Esta acción no se puede deshacer. Se eliminarán todos los
              productos asociados.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteStore}
                disabled={isDeletingStore}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeletingStore ? "Eliminando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <Link href={`/sales/store/${sucursal.id}`}>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            <span className="font-bold">Ver Ventas</span>
            <span className="ml-2">💵</span>
          </button>
        </Link>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
        >
          <span className="font-bold">Eliminar Sucursal</span>
          <span className="ml-2">🗑️</span>
        </button>
      </div>
    </div>
  );
}
