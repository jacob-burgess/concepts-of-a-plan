import { z } from "zod";

export const TodoTable = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  internalKey: z.string(),
});
export type TodoTable = z.infer<typeof TodoTable>;

export const DB: TodoTable[] = [
  {
    id: "1",
    title: "Todo 1",
    description: "Description 1",
    completed: false,
    internalKey: "1",
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Description 2",
    completed: false,
    internalKey: "2",
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Description 3",
    completed: false,
    internalKey: "3",
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Description 4",
    completed: false,
    internalKey: "4",
  },
  {
    id: "5",
    title: "Todo 5",
    description: "Description 5",
    completed: false,
    internalKey: "5",
  },
];
