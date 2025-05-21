import HistorySale from "@/components/HistorySale";
import AdminProtectedPage from "@/components/protectedPages/AdminProtectedPage";
interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return(
    <AdminProtectedPage>
    <HistorySale id={id} />;
    </AdminProtectedPage>
  ) 
    
}
