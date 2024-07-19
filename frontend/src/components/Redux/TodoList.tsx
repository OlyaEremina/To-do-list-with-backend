import React, { useEffect } from "react";
import TodoItem from "./TodoItem";

import { PageType } from "./types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

const TodoList = ({ currentPage }: { currentPage: PageType }) => {
 const dispatch = useDispatch();
 const {todos} = useSelector((store:RootState)=>store)

  function todoLoad(currentPage: PageType): void {
    switch (currentPage) {
      case "All":
        fetch("http://localhost:3000/todos")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "todos/load", payload: data }));
        break;
      case "Done":
        fetch("http://localhost:3000/todos/done")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "todos/load/done", payload: data }));
        break;
      case "Not done":
        fetch("http://localhost:3000/todos/notdone")
          .then((res) => res.json())
          .then((data) =>
            dispatch({ type: "todos/load/notdone", payload: data })
          );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    todoLoad(currentPage);
  }, [currentPage]);

  return (
    <div className="todo-container">
      {todos.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
