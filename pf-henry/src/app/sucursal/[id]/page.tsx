import Sucursal from "@/components/Sucursal";

export default function Page({ params }: { params: { id: string } }) {
  // const { id } = params;

  return <Sucursal id={params.id} />;
}
