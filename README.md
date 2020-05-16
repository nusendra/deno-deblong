# deno-deblong
learn how to make a simple rest api framework with deno

# steps
1. git clone https://github.com/nusendra/deno-deblong
2. `deno test --allow-net tests/index.ts` for testing

# how to use
```
import { App, Response } from "https://deno.land/x/deno_deblong/mod.ts"

const app = new App();

app.get("/test", (response: Response) => {
  return response.send("this is test endpoint");
});
```
