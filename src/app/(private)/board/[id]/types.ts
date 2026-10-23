import z from "zod";

export interface IBoard {
  id: string;
  name: string;
  description: string;
}

export interface ICard {
  id: number;
  description: string;
  boardId: number;
  userName: string;
  position: number;
  color: string | null;
}

const requiredMessage = "Campo obrigatório";

export const formCreateSchema = z.object({
  description: z.string().nonempty(requiredMessage),
  color: z.string().nullable().optional(),
});

export type IFormCreate = z.infer<typeof formCreateSchema>;

export interface IMessageDto {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
}

export const formMessageSchema = z.object({
  content: z.string().nonempty(requiredMessage),
});

export type IFormMessage = z.infer<typeof formMessageSchema>;
