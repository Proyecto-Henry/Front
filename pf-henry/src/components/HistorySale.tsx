"use client";
import { apiUrl } from "@/services/config";
import useUserDataStore from "@/store";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Spinner } from "@heroui/react";

interface SaleDetail {
  quantity: number;
  product: {
    name: string;
    price: string;
  };
}
interface Sale {
  id: string;
  date: string;
  total: string;
  sale_details: SaleDetail[];
}

interface Props {
  id: string;
}

export default function HistorySale({ id }: Props) {
  const { sucursales } = useUserDataStore();
  const sucursal = sucursales.find((item) => item.id === id);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sucursal) return;
    const fetchSales = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/sales/store/${sucursal.id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setSales(data);
        } else {
          setSales([]);
        }
      } catch (error) {
        console.error("Error al obtener ventas:", error);
        setSales([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [id, sucursal]);

  if (!sucursal) return notFound();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Historial de Ventas</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner
            size="lg"
            color="primary"
            className="animate-spin"
            aria-label="Loading..."
          />
        </div>
      ) : Array.isArray(sales) && sales.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas.</p>
      ) : (
        sales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg text-blue-600">
                Venta #{sale.id.slice(0, 8)}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(sale.date).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Total:</strong> ${parseFloat(sale.total).toFixed(2)}
            </p>

            <div>
              <p className="font-medium text-gray-800 mb-2">
                Productos vendidos:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sale.sale_details.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                  >
                    <p className="text-gray-800">
                      <strong>Producto:</strong> {detail.product.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>Cantidad:</strong> {detail.quantity}
                    </p>
                    <p className="text-gray-600">
                      <strong>Precio unitario:</strong> $
                      {parseFloat(detail.product.price).toFixed(2)}
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Total: $
                      {(
                        parseFloat(detail.product.price) * detail.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
