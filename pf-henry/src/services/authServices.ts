import { ILoginForm, IRegisterForm } from "@/interfaces/interfaces";
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
