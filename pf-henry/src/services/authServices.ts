import { ILoginForm, IRegisterForm, ILoginFormSuperAdmin } from "@/interfaces/interfaces";
import { apiUrl } from "./config";

export async function registerUser(userData: IRegisterForm) {
  try {
    const res = await fetch(`${apiUrl}/auth/signUpAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar el usuario");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function loginUser(userData: ILoginForm) {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar el usuario");
    }

    const data = await res.json();
    console.log("Login data......", data);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function loginSuperAdmin(superAdminData: ILoginFormSuperAdmin) {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(superAdminData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMessage = data.message || "Error al autenticar como Super Admin";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error in loginSuperAdmin:", error);
    throw error;
  }
}