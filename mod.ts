import { serve } from "https://deno.land/std/http/server.ts";

type ServerOptions = {
  port: number;
};

class App {
  private port: number = 8000;
  private server: any;

  constructor(options?: ServerOptions) {
    this.port = options?.port || 8000;
  }

  start() {
    this.server = serve({ port: this.port});
    this.listen();
  }

  async listen() {
    for await (const req of this.server) {
      req.respond({ status: 200, body: "test" });
    }
  }
}

const app = new App();
console.log(app.start());