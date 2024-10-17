import { z } from "zod";
import { fn } from "../utils/fn";
import { DB } from "./todo.sql";
import { fallback } from "@tanstack/router-zod-adapter";
import { serverEnvVarFunction } from "../hello";

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

  // TODO: fallback is a tanstack thing, it doesnt belong in core. lazy rn
  export const SearchParams = z.object({
    query: fallback(z.string(), "").default(""),
    limit: fallback(z.number(), 10).default(10),
    offset: fallback(z.number(), 0).default(0),
  });
  export type SearchParams = z.infer<typeof SearchParams>;

  export const SearchOut = z.object({
    title: z.string(),
  });
  export type SearchOut = z.infer<typeof SearchOut>;

  export const search = fn(
    SearchParams,
    async ({ query, limit, offset }): Promise<SearchOut[]> => {
      console.log(serverEnvVarFunction());

      if (query === "") {
        return DB;
      }

      return DB.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      ).slice(offset, offset + limit);
    }
  );
}
