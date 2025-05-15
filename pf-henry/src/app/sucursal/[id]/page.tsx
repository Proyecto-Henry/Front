import Sucursal from '@/components/Sucursal';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params; 
  
  return <Sucursal id={id} />;
}