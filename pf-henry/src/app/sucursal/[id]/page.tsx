import Sucursal from "@/components/Sucursal";
import UserProtectedPage from "@/components/protectedPages/UserProtectedPage";
interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <UserProtectedPage>
      <Sucursal id={id} />;
    </UserProtectedPage>
  );
}
