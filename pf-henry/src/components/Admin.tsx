"use client";

import { useEffect, useState } from "react";
import SucursalCard from "./Card";
import useUserDataStore from "@/store";
import ProfileUploader from "./ProfileUploader";
import { apiUrl } from "@/services/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ISucursal {
  id: string;
  name: string;
  address: string;
  email: string;
  password: string;
  img_store?: string;
  img_profile?: string;
}

export default function AdminDashboard() {
  const { userData, setSucursales, sucursales } = useUserDataStore();

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function getStoresByAdmin(
    admin_id: string,
    token: string
  ): Promise<ISucursal[]> {
    const res = await fetch(`${apiUrl}/stores/admin/${admin_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al obtener las sucursales");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  }

  const fetchSucursales = async () => {
    if (userData?.user?.id && userData?.token) {
      try {
        const data = await getStoresByAdmin(userData.user.id, userData.token);
        setSucursales(data);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, [userData]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-[#f9f9fd] to-[#4470af] p-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            HOLA {userData?.user?.name}
          </h1>
          <div className="flex flex-col items-center justify-center bg-white/90 rounded-xl shadow-lg p-8 mb-12 w-full max-w-md">
            <div className="flex flex-col items-center gap-4">
              <div className="mb-2">
                <ProfileUploader />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {userData?.user?.email}
                </p>
                <div className="bg-blue-100 px-4 py-2 rounded-full">
                  <p className="text-blue-800 font-medium">
                    Cantidad de Sucursales: {sucursales.length}
                  </p>
                </div>
                  <p onClick={() => router.push("/subscription")}
  className="mt-4 text-blue-600 cursor-pointer hover:underline">Subscripciones</p>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sucursales.length === 0 && !error ? (
                <p className="text-white text-lg text-center col-span-full">
                  No tienes ninguna sucursal registrada aún.
                </p>
              ) : (
                sucursales.map((sucursal) => (
                  <Link
                    href={`/sucursalAdmin/${sucursal.id}`}
                    key={sucursal.id}
                    className="flex flex-col items-center justify-center w-full h-80 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h2 className="text-lg font-semibold">{sucursal.name}</h2>
                    <p className="text-gray-600 text-sm text-center">
                      {sucursal.address}
                    </p>
                  </Link>
                ))
              )}

              <div className="flex flex-col items-center justify-center w-full h-80 p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                <SucursalCard onSucursalCreada={fetchSucursales} />
                <p className="mt-4 text-gray-600 font-semibold text-center">
                  Agregar nueva sucursal
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
