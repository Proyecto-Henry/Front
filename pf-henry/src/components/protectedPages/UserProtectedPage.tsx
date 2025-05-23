"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserDataStore from "@/store";
import { Spinner } from "@heroui/react";
// import { toast } from "sonner"
import ChatBot from "@/components/ChatBot";

const UserProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userData, isHydrated } = useUserDataStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    if (!userData?.token || userData.user.role !== "user") {
      router.replace("/");
      return;
    }

    setIsLoading(false);
  }, [userData, isHydrated, router]);

  if (!isHydrated || isLoading) {
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

export default UserProtectedPage;
