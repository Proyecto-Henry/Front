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
      return await res.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async toggleStatus(admin_id: string): Promise<{ status: 'active' | 'inactive'; message: string }> {
    try {
      const res = await fetch(`${apiUrl}/admins/${admin_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al cambiar estado");
      }
  
      const response = await res.json();
      
      const normalizedStatus = 
        response.status === 'ACTIVE' ? 'active' :
        response.status === 'INACTIVE' ? 'inactive' :
        response.status; 
  
      return {
        status: normalizedStatus,
        message: response.message
      };
      
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
};