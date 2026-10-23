// import { apiFetch } from "./client";

import { IBoard, IFormCreate } from "../components/types";
import { apiFetch } from "./api";

// export type Board = {
//   id: string;
//   name: string;
// };

// export function getBoards() {
//   return apiFetch<Board[]>("boards");
// }

// export function getBoard(id: string) {
//   return apiFetch<Board>(`boards/${encodeURIComponent(id)}`);
// }

// export function createBoard(data: { name: string }) {
//   return apiFetch<Board>("boards", {
//     method: "POST",
//     body: data,
//   });
// }

export function loadBoards() {
  return apiFetch<IBoard[]>("boards", {
    method: "GET",
  });
}

export function createBoard(board: IFormCreate) {
  return apiFetch<void>("boards", {
    method: "POST",
    body: board,
  });
}

export function updateBoard(id: number, board: IFormCreate) {
  return apiFetch<void>(`boards/${id}`, {
    method: "PUT",
    body: board,
  });
}

export function deleteBoard(id: number) {
  return apiFetch<void>(`boards/${id}`, {
    method: "DELETE",
  });
}
