"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formMessageSchema, type IFormMessage } from "./types";

interface IProps {
  onSendMessage: (content: string) => void;
}

export function FormMessage({ onSendMessage }: IProps) {
  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(formMessageSchema),
  });

  const onSubmit = (data: IFormMessage) => {
    onSendMessage(data.content);
    reset();
  };

  return (
    <>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <input
          id="message"
          type="text"
          placeholder="Escreve uma mensagem..."
          className="flex-1 rounded-l border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
          {...register("content")}
        />
        <button
          type="submit"
          className="rounded-r bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </>
  );
}
