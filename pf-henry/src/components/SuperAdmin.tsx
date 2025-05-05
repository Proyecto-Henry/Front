"use client";
import { useEffect, useState } from "react";
import { AdminService } from "@/services/adminService";
import { IAdmin } from "@/interfaces/interfaces";
import { UserDataSummary } from "./UserDataSummary";
import { UserSearchBar } from "./UserSearchBar";
import { UserCard } from "./UserCard";
import { Loader2, UserRoundX, SearchX } from "lucide-react";
import { toast } from "sonner";

export const SuperAdmin = () => {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdminService.getAdmins();
        setAdmins(data);
      } catch (err) {
        toast.error("Error al cargar administradores");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id: string) => {
    try {
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, loading: true } : admin
        )
      );

      const { status, message } = await AdminService.toggleStatus(id);

      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, status, loading: false } : admin
        )
      );

      toast.success(message, { position: "top-center" });
    } catch (err) {
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, loading: false } : admin
        )
      );
      toast.error("Error al cambiar estado");
      console.error("Error detallado:", err);
    }
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  const activeCount = admins.filter((a) => a.status === "active").length;

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#fefeff] to-[#4470af]">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ADMINISTRACIÓN
        </h1>
        <UserDataSummary active={activeCount} total={admins.length} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            GESTIÓN DE USUARIOS
          </h2>
          <UserSearchBar value={searchText} onChange={setSearchText} />
        </div>

        <div
          className={`
  ${
    filteredAdmins.length === 1
      ? "flex justify-center"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  } 
  gap-4
`}
        >
          {filteredAdmins.length === 0 ? (
            <div className="col-span-full text-center py-10">
              {admins.length === 0 ? (
                <div className="flex flex-col items-center">
                  <UserRoundX className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-medium text-white">
                    No hay usuarios registrados
                  </h3>
                  <p className="text-white">
                    Comienza agregando nuevos usuarios al sistema
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <SearchX className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-medium text-white">
                    No encontramos resultados
                  </h3>
                </div>
              )}
            </div>
          ) : (
            filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className={
                  filteredAdmins.length === 1 ? "w-full max-w-md" : "w-full"
                }
              >
                <UserCard
                  admin={admin}
                  onStatusChange={() => toggleStatus(admin.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
