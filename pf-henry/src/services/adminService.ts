import { IAdmin } from "@/interfaces/interfaces";
import { apiUrl } from "./config";

export const AdminService = {
  async getAdmins(): Promise<IAdmin[]> {
    try {
      const res = await fetch(`${apiUrl}/admins`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al obtener admins");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

 
};