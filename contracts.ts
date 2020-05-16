export interface Response {
  send(body: sendType): sendType;
  json(body: jsonType): jsonType;
}

export type sendType = string;
export type jsonType = string | object;
