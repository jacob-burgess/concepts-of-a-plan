// Using node apis, incompatible with browser.
import { env } from "process";

// simulating some function that uses an api key or something.
// thusly, this whole module (including schemas) cannot be imported to
// the client environment.
export const serverEnvVarFunction = () => {
  const val = env.SECRET_KEY;
  return val;
};
