import { Response, sendType, jsonType } from "./contracts.ts";

class Handler implements Response {
  send(body: sendType): sendType {
    return body;
  }

  json(body: jsonType): jsonType {
    return JSON.stringify(body);
  }
}

export default Handler;
