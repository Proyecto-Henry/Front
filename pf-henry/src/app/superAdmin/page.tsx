import { SuperAdmin } from '@/components/SuperAdmin';
import SuperAdminProtectedPage from "@/components/protectedPages/SuperAdminProtectedPage";
export default function SuperAdminPage() {
  return(

    <SuperAdminProtectedPage>

      <SuperAdmin />;
    </SuperAdminProtectedPage>
  ) 
    
}