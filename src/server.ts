import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

const startHandler = createStartHandler(defaultStreamHandler);

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      return await (startHandler as any).fetch(request, env, ctx);
    } catch (error: any) {
      console.error("SSR Catch Handler:", error);
      return new Response(
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>JNS Furnishing — Curate. Customize. Comfort.</title>
    <link rel="stylesheet" href="/assets/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/start.ts"></script>
  </body>
</html>`,
        {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        }
      );
    }
  },
};
