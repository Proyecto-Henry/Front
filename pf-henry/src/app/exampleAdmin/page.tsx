import dataMock, { Isucursal } from "@/utils/dataMock";
import { Image } from "@heroui/react";
import Link from "next/link";
// Opcional pero recomendado para optimización
import React from "react";

function SucursalPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] flex-wrap items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] md:flex-row">
      <main className="flex flex-row flex-wrap gap-8 row-start-2 items-center justify-center sm:items-start">
        {dataMock?.map((sucursal: Isucursal) => (
          <Link
            href={`/sucursalAdmin/${sucursal.id}`}
            key={sucursal.id}
            className="flex flex-col items-center justify-center w-64 h-80 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-relative relative mb-4">
              <Image
                src={sucursal.img_store}
                alt={sucursal.name}
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold">{sucursal.name}</h2>
            <p className="text-gray-600 text-sm text-center">
              {sucursal.address}
            </p>
          </Link>
        ))}
      </main>
    </div>
  );
}

export default SucursalPage;
