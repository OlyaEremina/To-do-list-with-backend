import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddTodoForm = () => {
  const [inputAdd, setInputAdd] = useState<string>("");
 const dispatch = useDispatch();

  const todoAddHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const addTodo = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputAdd }),
      });
      const data = await addTodo.json();
      console.log(data.message);
      if (data.message === "success") {
        dispatch({ type: "todos/add", payload: data.data });
        setInputAdd("");
      }
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  };

  const inputAddChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputAdd(event.target.value);
  };

  return (
    <form onSubmit={todoAddHandle} className="form">
      <input value={inputAdd} onChange={inputAddChangeHandle} type="text" />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTodoForm;
