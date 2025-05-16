import Sucursal from "@/components/Sucursal";

export default function Page({ params }: { params: { id: string } }) {
  return <Sucursal id={params.id} />;
}
