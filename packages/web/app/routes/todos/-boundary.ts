/**
 * A boundary file!^TM 
 * A pattern to make it very explicit where your server/client boundary is.
 *
 * The idea being -
 *
 * 1. while coding in the `core` package, you are a backend dev. You have the database, 
 * your open ai client, and all your secrets - server code, not dealing with Req/Res.
 *
 * 2. while coding in the `web` package, you are a frontend dev. Don't worry too much
 * about nothing. its's just frontend afterall 😜
 *
 * 3. EXCEPT! for `-boundary.ts` files (the '-' just tells tanstack to exclude this from the
 * file-routing). The only place you're 'allowed' to import from `@app/core` is in a boundary file,
 * because boundary files are also server code! If you need code (like, maybe, some shared schemas)
 * from `core` in other files in the app, you can re-export the code from the boundary file.
 *
 * Things:
 * - how does this affect bundles? the `Todo` module could be potentially large, but we're importing 
 *   it into `-boundary.ts`, so the whole `Todo` module doesnt go to the client? right? idk
 * - lint rule or somethin to explicitly say "No importing from core unless youre in a file called -boundary"?
 * - this is probably dumb
 */

import { Todo } from "@concepts/core/todo/todo";
import { createServerFn } from "@tanstack/start";

export const SearchParams = Todo.SearchParams;
export type SearchParams = Todo.SearchParams;

export const SearchOut = Todo.SearchOut;
export type SearchOut = Todo.SearchOut;

export const search = createServerFn(
  "GET",
  async (params: Todo.SearchParams) => {
    return await Todo.search(params);
  }
);

// ~~~ unrelated, but also ~~~
// this is an error at runtime. I want to be able to do it and just infer all
// the way through, but maybe impossible given tanstack has to inject
// "use server" here ?
// if impossible, maybe good candidate for lint rule

// export const runtimeError = createServerFn("GET", Todo.search);
