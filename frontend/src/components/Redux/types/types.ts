export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoTypeId = TodoType["id"]; 

export type PageType = "All" | "Done" | "Not done";
