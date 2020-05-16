import { serve } from "https://deno.land/std/http/server.ts";
import { ServerOptions } from "./types.ts";
import Handler from "./handler.ts";
import { Response } from "./contracts.ts";
import Routes from "./routes.ts";

class App extends Routes {
  private port: number = 8000;
  private server: any;

  constructor(options?: ServerOptions) {
    super();
    this.port = options?.port || 8000;
    this.listen();
  }
  
  async listen() {
    this.server = serve({ port: this.port });
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
