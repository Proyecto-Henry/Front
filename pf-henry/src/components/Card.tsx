"use client"

import { Plus } from "lucide-react"
import { useState } from "react";
import Modal from "./Modal";

export default function SucursalCard() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // <Card className="bg-gray-200 bg-opacity-80 rounded-xl p-6 w-64"/* className="max-w-[240px] bg-gray-200 bg-opacity-80 shadow-sm" */>
    //   <CardHeader className="text-lg font-medium text-center mb-8">
    //     <h2 className="text-lg font-medium text-center mb-8">Sucursal</h2>
    //   </CardHeader>
    //   <main className="flex items-center justify-center py-6">
    //     <button /* size="sm" */ className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"/* className="h-16 w-12 rounded-full bg-blue-500 hover:bg-blue-600" */
    //       onClick={() => setIsModalOpen(true)}
    //       // className="bg-blue-600 text-white px-4 py-2 rounded"
    //       >
    //       <Plus className="h-6 w-6" />
    //       <span className="sr-only">Añadir sucursal</span>
    //     </button>
    //     <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    //     <form className="flex flex-col gap-4">
    //       <p className="text-black text-[2.3em] flex justify-center mx-auto mt-10 mb-2 font-bold">Crear Sucursal</p>
    //       <input type="text" placeholder="Nombre" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none"/* className="border p-2 rounded" */ />
    //       <input type="address" placeholder="Direcion" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none" />
    //       <input type="email" placeholder="Email" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none" />
    //       <input type="password" placeholder="Contraseña" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none" />
    //       <button type="submit" className="w-[60%] h-[40px] bg-[#4470af] flex justify-center items-center mx-auto px-4 py-2 rounded-[5px] text-white text-[15px] font-bold cursor-pointer border-none outline-none transition ease-in duration-500"/* className="bg-green-600 text-white px-4 py-2 rounded */>
    //        Crear
    //       </button>

    //     </form>
    //   </Modal>
    //   </main>
    // </Card>
    <div className="flex justify-center">
    <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 w-64">
      <h3 className="text-lg font-medium text-center mb-8">Sucursal</h3>
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
         <form className="flex flex-col gap-4">
           <p className="text-black text-[2.3em] flex justify-center mx-auto mt-10 mb-2 font-bold">Crear Sucursal</p>
           <input type="text" placeholder="Nombre" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none"/* className="border p-2 rounded" */ />
           <input type="address" placeholder="Direcion" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none" />
           <input type="email" placeholder="Email" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none" />
           <input type="password" placeholder="Contraseña" className="w-[60%] h-[40px] bg-[#f0f3f974] flex justify-center mx-auto px-4 py-2 rounded-[5px] text-black text-[15px] border-none outline-none" />
           <button type="submit" className="w-[60%] h-[40px] bg-[#4470af] flex justify-center items-center mx-auto px-4 py-2 rounded-[5px] text-white text-[15px] font-bold cursor-pointer border-none outline-none transition ease-in duration-500"/* className="bg-green-600 text-white px-4 py-2 rounded */>
            Crear
           </button>

         </form>
       </Modal>
      </div>
    </div>
  </div>
  )
}