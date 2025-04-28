// "use client"
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
// import { Inter } from "next/font/google";

// const inter = Inter({
//   weight: "800", // Extra bold
//   subsets: ["latin"],
// });

// // export const AcmeLogo = () => {
// //   return (
// //     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
// //       <path
// //         clipRule="evenodd"
// //         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
// //         fill="currentColor"
// //         fillRule="evenodd"
// //       />
// //     </svg>
// //   );
// // };

// export default function App() {
//   return (
//     <Navbar className="bg-white w-full px-0">
//       <div className="flex justify-between items-center w-full px-4">
//       <NavbarBrand className="flex item-center gap-1">
//       <img src="/logoApp.webp" alt="Logo ACME" className="w-24 h-auto" />
//       <p
//           className={`font-extrabold text-[#4470AF] ${inter}`}
//           style={{ fontSize: "28px" }}
//         >SafeStock</p>
//       </NavbarBrand>
//       {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Features
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link aria-current="page" href="#">
//             Customers
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Integrations
//           </Link>
//         </NavbarItem>
//       </NavbarContent> */}
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex text-[#4470AF] font-normal text-[50px]" >
//           <Link href="#">Home</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             Logout
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//       </div>
//     </Navbar>
//   );
// }

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
} from "@heroui/react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800", // Extra bold
  subsets: ["latin"],
});

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

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

      {/* <NavbarBrand className="flex item-center gap-1">
       <img src="/logoApp.webp" alt="Logo ACME" className="w-24 h-auto" />
       <p           className={`font-extrabold text-[#4470AF] ${inter}`}
           style={{ fontSize: "28px" }}
       >SafeStock</p>
       </NavbarBrand> */}
{/* 
<NavbarContent className="sm:flex" justify="start">
        <NavbarBrand className="flex items-center gap-1">
          <img src="/logoApp.webp" alt="Logo ACME" className="w-24 h-auto" />
          <p className={`font-extrabold text-[#4470AF] ${inter}`} style={{ fontSize: "28px" }}>
            SafeStock
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent> */}

{/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* NavbarBrand con la imagen a la izquierda */}
      {/* <NavbarContent className="sm:flex" justify="start">
        <NavbarBrand className="flex items-center gap-1">
          <img src="/logoApp.webp" alt="Logo ACME" className="w-24 h-auto" />
          <p className={`font-extrabold text-[#4470AF] ${inter}`} style={{ fontSize: "28px" }}>
            SafeStock
          </p>
        </NavbarBrand>
      {/* </NavbarContent> */}  

      <div className="w-full flex items-center">
        {/* Logo a la izquierda con margen negativo si es necesario */}
        <div className="mr-auto">
          <img src="/logoApp.webp" alt="Logo ACME" className="w-24 h-auto" />
        </div>

        {/* Resto del contenido del navbar */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarBrand className="flex items-center gap-1">
          <p className={`font-extrabold text-[#4470AF] ${inter}`} style={{ fontSize: "28px" }}>
            SafeStock
          </p>
        </NavbarBrand>
        </div>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        {/* <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand> */}
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="warning" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="bg-[#1954ab] text-white"/* color="warning" */ href="#" variant="flat">
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
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
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
