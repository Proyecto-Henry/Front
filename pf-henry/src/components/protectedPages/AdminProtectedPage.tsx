"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useUserDataStore from "@/store";
import { Spinner } from "@heroui/react";
import ChatBot from "@/components/ChatBot";

const AdminProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userData, isHydrated } = useUserDataStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userData?.user && !isHydrated) return;

    const isLocalAdmin = userData?.token && userData?.user.role === "admin";

    if (!isLocalAdmin) {
      router.replace("/");
      return;
    }

    setIsLoading(false);
  }, [userData, isHydrated, router]);

  if (isLoading || !isHydrated || (userData?.user.role && !isHydrated)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {children}
      <ChatBot />
    </>
  );
};

export default AdminProtectedPage;
