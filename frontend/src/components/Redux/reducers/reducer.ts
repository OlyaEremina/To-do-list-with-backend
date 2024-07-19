import { Action } from "../types/Action";
import { State } from "../types/State";

const initialState: State = {
  todos: [],
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "todos/load":
      return {
        ...state,
        todos: action.payload,
      };
    case "todos/delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "todos/add":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: action.payload.completed,
          },
        ],
      };
    case "todos/update/cheked":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: action.payload.completed };
          }
          return todo;
        }),
      };
    case "todos/update/text":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    case "todos/load/done":
      return {
        ...state,
        todos: action.payload,
      };
    case "todos/load/notdone":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
