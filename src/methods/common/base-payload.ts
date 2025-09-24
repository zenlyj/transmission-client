import { TRANSMISSION_PASS, TRANSMISSION_USER } from "../../config";
import { GetTorrentArguments } from "../get-torrents";
import { RpcMethod } from "./Rpc";

export function basePayload(
  args: Arguments,
  method: RpcMethod,
  sessionId?: string
) {
  const basicAuth = Buffer.from(
    `${TRANSMISSION_USER}:${TRANSMISSION_PASS}`
  ).toString("base64");

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
      ...(sessionId ? { "X-Transmission-Session-Id": sessionId } : {}),
    },
    body: JSON.stringify({
      method: method.toString(),
      arguments: args,
    }),
  };
}

type Arguments = GetTorrentArguments;
