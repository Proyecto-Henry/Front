"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
// import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiUrl } from "../services/config";
import useUserDataStore from "../store";
import ModalCreate from "@/utils/Modal";
// import ModalCreate from "@/utils/Modal";

export interface IRegisterForm {
  name: string;
  address: string;
  email: string;
  password: string;
}

export async function registerUser(userData: IRegisterForm, token: string) {
  try {
    const res = await fetch(`${apiUrl}/auth/signUpStore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar la sucursal");
    }

    return await res.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default function SucursalCard({
  onSucursalCreada,
}: {
  onSucursalCreada: () => void;
}) {
  const { userData } = useUserDataStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      address: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const response = await registerUser(data, userData?.token || "");
      if (response) {
        toast.success("Sucursal creada correctamente");
        reset();
        setIsModalOpen(false);
        onSucursalCreada();
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-gray-200 bg-opacity-80 rounded-xl p-6 w-full">
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <ModalCreate isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 p-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Crear Sucursal
          </h2>
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              placeholder="Nombre"
              {...register("name", {
                required: "Nombre requerido",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
              className="w-[80%] h-[40px] bg-gray-100 px-4 py-2 rounded-md border text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}

            <input
              type="text"
              placeholder="Dirección"
              {...register("address", { required: "Dirección requerida" })}
              className="w-[80%] h-[40px] bg-gray-100 px-4 py-2 rounded-md border text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Email inválido",
                },
              })}
              className="w-[80%] h-[40px] bg-gray-100 px-4 py-2 rounded-md border text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "Contraseña requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial ( @ $ ! % * ? & )",
                },
              })}
              className="w-[80%] h-[40px] bg-gray-100 px-4 py-2 rounded-md border text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-[80%] h-[40px] bg-blue-600 mt-2 px-4 py-2 rounded-md text-white font-bold hover:bg-blue-700 transition"
            >
              Crear
            </button>
          </div>
        </form>
      </ModalCreate>
    </>
  );
}
