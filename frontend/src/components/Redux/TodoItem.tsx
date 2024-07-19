import React, { useState } from "react";
import { TodoType, TodoTypeId } from "./types/types";
import { useDispatch } from "react-redux";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const dispatch  = useDispatch();

  const [updaitingId, setUpdaitingId] = useState<TodoTypeId | null>(null);
  const [updateInputText, setUpdateInputText] = useState<string>("");

  const divUpdateTodoHandle = (value: TodoType): void => {
    setUpdaitingId(value.id);
    setUpdateInputText(value.text);
  };

  const checkedChangeHandle = async (todo: TodoType): Promise<void> => {
    try {
      const updateChecked = await fetch("http://localhost:3000/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
      });
      const data = await updateChecked.json();

      if (data.message === "success") {
        dispatch({ type: "todos/update/cheked", payload: data.data });
      }
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  };

  const saveUpdateTodo = async (updaitingId: TodoTypeId): Promise<void> => {
    try {
      const updateTodo = await fetch("http://localhost:3000/todos/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: updaitingId, text: updateInputText }),
      });
      const data = await updateTodo.json();
      if (data.message === "success") {
        dispatch({ type: "todos/update/text", payload: data.data });
        setUpdaitingId(null);
      }
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  };

  const InputChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUpdateInputText(event.target.value);
  };

  const todoDeleteHandle = async (id: TodoTypeId): Promise<void> => {
    try {
      const deleteTodo = await fetch("http://localhost:3000/todos/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await deleteTodo.json();
      if (data.message === "success") {
        dispatch({ type: "todos/delete", payload: id });
      } else {
        throw new Error("Ошибка удаления");
      }
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  };

  return (
    <div className="one-todo-container">
      <input
        onChange={() => checkedChangeHandle(todo)}
        checked={todo.completed}
        type="checkbox"
      />
      {updaitingId === todo.id ? (
        <div>
          <input
            value={updateInputText}
            onChange={InputChangeHandle}
            type="text"
          />
          <button onClick={() => saveUpdateTodo(updaitingId)} type="button">
            Save
          </button>
        </div>
      ) : (
        <div
          onClick={() => divUpdateTodoHandle(todo)}
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.text}
        </div>
      )}
      <button onClick={() => todoDeleteHandle(todo.id)} type="button">
        x
      </button>
    </div>
  );
};

export default TodoItem;
