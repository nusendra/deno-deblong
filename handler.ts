import { Response } from "./contracts.ts";
import { sendType, jsonType } from "./types.ts"

class Handler implements Response {
  send(body: sendType): sendType {
    return body;
  }

  json(body: jsonType): jsonType {
    return JSON.stringify(body);
  }
}

export default Handler;
