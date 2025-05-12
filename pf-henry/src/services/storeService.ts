import { apiUrl } from "./config";

interface Producto {
  id: string;
  name: string;
  price: string;
  stock: number;
  stock_min: number;
  status: boolean;
}

interface SaleDetail {
  product_id: string;
  quantity: number;
}

interface SaleRequest {
  date: string;
  sale_details: SaleDetail[];
  store_id: string;
}

interface SaleResponse {
  success: boolean;
  message: string;
  sale: {
    id: string;
    date: string;
    total: string;
    sale_details: {
      quantity: number;
      product: {
        name: string;
        price: string;
      };
    }[];
  };
}

export const StoreService = {
  async getProducts(storeId: string): Promise<Producto[]> {
    try {
      const res = await fetch(`${apiUrl}/products/${storeId}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al obtener productos");
      }
      return await res.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async createSale(saleData: SaleRequest): Promise<SaleResponse> {
    try {
      const res = await fetch(`${apiUrl}/sales`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al realizar la venta");
      }

      return await res.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
};