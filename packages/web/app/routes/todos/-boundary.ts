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
