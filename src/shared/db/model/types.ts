
export type Id = number | string;

export type TodoCategoryType = {
  id: Id;
  name: string;
  order: number;
}
export type TodoCategoryInputType = {
  name: string;
  order: number;
}

export type TodoColumnType = {
  id: Id;
  name: string;
  todoCategoryId: Id;
  order: number;
}
export type TodoColumnInputType = {
  name: string;
  todoCategoryId: Id;
  order: number;
}

export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export type TodoType = {
  id: Id;
  title: string;
  description?: string;
  todoColumnId: Id;
  priority?: TodoPriority;
  order: number;
  startDate?: string;
  endDate?: string;
}

export type TodoInputType = {
  title: string;
  description?: string;
  todoColumnId: Id;
  priority?: TodoPriority;
  order: number;
  startDate?: string;
  endDate?: string;
}