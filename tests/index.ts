import { App, Response } from "../mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;
const app = new App();

app.get("/test", (response: Response) => {
  return response.send("this is test endpoint");
});

test("route not found", async () => {
  const result = await fetch("http://localhost:8000/wow");
  assertEquals(result.status, 404);
  assertEquals(await result.text(), "");
});

test("test endpoint", async () => {
  const result = await fetch("http://localhost:8000/test");
  assertEquals(result.status, 200);
  assertEquals(await result.text(), "this is test endpoint");
});
