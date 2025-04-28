"use client";
// import {Button, ButtonGroup} from "@heroui/button";
import { useEffect, useState } from "react";

interface User {
  name: string;
}
function Admin() {
  const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/user");
        if (!response.ok) {
          throw new Error("Error al cargar los datos del usuario");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        const error = err as Error; // afirmación de tipo
        console.log(error.message); // Manejar errores
        // } finally {
        //   setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchUserData();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#f9f9fd] to-[#4470af]">
      <div className="w-full max-w-6xl mx-auto rounded-2xl m-4 overflow-hidden bg-gradient-to-b from-[#f9f9fd] to-[#4470af] p-8 min-h-[500px] shadow-[5px_20px_50px_#00000066]">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {user ? `HOLA ${user.name}` : "Hola, [Admin]"}
        </h1>

        <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 mb-8 relative max-w-2xl mx-auto min-h-[100px]">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            user.email
          </h2>
          <h2 className="text-xl font-semibold text-center text-gray-800">
            user.phone
          </h2>
          <h2 className="text-xl font-semibold text-center text-gray-800">
            user.country
          </h2>
          <button className="absolute right-4 top-4"></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 flex flex-col items-center justify-between min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Sucursal
            </h3>
            <button className="bg-[#1954a8] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Ver detalles
            </button>
          </div>

          <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 flex flex-col items-center justify-between min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Sucursal
            </h3>
            <button className="bg-[#1954a8] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Ver detalles
            </button>
          </div>

          <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 flex flex-col items-center justify-between min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Agregar Sucursal
            </h3>
            <button className="bg-[#1954a8] text-white p-3 rounded-full hover:bg-blue-700 transition">
              {/* <Plus className="w-5 h-5" /> */}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Admin;
