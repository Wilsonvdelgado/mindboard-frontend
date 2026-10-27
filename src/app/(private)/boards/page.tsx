"use client";

import { useCallback, useEffect, useState } from "react";
import { IBoard } from "./types";
import { TitlePage } from "@/src/components/titlePage";
import { MbButton } from "@/src/components/mbButton";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { EmptyData } from "@/src/components/emptyData";
import { MbTableButton } from "@/src/components/mbTableButton";
import { MbConfirmAction } from "@/src/components/mbConfirmAction";
import { deleteBoard, loadBoards } from "@/src/lib/boards";
import { showErrorNotification } from "@/src/lib/utils";
import { ModalCreate } from "./modalCreate";
import { ModalEdit } from "./modalEdit";
import { useRouter } from "next/navigation";

export default function BoardsPage() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState<IBoard[]>([]);

  const [editBoard, setEditModal] = useState<IBoard | null>(null);

  console.log("listagem boards");
  const loadData = useCallback(() => {
    loadBoards()
      .then((data) => {
        setBoards(data);
      })
      .catch(() => {
        showErrorNotification("Ocorreu um erro ao carregar as salas!");
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

  function handleOpenEdit(board: IBoard) {
    setEditModal(board);
  }

  function handleCloseEdit(reload?: boolean) {
    setEditModal(null);
    if (reload) {
      loadData();
    }
  }

  async function handleDeleteBoard(boardId: number) {
    return deleteBoard(boardId)
      .then(() => {
        loadData();
      })
      .catch(() => {
        showErrorNotification("Ocorreu um erro ao remover a sala!");
      });
  }

  function handleShowBoard(id: number) {
    router.push("/board/" + id);
  }

  console.log("boards", boards);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mt-1 mb-6 flex items-center justify-between">
        <TitlePage>Quadros</TitlePage>
        <MbButton onClick={handleOpenCreate}>Adicionar</MbButton>
      </div>

      <Card className="w-full p-0">
        <div className="flow-root">
          {boards.length === 0 ? (
            <div className="flow-root">
              <EmptyData />
            </div>
          ) : (
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Nome</TableHeadCell>
                  <TableHeadCell>Descrição</TableHeadCell>
                  <TableHeadCell>Estado</TableHeadCell>
                  <TableHeadCell>Ações</TableHeadCell>
                </TableRow>
              </TableHead>

              <TableBody className="divide-y">
                {boards.map((board) => (
                  <TableRow
                    key={board.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                      {board.name}
                    </TableCell>
                    <TableCell>{board.description}</TableCell>
                    <TableCell>{board.status}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <MbTableButton
                          onClick={() => handleShowBoard(board.id)}
                        >
                          Consultar
                        </MbTableButton>
                        <MbTableButton onClick={() => handleOpenEdit(board)}>
                          Editar
                        </MbTableButton>
                        <MbConfirmAction
                          onConfirm={async () => {
                            return handleDeleteBoard(board.id);
                          }}
                        >
                          <MbTableButton variant="delete">
                            Remover
                          </MbTableButton>
                        </MbConfirmAction>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      <ModalCreate show={showModal} onClose={handleCloseCreate} />
      {editBoard && <ModalEdit board={editBoard} onClose={handleCloseEdit} />}
    </div>
  );
}
