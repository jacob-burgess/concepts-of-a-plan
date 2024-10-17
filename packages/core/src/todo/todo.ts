import { z } from "zod";
import { fn } from "../utils/fn";
import { DB } from "./todo.sql";

export module Todo {
  export const Info = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    completed: z.boolean(),
    // internalKey is purposely omitted here, fake thing we only need on backend
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    DB.find((todo) => todo.id === id)
  );

  export const ListParams = z.object({
    limit: z.number().optional().default(10),
    offset: z.number().optional().default(0),
  });
  export type ListParams = z.infer<typeof ListParams>;

  export const list = fn(ListParams, ({ limit, offset }) =>
    DB.slice(offset, offset + limit)
  );

  export const search = fn(z.string(), (query) =>
    DB.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()))
  );
}
