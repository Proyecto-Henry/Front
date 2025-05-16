import Sucursal from "@/components/Sucursal";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;

  return <Sucursal id={id} />;
}
