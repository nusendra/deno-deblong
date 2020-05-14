import { serve } from "https://deno.land/std/http/server.ts";

type ServerOptions = {
  port: number;
};

type RouterType = {
  method: string,
  path: string
};

class App {
  private port: number = 8000;
  private server: any;
  private router: RouterType[];

  constructor(options?: ServerOptions) {
    this.port = options?.port || 8000;
    this.router = [];
  }

  get(path: string) {
    this.router.push({
      method: "GET",
      path
    });
    return this;
  }

  start() {
    this.server = serve({ port: this.port});
    this.listen();
  }

  async listen() {
    for await (const req of this.server) {
      const availableRouter = this.router.some(route => {
        return route.path == req.url && route.method == req.method
      });
      
      if (!availableRouter) {
        req.respond({ status: 404, body: "route not found" });
      }
      
      req.respond({ status: 200, body: "hi world" });
    }
  }
}

const app = new App();
app.start();
app.get('/test')