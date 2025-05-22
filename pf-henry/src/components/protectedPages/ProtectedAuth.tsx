"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserDataStore from "@/store";
import { Spinner } from "@heroui/react";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
  const { userData, isHydrated } = useUserDataStore();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    if (userData?.token) {
      const role = userData.user.role;
      const userId = userData.user.id;

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "user") {
        router.push(`/sucursal/${userId}`);
      } else {
        router.push("/");
      }
    } else {
      setChecked(true);
    }
  }, [isHydrated, router, userData]);

  if (!checked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAuth;
