import Admin from "@/components/Admin";
import AdminProtectedPage from "@/components/protectedPages/AdminProtectedPage";
function AdminPage() {
     return (
        <AdminProtectedPage>
            <Admin />
        </AdminProtectedPage>
    );
}

export default AdminPage;