"use client";
import useUserDataStore from "@/store";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Button,
} from "@heroui/react";
// import { s } from "framer-motion/client";
import { LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800", // Extra bold
  subsets: ["latin"],
});

export default function App() {
  // const menuItems = ["Home", "Dashboard", "Cerrar Sesión", "Iniciar Sesión"];
  const { userData, isHydrated, clearUserData } = useUserDataStore();
  const { data: session } = useSession();
  console.log("Session:", session);

  return (
    <Navbar disableAnimation isBordered className="bg-white">
      <NavbarContent className="sm:hidden" justify="start">
        {(userData || !userData) && isHydrated && <NavbarMenuToggle />}
      </NavbarContent>
      <Link color="foreground" href="/">
        <div className="w-full flex items-center">
          {/* Logo a la izquierda con margen negativo si es necesario */}
          <div className="mr-auto">
            <Image
              src="/logoApp.webp"
              alt="Logo ACME"
              className="w-24 h-auto"
            />
          </div>

          <NavbarBrand className="flex items-center gap-1">
            <p
              className={`font-extrabold text-[#4470AF] ${inter}`}
              style={{ fontSize: "28px" }}
            >
              SafeStock
            </p>
          </NavbarBrand>
        </div>
      </Link>

      <NavbarContent justify="end" className="hidden sm:flex">
        {!userData && isHydrated && (
          <NavbarItem>
            <Link
              href="/auth"
              className="relative group flex items-center justify-center p-2"
            >
              <span className="absolute hidden group-hover:flex -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10">
                Registrarse o iniciar sesión
              </span>
              <LogIn />
            </Link>
          </NavbarItem>
        )}
        {userData && isHydrated && (
          <>
            <NavbarItem>
              <Link href="/admin">
                <Button className="relative group flex items-center justify-center p-2 bg-blue-400">
                  Perfil
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link>
                <button
                  className="relative group flex items-center justify-center p-2"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    clearUserData();
                  }}
                >
                  <LogOut />

                  <span className="absolute hidden group-hover:flex -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10">
                    Cerrar sesión
                  </span>
                </button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/" className="w-full" size="lg">
            Inicio
          </Link>
        </NavbarMenuItem>

        {userData && isHydrated && (
          <>
            <NavbarMenuItem>
              <Link href="/admin" className="w-full" size="lg">
                Perfil
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  clearUserData();
                }}
                className="w-2.2/12 text-warning hover:text-danger"
              >
                Cerrar Sesión
              </button>
            </NavbarMenuItem>
          </>
        )}

        {!userData && isHydrated && (
          <NavbarMenuItem>
            <Link href="/auth" className="w-full text-danger" size="lg">
              Iniciar Sesión
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
