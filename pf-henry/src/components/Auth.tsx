//? FINAL

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./styles/auth.css";
import { loginUser, registerUser } from "@/services/authServices";
import { toast } from "sonner";
import { ILoginForm, IRegisterForm } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import useUserDataStore from "@/store";
import { Spinner } from "@heroui/react";

// type FormValues = {
//   username?: string;
//   email: string;
//   password: string;
// };

const SlideLoginForm: React.FC = () => {
  const router = useRouter();
  const { setUserData } = useUserDataStore();
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isSubmittingLogin },
  } = useForm<ILoginForm>();

  const {
    register: registerSignup,
    handleSubmit,
    formState: { errors: signupErrors, isSubmitting: isSubmittingSignup },
    reset,
  } = useForm<IRegisterForm>();

  if (isSubmittingLogin) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
        </div>
      </div>
    );
  }
  if (isSubmittingSignup) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
        </div>
      </div>
    );
  }

  const onSignupSubmit = async (data: IRegisterForm) => {
    try {
      const response = await registerUser(data);
      console.log("Response:", response);

      if (response) {
        toast.success("Usuario registrado correctamente");

        reset();
      }
    } catch (error) {
      toast.error((error as Error).message || "Error al registrar el usuario");
    }
  };

  const onLoginSubmit = async (data: ILoginForm) => {
    try {
      const response = await loginUser(data);
      console.log("Response:", response);

      if (response) {
        toast.success("Usuario logeado correctamente");
        setUserData(response);
        router.push("/");
        reset();
      }
    } catch (error) {
      toast.error((error as Error).message || "Error al logear el usuario");
    }
    console.log("Login Data:", data);
  };

  return (
    <main>
      <div className="container">
        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Sign Up */}
        <div className="signup">
          <form onSubmit={handleSubmit(onSignupSubmit)}>
            <label htmlFor="chk" aria-hidden="true">
              Registro
            </label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              {...registerSignup("name", {
                required: "Nombre de usuario requerido",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "El nombre de usuario solo puede contener letras",
                },
                minLength: {
                  value: 3,
                  message:
                    "El nombre de usuario debe tener al menos 3 caracteres",
                },
              })}
            />
            {signupErrors.name && (
              <p className="error">{signupErrors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...registerSignup("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            {signupErrors.email && (
              <p className="error">{signupErrors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              {...registerSignup("password", {
                required: "Contraseña requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial",
                },
              })}
            />
            {signupErrors.password && (
              <p className="error">{signupErrors.password.message}</p>
            )}

            <button type="submit">Registrarse</button>
          </form>
        </div>

        {/* Login */}
        <div className="login">
          <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <label htmlFor="chk" aria-hidden="true">
              Ingresar
            </label>
            <input
              type="email"
              placeholder="Email"
              {...registerLogin("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            {loginErrors.email && (
              <p className="error">{loginErrors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              {...registerLogin("password", {
                required: "Contraseña requerida",
              })}
            />
            {loginErrors.password && (
              <p className="error">{loginErrors.password.message}</p>
            )}

            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SlideLoginForm;
