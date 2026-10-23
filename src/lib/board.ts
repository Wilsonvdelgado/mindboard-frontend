import { IBoard } from "../app/(private)/board/[id]/types";
import { apiFetch } from "./api";

export function loadBoard(id: number) {
  return apiFetch<IBoard>(`boards/${id}`, {
    method: "GET",
  });
}
