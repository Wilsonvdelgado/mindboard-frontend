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
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          {...register("content")}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </>
  );
}
