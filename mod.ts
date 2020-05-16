import { serve } from "https://deno.land/std/http/server.ts";

type ServerOptions = {
  port: number;
};

type RouterType = {
  method: string,
  path: string,
  handler: any
};

class App {
  private port: number = 8000;
  private server: any;
  private router: RouterType[];

  constructor(options?: ServerOptions) {
    this.port = options?.port || 8000;
    this.router = [];
  }

  get(path: string, handler: any) {
    this.router.push({
      method: "GET",
      path,
      handler
    });
    return this;
  }

  start() {
    this.server = serve({ port: this.port});
    this.listen();
  }

  async listen() {
    console.log(`server running in port ${this.port}`);

    for await (const req of this.server) {
      const availableRouter = this.router.find(route => {
        return route.path == req.url && route.method == req.method
      });
      
      if (!availableRouter) {
        req.respond({ status: 404 });
      }
      
      req.respond({ status: 200, body: availableRouter?.handler() });
    }
  }
}

const app = new App();
app.start();
app.get('/test', () => {
  return 'this is a callback';
});