import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { search, SearchOut, SearchParams } from "./-boundary";
// import { Todo } from "@concepts/core/todo/todo";

export const Route = createFileRoute("/todos/")({
  validateSearch: zodSearchValidator(SearchParams),
  beforeLoad: async (props) => {
    return { search: props.search };
  },
  loader: async ({ context }) => {
    return await search(context.search);
  },
  component: () => <Search />,
});

function Search() {
  const results = Route.useLoaderData();
  return (
    <div>
      {results.map((result) => (
        <ResultCard key={result.title} result={result} />
      ))}
    </div>
  );
}

function ResultCard({ result }: { result: SearchOut }) {
  return <div>{result.title}</div>;
}

// function ResultCard({ result }: { result: Todo.SearchOut }) {
//   return <div>{result.title}</div>;
// }
