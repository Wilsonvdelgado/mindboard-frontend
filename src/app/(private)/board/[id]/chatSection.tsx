"use client";

import { useEffect, useState } from "react";
import type { IMessageDto } from "./types";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import { FormMessage } from "./formMessage";
import { useAuth } from "@/src/auth/AuthProvider";
import { AppLoading } from "@/src/components/appLoading";
import { EmptyData } from "@/src/components/emptyData";
import { ChatMessage } from "@/src/components/chatMessage";

interface IProps {
  socketRef: React.RefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
  boardId: string;
  onSendMessage: (content: string) => void;
}
export function ChatSection({ boardId, socketRef, onSendMessage }: IProps) {
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("getMessages", boardId, (data: IMessageDto[]) => {
      console.log("emit data", data);
      setMessages(data);
      setLoadingMessages(false);
    });

    // Ouvir novos cards
    socket.on("messageCreated", (message) => {
      console.log("mes", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("messageCreated");
    };
  }, [boardId, socketRef]);

  const isEmpty = messages.length === 0;
  console.log("messages", messages);

  return (
    <div className="bg-green flex h-full max-h-full flex-col overflow-y-auto border-t border-gray-200 p-4 md:flex-1 md:border-t-0 md:border-l">
      <h2 className="mb-2 text-xl font-semibold">Chat</h2>

      {loadingMessages ? (
        <AppLoading />
      ) : (
        <div className="scrollbar mb-4 min-h-0 flex-1 scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-auto">
          {isEmpty ? (
            <EmptyData />
          ) : (
            <>
              {user &&
                messages.map((message) => (
                  <ChatMessage
                    currentUserId={Number(user.id)}
                    key={message.id}
                    message={message}
                  />
                ))}
            </>
          )}
        </div>
      )}

      {/* Input */}
      <FormMessage onSendMessage={onSendMessage} />
    </div>
  );
}
