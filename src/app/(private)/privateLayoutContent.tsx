"use client";

import { useAuth } from "@/src/auth/AuthProvider";
import { MbNavBar } from "@/src/components/mbNavBar";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { UserRole } from "./users/types";
import { AppLoading } from "@/src/components/appLoading";
import { SnackbarProvider } from "notistack";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/src/lib/auth";
import { useEffect } from "react";

export function PrivateLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, clearUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  function handleProfile() {
    router.push("/profile");
  }

  function handleLogout() {
    logoutRequest().then(() => {
      clearUser();
      router.replace("/");
    });
  }

  const isLoadingUserData = loading || user === null;

  return (
    <>
      <SnackbarProvider />

      <MbNavBar authenticated>
        {!isLoadingUserData && (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex flex-row items-center justify-center gap-1">
                  <span className="font-bold text-white">{user?.name}</span>
                  <Avatar rounded />
                </div>
              }
            >
              {!isLoadingUserData && (
                <>
                  <DropdownHeader>
                    <span className="block text-sm">{user.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </DropdownHeader>
                  <DropdownDivider />
                  <DropdownItem onClick={handleProfile}>Perfil</DropdownItem>
                  <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                </>
              )}
            </Dropdown>
            <NavbarToggle />
          </div>
        )}

        <NavbarCollapse>
          <NavbarLink as={Link} href="/boards" className="text-white">
            Quadros
          </NavbarLink>
          {user?.role === UserRole.admin && (
            <NavbarLink as={Link} href="/users" className="text-white">
              Utilizadores
            </NavbarLink>
          )}
        </NavbarCollapse>
      </MbNavBar>

      <main className="flex flex-1 flex-col px-6 pt-20 md:flex-row">
        {isLoadingUserData ? <AppLoading /> : <>{children}</>}
      </main>
    </>
  );
}
