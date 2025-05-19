import { Image } from "@heroui/react";
import { Plus, Building, Boxes, LineChart } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <section className="max-w-6xl w-full flex flex-col items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full lg:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              BIENVENIDO A <span className="text-[#3066BE]">SafeStock</span>
            </h1>
            <p className="text-[#3c3744] text-xl md:text-2xl max-w-md">
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
            <div className="group border border-[#3c3744] rounded-lg p-4 flex flex-col items-center transition hover:border-[#3066BE] shadow-md hover:shadow-lg cursor-default hover:scale-110">
              <Plus
                size={32}
                className="mb-2 text-[#3c3744] group-hover:text-[#3066BE] transition-colors"
              />
              <p className="font-semibold text-[#3c3744] group-hover:text-[#3066BE] transition-colors text-center text-sm">
                AGREGAR SUCURSALES
              </p>
            </div>

            <div className="group border border-[#3c3744] rounded-lg p-4 flex flex-col items-center transition hover:border-[#3066BE] shadow-md hover:shadow-lg cursor-default hover:scale-110">
              <Building
                size={32}
                className="mb-2 text-[#3c3744] group-hover:text-[#3066BE] transition-colors"
              />
              <p className="font-semibold text-[#3c3744] group-hover:text-[#3066BE] transition-colors text-center text-sm">
                ADMINISTRAR SUCURSALES
              </p>
            </div>

            <div className="group border border-[#3c3744] rounded-lg p-4 flex flex-col items-center transition hover:border-[#3066BE] shadow-md hover:shadow-lg cursor-default hover:scale-110">
              <Boxes
                size={32}
                className="mb-2 text-[#3c3744] group-hover:text-[#3066BE] transition-colors"
              />
              <p className="font-semibold text-[#3c3744] group-hover:text-[#3066BE] transition-colors text-center text-sm">
                GESTIONAR STOCK
              </p>
            </div>

            <div className="group border border-[#3c3744] rounded-lg p-4 flex flex-col items-center transition hover:border-[#3066BE] shadow-md hover:shadow-lg cursor-default hover:scale-110">
              <LineChart
                size={32}
                className="mb-2 text-[#3c3744] group-hover:text-[#3066BE] transition-colors"
              />
              <p className="font-semibold text-[#3c3744] group-hover:text-[#3066BE] transition-colors text-center text-sm">
                CONTROLAR VENTAS
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 text-center space-y-2">
          <p className="text-[#3c3744]">¿No tienes cuenta?</p>
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4">
            <a
              href="/auth"
              className="text-[#3066BE] font-semibold hover:underline"
            >
              Crea una o inicie sesión
            </a>
            <span className="hidden md:block text-[#3c3744]">|</span>
            <a
              href="/auth/superAdmin"
              className="text-[#3066BE] font-semibold hover:underline"
            >
              Iniciar sesión como Super Admin
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
