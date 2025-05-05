"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import SucursalCard from "./Card";
import useUserDataStore from "@/store";
import ProfileUploader from "./ProfileUploader";

interface IAdmin {
  name: string;
  email: string;
  cantsucursales: number;
}

// const userData: IAdmin ={
//   name: "Cristian",
//   email: "cristian@mail.com",
//   cantsucursales: 3
// }

interface ISucursal {
  nombre: string;
  direccion: string;
  email: string;
  password: string;
}

const sucursales: ISucursal[] = [
  // {
  //   nombre: "sucursal buenos aires",
  //   direccion: "Calle Falsa 123",
  //   email: "cristian@example.com",
  //   password: "password123"
  // },
  // {
  //   nombre: "sucursal rosario",
  //   direccion: "Av. Libertador 456",
  //   email: "tomas@example.com",
  //   password: "securePass456"
  // },
  // {
  //   nombre: "sucursal colombia",
  //   direccion: "Boulevard Central 789",
  //   email: "elias@example.com",
  //   password: "c4rlos789"
  // }
];

export default function AdminDashboard() {
  // const [userData, setUserData] = useState<IAdmin | null>(null)

  // useEffect(() => {
  //   const fetchDataBranch = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/admin")
  //       const data = await response.json()

  //       if (!response.ok) {
  //         throw new Error(data.message || "Error al obtener datos del admin")
  //       }

  //       setUserData(data)
  //     } catch (error) {
  //       console.error("Error en fetchDataBranch:", error)
  //     }
  //   }

  //   fetchDataBranch()
  // }, [])

  const { userData } = useUserDataStore();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-[#f9f9fd] to-[#4470af] p-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            HOLA {userData?.user?.name}{" "}
          </h1>

          {/* <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 mb-12 w-full mx-auto">
      <ProfileUploader />
            <div className="text-center space-y-2">
              <p className="text-lg">{userData?.user.email}</p>
              <p className="text-lg">
                tienes {userData?.cantsucursales} sucursales
              </p>
            </div>
          </div> */}

          <div className="flex flex-col items-center justify-center bg-white/90 rounded-xl shadow-lg p-8 mb-12 w-full max-w-md">
            <div className="flex flex-col items-center gap-4">
              <div className="mb-2">
                <ProfileUploader />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {userData?.user.email}
                </p>
                <div className="bg-blue-100 px-4 py-2 rounded-full">
                  <p className="text-blue-800 font-medium">
                    Tienes {userData?.cantsucursales} sucursales
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {sucursales && sucursales.length > 0 ? (
              <>
                {sucursales.map((card, index) => (
                  <div key={index} className="flex justify-center">
                    <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 w-64">
                      <h3 className="text-lg font-medium text-center mb-8">
                        {card.nombre}
                      </h3>
                      <div className="flex justify-center">
                        <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
                          Ver detalle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center w-80">
                  <SucursalCard />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center w-80">
                  <SucursalCard />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
