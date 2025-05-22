"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserDataStore from "@/store";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
  const { userData, isHydrated } = useUserDataStore();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    if (userData?.token) {
      toast.warning("Usted ya está logueado.");
      router.back();
      return;
    }

    setChecked(true);
  }, [isHydrated, userData, router]);

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
