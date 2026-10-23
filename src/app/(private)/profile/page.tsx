"use client";

import { AppLoading } from "@/src/components/appLoading";
import { ModalChangeCreate } from "./modalChangePassword";
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { IUserProfile } from "./types";
import { getCurrentUser } from "@/src/lib/auth";
import { TitlePage } from "@/src/components/titlePage";
import { MbButton } from "@/src/components/mbButton";

export default function Profile() {
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUserData(data);
    });
  }, []);

  function handleOpenPasswordModal() {
    setShowPasswordModal(true);
  }

  function handleClosepasswordModal() {
    setShowPasswordModal(false);
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mt-1 mb-6 flex items-center justify-between">
        <TitlePage>Perfil</TitlePage>
      </div>
      <div className="w-full">
        <Card className="max-w">
          <div className="flex justify-end px-4 pt-4">
            <Dropdown inline label="">
              <DropdownItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Export Data
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Delete
                </a>
              </DropdownItem>
            </Dropdown>
          </div>
          {userData === null ? (
            <AppLoading />
          ) : (
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {userData.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userData.email}
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <MbButton
                  color={"alternative"}
                  onClick={handleOpenPasswordModal}
                >
                  Alterar palavra-passe
                </MbButton>
              </div>
            </div>
          )}
        </Card>
      </div>

      <ModalChangeCreate
        show={showPasswordModal}
        onClose={handleClosepasswordModal}
      />
    </div>
  );
}
