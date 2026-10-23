"use client";

import type { ICard } from "./types";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortableItem";
import { useEffect, useState } from "react";

import { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import { EmptyData } from "@/src/components/emptyData";
import { AppLoading } from "@/src/components/appLoading";
import { CardInsight } from "@/src/components/cardInsight";

interface IProps {
  socketRef: React.RefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
  boardId: string;
}

export function InsightSection({ boardId, socketRef }: IProps) {
  const [cards, setCards] = useState<ICard[]>([]);
  const [loadingcards, setLoadingCards] = useState(true);

  useEffect(() => {
    // Pegar os cards iniciais
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("getCards", boardId, (cards: ICard[]) => {
      setCards(cards);
      setLoadingCards(false);
    });

    // Ouvir novos cards
    socket.on("cardCreated", (newCard) => {
      setCards((prev) => [...prev, newCard]);
    });

    socket.on("cardPositionUpdated", (updateCards: ICard[]) => {
      setCards((prev) => {
        const map = new Map(prev.map((c) => [c.id, c]));
        updateCards.forEach((c) => {
          map.set(c.id, c);
        });

        return Array.from(map.values()).sort((a, b) => a.position - b.position);
      });
    });

    return () => {
      socket.off("cardCreated");
      socket.off("cardPositionUpdated");
    };
  }, [boardId, socketRef]);

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((item) => item.id === active.id);
      const newIndex = cards.findIndex((item) => item.id === over.id);
      setCards(arrayMove(cards, oldIndex, newIndex));

      socketRef.current?.emit("updateCardPosition", {
        id: active.id,
        newPosition: newIndex,
        boardId,
      });
    }
  }

  const isEmpty = cards.length === 0;

  return (
    <>
      {loadingcards ? (
        <AppLoading />
      ) : isEmpty ? (
        <EmptyData />
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleOnDragEnd}
        >
          <SortableContext
            items={cards.map((card) => card.id)}
            strategy={rectSortingStrategy}
          >
            <div className="mx-auto grid max-h-full grid-cols-2 gap-4">
              {cards.map((card) => (
                <SortableItem key={card.id} id={card.id}>
                  <CardInsight insight={card} />
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
}
