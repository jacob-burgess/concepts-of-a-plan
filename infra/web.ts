if (!process.env.SECRET_KEY) {
  throw new Error(
    "SECRET_KEY is not set. From the root of the repo, run `bun dev`"
  );
}

export const web = new sst.aws.TanstackStart("WebApp", {
  path: "./packages/web",
  environment: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
});

export const outputs = {
  url: web.url,
};
