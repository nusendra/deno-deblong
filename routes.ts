import { RouterType } from "./types.ts";

class Routes {
  protected router: RouterType[];

  constructor() {
    this.router = [];
  }

  get(path: string, handler: any) {
    this.router.push({
      method: "GET",
      path,
      handler,
    });
    return this;
  }
}

export default Routes;