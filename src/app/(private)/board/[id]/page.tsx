"use client";

import { useEffect, useRef, useState } from "react";
import type { IBoard, IFormCreate } from "./types";
import {
  initSocket,
  showErrorNotification,
  showSuccessNotification,
} from "./../../../../lib/utils";
import { ModalCreateCard } from "./modalCreateCard";

import { ChatSection } from "./chatSection";
import { InsightSection } from "./insightSection";
import { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import { useParams } from "next/navigation";
import { loadBoard } from "@/src/lib/board";
import { AppLoading } from "@/src/components/appLoading";
import { TitlePage } from "@/src/components/titlePage";
import { MbButton } from "@/src/components/mbButton";

export default function BoardMind() {
  const { id: boardId } = useParams<{ id: string }>();

  const [boardData, setBoardData] = useState<IBoard | null>(null);

  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  /**create */
  const [savingNewCard, setSavingNewCard] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  useEffect(() => {
    loadBoard(Number(boardId))
      .then((data) => {
        setBoardData(data);
      })
      .catch(() => {
        console.log("load board setBoardData");
      });
  }, [boardId]);

  useEffect(() => {
    if (!boardId) return;

    console.log("init socket");

    // 1. Inicializa a instância do Socket
    const socket = initSocket();
    console.log("socket response init", socket);
    socketRef.current = socket;

    const handleConnect = () => {
      console.log("Socket conectado com sucesso:", socket.id);
      socket.emit("joinBoard", Number(boardId));
    };

    const handleError = () => {
      showErrorNotification("Ocorreu um erro na ligação em tempo real!");
    };

    // 2. Regista os listeners de eventos
    socket.on("connect", handleConnect);
    socket.on("errorCards", handleError);

    // 3. Só força a ligação se ela não se iniciar automaticamente pelo initSocket()
    if (!socket.connected) {
      console.log("Forçando a conexão do socket...");
      socket.connect();
      console.log("Socket status após connect():", socket);
      console.log("Socket conectado com sucesso:", socket.id);
    }

    // Se o componente re-renderizar ou remontar (ex: Strict Mode), limpa o estado anterior
    return () => {
      socket.off("connect", handleConnect);
      socket.off("errorCards", handleError);

      // 4. Desconecta de forma limpa para o NestJS não receber uma quebra abrupta
      socket.disconnect();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [boardId]);

  // useEffect(() => {
  //   // Entrar na room do board
  //   console.log("init socket");
  //   socketRef.current = initSocket();
  //   const socket = socketRef.current;

  //   socket.emit("joinBoard", boardId);

  //   socket.on("errorCards", () => {
  //     showErrorNotification("Ocorreu um erro!");
  //   });

  //   // Cleanup quando sair do board
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [boardId]);

  /**create card */
  function handleCreateCard() {
    setShowModalCreate(true);
  }

  function onCreateNewCard(data: IFormCreate) {
    setSavingNewCard(true);
    socketRef?.current?.emit(
      "createCard",
      { ...data, boardId },
      (response: boolean) => {
        setSavingNewCard(false);
        if (!response) {
          return;
        }
        showSuccessNotification("Cartão criado com sucesso!");
        setShowModalCreate(false);
      },
    );
  }

  function handleCancelCreate() {
    setShowModalCreate(false);
  }

  function onSendMessage(content: string) {
    socketRef?.current?.emit(
      "createMessage",
      { content, boardId },
      (response: boolean) => {
        if (!response) {
          return;
        }
      },
    );
  }

  return (
    <div
      className="mx-auto w-full flex-1 flex-col"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      {boardData === null ? (
        <AppLoading />
      ) : (
        <div
          className="flex h-screen flex-1 flex-col md:flex-row"
          style={{ height: "100%", maxHeight: "100%" }}
        >
          {/* Área principal */}
          <div className="mt-1 mr-2 min-h-0 md:flex-3">
            <div className="mt-1 mb-6 flex items-center justify-between">
              <TitlePage>{boardData.name}</TitlePage>
              <MbButton color={"alternative"} onClick={handleCreateCard}>
                Adicionar
              </MbButton>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {boardId && (
                <InsightSection boardId={boardId} socketRef={socketRef} />
              )}
            </div>
          </div>
          {boardId && (
            <ChatSection
              boardId={boardId}
              socketRef={socketRef}
              onSendMessage={onSendMessage}
            />
          )}
        </div>
      )}

      {showModalCreate && (
        <ModalCreateCard
          onSubmit={onCreateNewCard}
          onCancel={handleCancelCreate}
          saving={savingNewCard}
        />
      )}
    </div>
  );
}
