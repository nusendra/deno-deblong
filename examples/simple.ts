import { App, Response } from "https://deno.land/x/deno_deblong/mod.ts"

const app = new App();

app.get("/test", (response: Response) => {
  return response.send("this is test endpoint");
});