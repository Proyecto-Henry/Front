import { IAdmin } from "@/interfaces/interfaces";
const API_URL = 'http://localhost:3001/admins';

export const AdminService = {
  async getAdmins(): Promise<IAdmin[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener admins');
    return response.json();
  },

 /*  async toggleStatus(id: string): Promise<IAdmin> {
    const response = await fetch(`${API_URL}/${id}/toggle-status`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Error al cambiar estado');
    return response.json();
  } */
};