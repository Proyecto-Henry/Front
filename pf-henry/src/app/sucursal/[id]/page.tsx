import Sucursal from '@/components/Sucursal';
import UserProtectedPage from '@/components/protectedPages/UserProtectedPage';

interface Props {
  params: {
    id: string;
  };
}
export default async function Page({ params }: Props) {
  const { id } = params;

  return (
    <UserProtectedPage>
      <Sucursal id={id} />;
    </UserProtectedPage>
  );
}