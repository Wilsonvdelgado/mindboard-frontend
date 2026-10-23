"use client";

import { MbButton } from "@/src/components/mbButton";
import { TitlePage } from "@/src/components/titlePage";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "./types";
import {
  Table,
  TableRow,
  TableHead,
  TableHeadCell,
  TableBody,
  TableCell,
  Badge,
} from "flowbite-react";
import { Card } from "flowbite-react";
import { UserStatusBadge } from "./userStatusBadge";
import { MbTableButton } from "@/src/components/mbTableButton";
import { MbConfirmAction } from "@/src/components/mbConfirmAction";
import { ModalCreate } from "./modalCreate";
import { ModalEdit } from "./modalEdit";
import { deleteUser, loadUsers } from "@/src/lib/users";
import { showErrorNotification } from "@/src/lib/utils";

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const [editUser, setEditUser] = useState<IUser | null>(null);

  const loadData = useCallback(() => {
    loadUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch(() => {
        showErrorNotification("Ocorreu um erro ao carregar os utilizadores!");
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleOpenCreate() {
    setShowModal(true);
  }

  function handleCloseCreate(reload?: boolean) {
    setShowModal(false);
    if (reload) {
      loadData();
    }
  }

  function handleOpenEdit(user: IUser) {
    setEditUser(user);
  }

  function handleCloseEdit(reload?: boolean) {
    setEditUser(null);
    if (reload) {
      loadData();
    }
  }

  async function handleDeleteUser(userId: number) {
    return deleteUser(userId)
      .then(() => {
        loadData();
      })
      .catch(() => {
        showErrorNotification("Ocorreu um erro ao remover o utilizador!");
      });
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mt-1 mb-6 flex items-center justify-between">
        <TitlePage>Utilizadores</TitlePage>
        <MbButton onClick={handleOpenCreate}>Adicionar</MbButton>
      </div>

      <Card className="w-full p-0">
        <div className="flow-root">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Nome</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Tipo</TableHeadCell>
                <TableHeadCell>Estado</TableHeadCell>
                <TableHeadCell>Ações</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className="inline-flex" color={"gray"}>
                      {user.role === "admin" ? "Admin" : "Comum"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <UserStatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <MbTableButton onClick={() => handleOpenEdit(user)}>
                        Editar
                      </MbTableButton>
                      <MbConfirmAction
                        onConfirm={async () => {
                          return handleDeleteUser(user.id);
                        }}
                      >
                        <MbTableButton variant="delete">Remover</MbTableButton>
                      </MbConfirmAction>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ModalCreate show={showModal} onClose={handleCloseCreate} />
      {editUser && <ModalEdit user={editUser} onClose={handleCloseEdit} />}
    </div>
  );
}
