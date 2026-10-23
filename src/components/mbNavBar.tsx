import { Navbar, NavbarBrand } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";

interface MbNavBarProps {
  children?: React.ReactNode;
  authenticated?: boolean;
}
export function MbNavBar({ authenticated = false, children }: MbNavBarProps) {
  return (
    <Navbar
      fluid
      rounded
      className="fixed start-0 top-0 z-20 w-full border-b border-gray-300 bg-indigo-500"
    >
      <NavbarBrand as={Link} href={authenticated ? "/" : "/boards"}>
        <Image
          src="/brindboard_icon.svg"
          alt="Logótipo da aplicação"
          width={144}
          height={36}
          className="mr-3 h-6 w-auto sm:h-9"
          priority
          style={{
            backgroundColor: "aliceblue",
          }}
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          MindBoard
        </span>
      </NavbarBrand>
      {children}
    </Navbar>
  );
}
