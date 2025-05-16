import Sucursal from "@/components/Sucursal";

type Props = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <Sucursal id={id} />;
}
