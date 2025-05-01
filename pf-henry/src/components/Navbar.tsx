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
} from "@heroui/react";
import { LogIn, LogOut } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800", // Extra bold
  subsets: ["latin"],
});

export default function App() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const { userData, isHydrated } = useUserDataStore();

  return (
    <Navbar disableAnimation isBordered className="bg-white">
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

          {/* Resto del contenido del navbar */}
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle />
          </NavbarContent>

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

      <NavbarContent justify="end">
        {!userData && isHydrated && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/auth" className="group">
              <LogIn />
              <span className="absolute hidden group-hover:flex -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                Registrarse o iniciar sesión
              </span>
            </Link>
          </NavbarItem>
        )}
        {userData && isHydrated && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/logout" className="group">
              <LogOut />
              <span className="absolute hidden group-hover:flex -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                Cerrar sesión
              </span>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
