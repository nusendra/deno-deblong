import { sendType, jsonType } from "./types.ts"

export interface Response {
  send(body: sendType): sendType;
  json(body: jsonType): jsonType;
}
