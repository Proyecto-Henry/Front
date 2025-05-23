import Auth from "@/components/Auth";
import ProtectedAuth from "@/components/protectedPages/ProtectedAuth";
function AuthPage() {
  return(
    <ProtectedAuth>

      <Auth />;
    </ProtectedAuth>

  ) 
}

export default AuthPage;
