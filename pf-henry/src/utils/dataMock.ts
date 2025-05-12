interface Isucursal {
  id: string;
  name: string;
  address: string;
  img_store: string;
  description?: string; // Campo opcional
}

const dataMock: Isucursal[] = [
  {
    id: "1",
    name: "Sucursal 1",
    address: "Calle 123, Ciudad",
    img_store:
      "https://st.depositphotos.com/1016440/2534/i/450/depositphotos_25344733-stock-photo-sunrise-at-the-beach.jpg",
    description: "Esto es la sucursal 1 con una descripción.",
  },
  {
    id: "2",
    name: "Sucursal 2",
    address: "Avenida 456, Ciudad",
    img_store:
      "https://cdn.pixabay.com/photo/2023/03/16/08/42/camping-7856198_640.jpg",
    description: "Esto es la sucursal 2 con una descripción.",
  },
  {
    id: "3",
    name: "Sucursal 3",
    address: "Boulevard 789, Ciudad",
    img_store:
      "https://img.freepik.com/vector-gratis/ilustracion-simio-estilo-nft-dibujado-mano_23-2149622021.jpg?semt=ais_hybrid&w=740",
    description: "Esto es la sucursal 3 con una descripción.",
  },
];

export default dataMock;
export type { Isucursal };
