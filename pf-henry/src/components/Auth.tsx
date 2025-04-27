//////////////////////////////////////////////////////////////////!
// "use client";

// import React from "react";
// // import { useForm, Controller } from "react-hook-form";
// import "./styles/auth.css";

// const SlideLoginForm: React.FC = () => {
//   return (
//     <body>
//       <div className="container">
//         <input type="checkbox" id="chk" aria-hidden="true" />

//         <div className="signup">
//           <form>
//             <label htmlFor="chk" aria-hidden="true">
//               Sign up
//             </label>
//             <input type="text" name="txt" placeholder="User name" required />
//             <input type="email" name="email" placeholder="Email" required />
//             <input
//               type="password"
//               name="pswd"
//               placeholder="Password"
//               required
//             />
//             <button>Sign up</button>
//           </form>
//         </div>

//         <div className="login">
//           <form>
//             <label htmlFor="chk" aria-hidden="true">
//               Login
//             </label>
//             <input type="email" name="email" placeholder="Email" required />
//             <input
//               type="password"
//               name="pswd"
//               placeholder="Password"
//               required
//             />
//             <button>Login</button>
//           </form>
//         </div>
//       </div>
//     </body>
//   );
// };

// export default SlideLoginForm;
//////////////////////////////////////////////////////////////////!
//? DEEP
// "use client";

// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import "./styles/auth.css";

// type FormValues = {
//   username: string;
//   email: string;
//   password: string;
//   loginEmail: string;
//   loginPassword: string;
// };

// const SlideLoginForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>({
//     mode: "onBlur", // Configuración principal para validar onBlur
//   });

//   const onSubmitSignUp: SubmitHandler<FormValues> = (data) => {
//     console.log("SignUp Data:", data);
//     // Aquí iría tu lógica de registro
//     reset();
//   };

//   const onSubmitLogin: SubmitHandler<FormValues> = (data) => {
//     console.log("Login Data:", {
//       email: data.loginEmail,
//       password: data.loginPassword,
//     });
//     // Aquí iría tu lógica de login
//     reset({ loginEmail: "", loginPassword: "" });
//   };

//   return (
//     <div className="container">
//       <input type="checkbox" id="chk" aria-hidden="true" />

//       <div className="signup">
//         <form onSubmit={handleSubmit(onSubmitSignUp)}>
//           <label htmlFor="chk" aria-hidden="true">
//             Sign up
//           </label>

//           <input
//             type="text"
//             placeholder="User name"
//             {...register("username", {
//               required: "Username is required",
//               minLength: {
//                 value: 3,
//                 message: "Username must be at least 3 characters",
//               },
//               validate: (value) =>
//                 !/\s/.test(value) || "Username should not contain spaces",
//             })}
//             onBlur={(e) => {
//               // Trigger validation on blur
//               e.target.focus();
//               e.target.blur();
//             }}
//           />
//           {errors.username && (
//             <span className="error-message">{errors.username.message}</span>
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address",
//               },
//             })}
//             onBlur={(e) => {
//               e.target.focus();
//               e.target.blur();
//             }}
//           />
//           {errors.email && (
//             <span className="error-message">{errors.email.message}</span>
//           )}

//           <input
//             type="password"
//             placeholder="Password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters",
//               },
//               validate: (value) =>
//                 /[A-Z]/.test(value) ||
//                 "Password must contain at least one uppercase letter",
//             })}
//             onBlur={(e) => {
//               e.target.focus();
//               e.target.blur();
//             }}
//           />
//           {errors.password && (
//             <span className="error-message">{errors.password.message}</span>
//           )}

//           <button type="submit">Sign up</button>
//         </form>
//       </div>

//       <div className="login">
//         <form onSubmit={handleSubmit(onSubmitLogin)}>
//           <label htmlFor="chk" aria-hidden="true">
//             Login
//           </label>

//           <input
//             type="email"
//             placeholder="Email"
//             {...register("loginEmail", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address",
//               },
//             })}
//             onBlur={(e) => {
//               e.target.focus();
//               e.target.blur();
//             }}
//           />
//           {errors.loginEmail && (
//             <span className="error-message">{errors.loginEmail.message}</span>
//           )}

//           <input
//             type="password"
//             placeholder="Password"
//             {...register("loginPassword", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters",
//               },
//             })}
//             onBlur={(e) => {
//               e.target.focus();
//               e.target.blur();
//             }}
//           />
//           {errors.loginPassword && (
//             <span className="error-message">
//               {errors.loginPassword.message}
//             </span>
//           )}

//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SlideLoginForm;
//////////////////////////////////////////////////////////////////!
//? FINAL

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./styles/auth.css";
import { registerUser } from "@/services/authServices";
import { toast } from "sonner";
import { IRegisterForm } from "@/interfaces/interfaces";

type FormValues = {
  username?: string;
  email: string;
  password: string;
};

const SlideLoginForm: React.FC = () => {
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<FormValues>();

  const {
    register: registerSignup,
    handleSubmit,
    formState: { errors: signupErrors },
  } = useForm<IRegisterForm>();

  const onSignupSubmit = async (data: IRegisterForm) => {
    try {
      const response = await registerUser(data);

      if (response) {
        toast.success("User registered successfully");
      }
    } catch (error) {
      // Mostrar un mensaje de error si el servidor devuelve un 400
      toast.error((error as Error).message || "Error al registrar el usuario");
    }
    console.log("Signup Data:", data);
  };

  const onLoginSubmit = (data: FormValues) => {
    console.log("Login Data:", data);
  };

  return (
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

          <button type="submit">Logearse</button>
        </form>
      </div>
    </div>
  );
};

export default SlideLoginForm;
