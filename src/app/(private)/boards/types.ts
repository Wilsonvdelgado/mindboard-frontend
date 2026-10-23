import { z } from "zod";

const requiredMessage = "Campo obrigatório";

export const formCreateSchema = z.object({
  name: z.string().nonempty(requiredMessage),
  description: z.string().nonempty(requiredMessage),
});

export type IFormCreate = z.infer<typeof formCreateSchema>;

export const BoardStatus = {
  ACTIVE: "active",
  VOTING: "vonting",
  COMPLETED: "completed",
  DELETED: "deleted",
};

export type BoardStatusType = (typeof BoardStatus)[keyof typeof BoardStatus];

export interface IBoard {
  id: number;
  name: string;
  description: string;
  status: BoardStatusType;
}
