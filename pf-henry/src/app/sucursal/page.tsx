import Sucursal from "@/components/Sucursal";

export default function SucursalPage() {
  const productos = [
    { id: 1, nombre: "Manzana", precio: 12.5, stock: 50 },
    { id: 2, nombre: "Leche entera", precio: 23.0, stock: 30 },
    { id: 3, nombre: "Pan integral", precio: 34.0, stock: 20 },
    { id: 4, nombre: "Huevos blancos", precio: 45.0, stock: 70 },
    { id: 5, nombre: "Arroz blanco", precio: 56.0, stock: 60 },
    { id: 6, nombre: "Fideos largos", precio: 28.5, stock: 40 },
    { id: 7, nombre: "Aceite de girasol", precio: 89.0, stock: 25 },
    { id: 8, nombre: "Azúcar blanca", precio: 42.0, stock: 35 },
    { id: 9, nombre: "Sal fina", precio: 18.0, stock: 55 },
    { id: 10, nombre: "Harina 0000", precio: 37.0, stock: 45 },
    { id: 11, nombre: "Yogur natural", precio: 31.5, stock: 30 },
    { id: 12, nombre: "Queso cremoso", precio: 120.0, stock: 15 },
    { id: 13, nombre: "Jabón líquido", precio: 65.0, stock: 20 },
    { id: 14, nombre: "Papel higiénico", precio: 75.0, stock: 25 },
    { id: 15, nombre: "Café molido", precio: 150.0, stock: 18 },
    { id: 16, nombre: "Galletas de agua", precio: 32.0, stock: 40 },
    { id: 17, nombre: "Mermelada de frutilla", precio: 48.0, stock: 22 },
    { id: 18, nombre: "Agua mineral", precio: 40.0, stock: 50 },
    { id: 19, nombre: "Chocolate en barra", precio: 55.0, stock: 35 },
    { id: 20, nombre: "Detergente líquido", precio: 85.0, stock: 20 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(254,254,255)] to-[#4470af] pb-8">
      <Sucursal productos={productos} />
    </div>
  );
}
