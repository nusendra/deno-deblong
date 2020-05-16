import { serve } from "https://deno.land/std/http/server.ts";
import { ServerOptions, RouterType } from "./types.ts";
import Handler from "./handler.ts";
import { Response } from "./contracts.ts";

class App {
  private port: number = 8000;
  private server: any;
  private router: RouterType[];

  constructor(options?: ServerOptions) {
    this.port = options?.port || 8000;
    this.router = [];
  }

  get(path: string, handler: any) {
    // find the existing route
    const route = this.router.findIndex((route) => {
      return route.path == path;
    });

    if (route >= 0) {
      this.router[route].handler = handler;
      return this;
    }

    this.router.push({
      method: "GET",
      path,
      handler,
    });
    return this;
  }

  start() {
    this.server = serve({ port: this.port });
    this.listen();
  }

  async listen() {
    console.log(`server running in port ${this.port}`);

    for await (const req of this.server) {
      const availableRouter = this.router.find((route) => {
        return route.path == req.url && route.method == req.method;
      });

      if (!availableRouter) {
        req.respond({ status: 404 });
      }

      req.respond({
        status: 200,
        body: availableRouter?.handler(new Handler()),
      });
    }
  }
}

export { App, Response };
