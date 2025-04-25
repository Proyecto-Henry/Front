import Image from 'next/image';
import { Plus, Building, Boxes, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <section>

        <div>
          <div>
            <h1>
              BIENVENIDO A <span>SafeStock</span>
            </h1>
            <p>
              Donde puedes gestionar tus sucursales y stock de manera rápida, eficiente y cómoda
            </p>
          </div>

          <div>
            <Image 
              src="/homeImg.png"
              alt="Ilustración gestión de stock"
              width={600}
              height={600}
            />
          </div>
        </div>

        <div>
          <h2>¿Qué puedes hacer?</h2>

          <div>
            <div>
              <Plus size={32} />
              <p>
                AGREGAR SUCURSALES
              </p>
            </div>
            <div>
              <Building size={32} />
              <p>
                ADMINISTRAR SUCURSALES
              </p>
            </div>
            <div>
              <Boxes size={32} />
              <p>
                GESTIONAR STOCK
              </p>
            </div>
            <div>
              <LineChart size={32} />
              <p>
                CONTROLAR VENTAS
              </p>
            </div>
          </div>
        </div>

        <div>
          <p>¿No tienes cuenta?</p>
          <a href="#">
            Crea una gratis o elige el plan premium
          </a>
        </div>

      </section>
    </main>
  );
}
