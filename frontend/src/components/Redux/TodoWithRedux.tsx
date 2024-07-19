import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { PageType } from "./types/types";
import "./TodoWithRedux.css";

const TodoWithRedux: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("All");

  return (
    <div className="most-common-container">
      <AddTodoForm />
      <h2>Todo list</h2>
      <div className="page-change-buttons">
        <button type="button" onClick={() => setCurrentPage("All")}>
          All
        </button>
        <button type="button" onClick={() => setCurrentPage("Done")}>
          Done
        </button>
        <button type="button" onClick={() => setCurrentPage("Not done")}>
          Not done
        </button>
      </div>
      <TodoList currentPage={currentPage} />
    </div>
  );
};

export default TodoWithRedux;
