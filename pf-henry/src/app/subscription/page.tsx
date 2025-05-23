import AdminProtectedPage from "@/components/protectedPages/AdminProtectedPage";
import { StripeWrapper } from "@/components/StripeWrapper";

export default function SubscriptionPage() {
  return (
    <AdminProtectedPage>
      <StripeWrapper />
    </AdminProtectedPage>
  );
}
