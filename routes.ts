import { RouterType } from "./types.ts";

class Routes {
  protected router: RouterType[];

  constructor() {
    this.router = [];
  }

  get(path: string, handler: any) {
    // find the existing route
    const route = this.router.findIndex((route) => {
      return route.path == path;
    });

    // udpate the handler
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
}

export default Routes;