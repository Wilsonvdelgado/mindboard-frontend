import { Avatar } from "flowbite-react";
import { IMessageDto } from "../app/(private)/board/[id]/types";

interface IProps {
  message: IMessageDto;
  currentUserId: number;
}
export function ChatMessage({ currentUserId, message }: IProps) {
  console.log("currentUserId", currentUserId);

  const isMyMessage = currentUserId === message.user.id;
  const messageColor = isMyMessage ? "bg-blue-300" : "bg-gray-300";

  return (
    <div className="mt-2 flex items-start gap-2.5">
      <Avatar rounded />
      <div
        className={`bg-neutral-secondary-soft rounded-e-base rounded-es-base mr-4 flex w-full flex-1 flex-col rounded-md p-4 leading-1.5 ${messageColor}`}
      >
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          <span className="text-heading text-sm font-semibold">
            {message.user.name} {isMyMessage && " (Eu)"}
          </span>
        </div>
        <p className="text-body py-2.5 text-sm">{message.content}</p>
      </div>
    </div>
  );
}
