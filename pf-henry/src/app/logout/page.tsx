"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserDataStore from "@/store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const { setUserData } = useUserDataStore();
  const [, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const logout = async () => {
      setIsLoggingOut(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUserData(null);

      toast.success("Sesión cerrada correctamente", { duration: 3000 });
      router.push("/");
    };

    logout();
  }, [router, setUserData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="text-gray-600">Cerrando sesión...</p>
      </div>
    </div>
  );
}
