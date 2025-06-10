import { Image } from "@heroui/react";
import { Plus, Building, Boxes, LineChart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white dark:bg-black text-black dark:text-white transition-colors">
      <section className="max-w-6xl w-full flex flex-col items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full lg:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              BIENVENIDO A{" "}
              <span className="text-[#3066BE] dark:text-blue-400">
                SafeStock
              </span>
            </h1>
            <p className="text-gray-800 dark:text-gray-300 text-xl md:text-2xl max-w-md">
              Donde puedes gestionar tus sucursales y stock de manera rápida,
              eficiente y cómoda
            </p>
          </div>

          <div className="flex justify-center w-full lg:w-1/2 mt-0 lg:mt-0">
            <Image
              src="/homeImg.png"
              alt="Ilustración gestión de stock"
              width={550}
              height={550}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center space-y-6 w-full">
          <h2 className="text-xl font-semibold text-center">
            ¿Qué puedes hacer?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Plus size={32} />, text: "AGREGAR SUCURSALES" },
              { icon: <Building size={32} />, text: "ADMINISTRAR SUCURSALES" },
              { icon: <Boxes size={32} />, text: "GESTIONAR STOCK" },
              { icon: <LineChart size={32} />, text: "CONTROLAR VENTAS" },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                className="group border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex flex-col items-center transition hover:border-[#3066BE] shadow-md hover:shadow-lg cursor-default hover:scale-110"
              >
                <div className="mb-2 text-gray-800 dark:text-gray-300 group-hover:text-[#3066BE] transition-colors">
                  {icon}
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-300 group-hover:text-[#3066BE] transition-colors text-center text-sm">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 text-center">
          <p className="text-gray-800 dark:text-gray-300">¿No tienes cuenta?</p>
          <a
            href="/auth"
            className="text-[#3066BE] dark:text-blue-400 font-semibold hover:underline"
          >
            Crea una o inicie sesión
          </a>
        </div>
      </section>
    </main>
  );
}
