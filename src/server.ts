import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

const startHandler = createStartHandler(defaultStreamHandler);

export default {
  async fetch(request: Request, env?: unknown, ctx?: unknown) {
    if (typeof startHandler === "function") {
      return (startHandler as any)(request);
    }
    return (startHandler as any).fetch(request, env, ctx);
  },
};
