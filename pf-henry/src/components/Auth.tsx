"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./styles/auth.css";
import { loginUser, registerUser } from "@/services/authServices";
import { toast } from "sonner";
import { ILoginForm, IRegisterForm } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import { Image, Spinner } from "@heroui/react";
import { signIn, useSession } from "next-auth/react";
import { apiUrl } from "@/services/config";
import useUserDataStore from "@/store";

const SlideLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoadingSignup, setIsLoadingSignup] = React.useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = React.useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false);
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const router = useRouter();
  const { setUserData } = useUserDataStore();
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<ILoginForm>();

  const {
    register: registerSignup,
    handleSubmit,
    formState: { errors: signupErrors },
    reset,
  } = useForm<IRegisterForm>();

  //////////////////////////////////////////////////////////!
  useEffect(() => {
    if (session?.user && status === "authenticated") {
      const sendGoogleUserToBackend = async () => {
        setIsLoadingGoogle(true);
        try {
          const res = await fetch(`${apiUrl}/auth/signinGoogle`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              googleId: session.user.googleId,
              name: session.user.name,
              email: session.user.email,
            }),
          });

          if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
          }

          const responseData = await res.json();
          setIsRedirecting(true);
          setUserData(responseData);
          // toast.success(responseData.message || "Inicio de sesión exitoso");
          localStorage.setItem(
            "loginSuccessMessage",
            responseData.message || "Inicio de sesión exitoso"
          );

          router.push("/admin");
        } catch (error) {
          toast.error("Error al autenticar con Google");
          console.error("Error al enviar datos:", error);
        } finally {
          setIsLoadingGoogle(false);
        }
      };

      sendGoogleUserToBackend();
    }
  }, [session, status, setUserData, router]);

  if (
    isLoadingLogin ||
    isLoadingSignup ||
    isLoadingGoogle ||
    isRedirecting ||
    status === "loading"
  ) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Spinner />
      </div>
    );
  }

  const onSignupSubmit = async (data: IRegisterForm) => {
    setIsLoadingSignup(true);
    try {
      const response = await registerUser(data);

      if (response) {
        toast.success("Usuario registrado correctamente");

        reset();
      }
    } catch (error) {
      toast.error((error as Error).message || "Error al registrar el usuario");
    } finally {
      setIsLoadingSignup(false);
    }
  };

  const onLoginSubmit = async (data: ILoginForm) => {
    setIsLoadingLogin(true);
    try {
      const response = await loginUser(data);

      if (response && response.user.role === "admin") {
        setIsRedirecting(true);
        // toast.success("Usuario logueado correctamente");
        setUserData(response);
        localStorage.setItem(
          "loginSuccessMessage",
          "Usuario logueado correctamente"
        );
        router.push("/admin");
        reset();
      } else if (response && response.user.role === "user") {
        setIsRedirecting(true);

        setUserData(response);
        localStorage.setItem(
          "loginSuccessMessage",
          "Usuario logueado correctamente"
        );
        router.push(`/sucursal/${response.user.id}`);
        reset();
      }
    } catch (error) {
      toast.error((error as Error).message || "Error al logear el usuario");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <div className="flex flex-col mt-4 items-center gap-2">
        <button
          onClick={() => signIn()}
          className="flex items-center gap-3 bg-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Image
            src="https://yt3.googleusercontent.com/mhme5V2s8MFLJ7lTY1i5K4yZy6mIg8dbvPN-TYWGmDcbA5beh9qbxRWAeZ9lJNPddOaJxhf0=s900-c-k-c0x00ffffff-no-rj"
            alt="Google"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-gray-700 font-medium">
            Iniciar sesión con Google
          </span>
        </button>
        <p className="text-gray-500  mt-4 text-sm">O</p>
      </div>
      <div className="container">
        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Sign Up */}
        <div className="signup">
          <form onSubmit={handleSubmit(onSignupSubmit)}>
            <label htmlFor="chk" id="lebel" aria-hidden="true">
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

            <button id="btn" type="submit">
              Registrarse
            </button>
          </form>
        </div>

        {/* Login */}
        <div className="login">
          <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <label htmlFor="chk" id="lebel" aria-hidden="true">
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

            <button id="btn" type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SlideLoginForm;
