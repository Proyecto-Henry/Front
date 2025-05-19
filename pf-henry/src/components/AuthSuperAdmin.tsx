"use client";
import { loginSuperAdmin } from "@/services/authServices";
import { Button, Input } from "@heroui/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import useUserDataStore from "@/store";
import {ILoginFormSuperAdmin} from "@/interfaces/interfaces";


function LoginFormSuperAdmin() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const router = useRouter();
  const { setDataSuperAdmin } = useUserDataStore();
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }
  const onSubmit = async (data: ILoginFormSuperAdmin) => {
    try {
      const response = await loginSuperAdmin(data);

      if (response) {
        toast.success("Super Admin logged successfully");
        setDataSuperAdmin(response);
        router.push("/superAdmin");
      }
    } catch (error) {
      toast.error((error as Error).message || "Error al ingresar super Admin");
    }
  };
  return (
    <div className="flex h-screen w-full flex-wrap align-center justify-center md:flex-nowrap gap-4 p-4 mt-8">
      <form
        className="flex flex-col w-full md:w-2/6 gap-4 p-4 bg-foreground-50 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold ">Login</h1>

        <Controller
          control={control}
          name="name"
          rules={{
            required: {
              value: true,
              message: "El nombre es obligatorio",
            },
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              message: "El nombre solo puede contener letras",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="w-full"
              placeholder="Nombre"
            />
          )}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },

            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              className="w-full"
              placeholder="Email"
            />
          )}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
        <Controller
          control={control}
          name="password"
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              className="w-full"
              placeholder="Password"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-tr hover:from-blue-400 hover:to-blue-600"
          radius="full"
          size="md"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginFormSuperAdmin;