import SucursalClientComponent from "@/components/SucursalClientComponent";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SucursalDetailPage({ params }: Props) {
  const { id } = await params;

  return <SucursalClientComponent id={id} />;
}
