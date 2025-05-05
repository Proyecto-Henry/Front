//? FINAL

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
// import { sendGoogleUserToBackend } from "@/services/authGoogle";
// import axios from "axios";
import { apiUrl } from "@/services/config";
import useUserDataStore from "@/store";

const SlideLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  // const hasSentGoogleDataRef = useRef(false);
  console.log("Session:", session);
  // console.log("Session user: PRUEBA", session.user.email);

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

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (status !== "authenticated" || !session?.user) {
  //       toast.error(
  //         "No se pudo obtener la sesión de Google. Intenta nuevamente."
  //       );
  //       console.error("Sesión indefinida tras 2 segundos.");
  //     }
  //   }, 2000);

  //   const sendGoogleUserToBackend = async () => {
  //     if (
  //       status === "authenticated" &&
  //       session?.user &&
  //       !hasSentGoogleDataRef.current
  //     ) {
  //       clearTimeout(timeoutId);
  //       hasSentGoogleDataRef.current = true;

  //       try {
  //         const response = await axios.post(`${apiUrl}/auth/signinGoogle`, {
  //           googleId: session.user.googleId,
  //           name: session.user.name,
  //           email: session.user.email,

  //           // name: session.user.name,
  //           // email: session.user.email,
  //           // image: session.user.image,
  //         });

  //         setUserData(response.data.userData);
  //         toast.success("Inicio de sesión con Google exitoso");
  //         router.push("/");
  //       } catch (error) {
  //         toast.error("Error al autenticar con Google en el backend");
  //         console.error(error);
  //       }
  //     }
  //   };

  //   sendGoogleUserToBackend();

  //   return () => clearTimeout(timeoutId);
  // }, [session, status, router, setUserData]);
  //////////////////////////////////////////////////////////!
  // useEffect(() => {
  //   if (session?.user && status === "authenticated") {
  //     fetch(`${apiUrl}/auth/signinGoogle`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         googleId: session.user.googleId,
  //         name: session.user.name,
  //         email: session.user.email,
  //       }),
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`Error ${res.status}: ${res.statusText}`);
  //         }

  //         return res.json();
  //       })
  //       .then((data) => {
  //         setUserData(data);
  //         console.log("Respuesta del backend:", data);
  //       })
  //       .catch((error) => console.error("Error al enviar datos:", error));
  //   }
  // }, [session, status, setUserData]);
  //////////////////////////////////////////////////////////!
  useEffect(() => {
    if (session?.user && status === "authenticated") {
      const sendGoogleUserToBackend = async () => {
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

          setUserData({
            googleId: session.user.googleId,
            name: session.user.name,
            email: session.user.email,
          });
          toast.success(responseData.message || "Inicio de sesión exitoso");

          router.push("/");

          console.log("Respuesta del backend:", responseData);
        } catch (error) {
          toast.error("Error al autenticar con Google");
          console.error("Error al enviar datos:", error);
        }
      };

      sendGoogleUserToBackend();
    }
  }, [session, status, setUserData, router]);

  if (isSubmittingLogin || isSubmittingSignup || status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Spinner />
      </div>
    );
  }

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
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-1 rounded-full shadow-md">
                <button onClick={() => signIn()}>
                  <Image
                    src="https://yt3.googleusercontent.com/mhme5V2s8MFLJ7lTY1i5K4yZy6mIg8dbvPN-TYWGmDcbA5beh9qbxRWAeZ9lJNPddOaJxhf0=s900-c-k-c0x00ffffff-no-rj"
                    alt="Google"
                    className="h-6 w-6 object-contain"
                  />
                </button>
              </div>
              <p className="text-white text-sm">O</p>
            </div>
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
