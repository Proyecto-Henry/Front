import ChangePlan from "@/components/ChangePlan";
import AdminProtectedPage from "@/components/protectedPages/AdminProtectedPage";
import React from "react";

function ChancePlan() {
  return (
    <AdminProtectedPage>
      <ChangePlan />
    </AdminProtectedPage>
  );
}

export default ChancePlan;
