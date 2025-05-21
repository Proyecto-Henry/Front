import SucursalClientComponent from "@/components/SucursalClientComponent";
import AdminProtectedPage from "@/components/protectedPages/AdminProtectedPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SucursalDetailPage({ params }: Props) {
  const { id } = await params;
 return (
        <AdminProtectedPage>
            <SucursalClientComponent id={id} />
        </AdminProtectedPage>
    );
  
}
