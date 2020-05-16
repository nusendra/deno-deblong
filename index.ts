import { App, Response } from "./mod.ts";

const app = new App();
app.start();

app.get("/test", (response: Response) => {
  return response.json({ a: "asd" });
});
