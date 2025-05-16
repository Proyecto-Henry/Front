import Sucursal from "@/components/Sucursal";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return <Sucursal id={id} />;
}
