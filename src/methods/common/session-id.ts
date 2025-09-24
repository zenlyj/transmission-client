import { TRANSMISSION_URL } from "../../config";
import { RpcMethod } from "./Rpc";
import { basePayload } from "./base-payload";

export async function fetchSessionId(): Promise<string> {
  if (memo.sessionId) {
    return memo.sessionId;
  }

  const dummyPayload = basePayload({ fields: ["id"] }, RpcMethod.Get);

  const res = await fetch(TRANSMISSION_URL, dummyPayload);

  if (res.status !== 409) {
    throw new Error("Unexpected response from transmission");
  }

  const transmissionSesssionId = res.headers.get("x-transmission-session-id");
  if (transmissionSesssionId === null) {
    throw new Error("Missing X-Transmission-Session-Id in response headers");
  }

  memo.sessionId = transmissionSesssionId;

  return transmissionSesssionId;
}

export function resetCache() {
  memo.sessionId = undefined;
}

const memo: { sessionId?: string } = {};
