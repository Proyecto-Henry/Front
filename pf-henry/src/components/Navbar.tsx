"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@heroui/react";
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

  return (
    <Navbar disableAnimation isBordered className="bg-white">
      <div className="w-full flex items-center">
        {/* Logo a la izquierda con margen negativo si es necesario */}
        <div className="mr-auto">
          <Image src="/logoApp.webp" alt="Logo ACME" className="w-24 h-auto" />
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

      <NavbarContent
        className="sm:hidden pr-3"
        justify="center"
      ></NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="bg-[#1954ab] text-white"
            /* color="warning" */ href="#"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
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
