import Sucursal from "@/components/Sucursal";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <Sucursal id={id} />;
}
