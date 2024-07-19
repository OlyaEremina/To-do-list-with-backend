import { TodoType } from "./types";
import { TodoTypeId } from "./types";

export type Action =
  | { type: "todos/load"; payload: TodoType[] }
  | { type: "todos/delete"; payload: TodoTypeId }
  | { type: "todos/add"; payload: TodoType }
  | { type: "todos/update/cheked"; payload: TodoType }
  | { type: "todos/update/text"; payload: TodoType }
  | { type: "todos/load/done"; payload: TodoType[] }
  | { type: "todos/load/notdone"; payload: TodoType[] };
