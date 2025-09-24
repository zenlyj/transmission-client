import { TRANSMISSION_URL } from "../config";
import { basePayload } from "./common/base-payload";
import {
  TorrentGetResponse,
  RpcMethod,
  RpcResponse,
  RpcResponseResult,
} from "./common/Rpc";
import { fetchSessionId } from "./common/session-id";
import { TorrentRpcSchema } from "../validation";
import { mapTorrentRpcToTorrent, Torrent } from "../types";

export async function getTorrents(): Promise<Torrent[]> {
  const sessionId = await fetchSessionId();
  const res = await fetch(TRANSMISSION_URL, getTorrentsPayload(sessionId));
  const torrentGetResponse: RpcResponse<TorrentGetResponse> = await res.json();

  if (
    torrentGetResponse.result !== RpcResponseResult.Success ||
    !torrentGetResponse.arguments
  ) {
    throw new Error("Failed to get torrents from transmission");
  }

  return torrentGetResponse.arguments.torrents.map((torrent) => {
    const parseRes = TorrentRpcSchema.safeParse(torrent);
    if (!parseRes.success) {
      throw new Error(JSON.stringify(parseRes.error.format(), null, 2));
    }
    return mapTorrentRpcToTorrent(parseRes.data);
  });
}

export type GetTorrentArguments = {
  fields: ["id", "name"?, "status"?, "percentDone"?, "eta"?, "downloadDir"?];
};

function getTorrentsPayload(sessionId?: string) {
  const args: GetTorrentArguments = {
    fields: ["id", "name", "status", "percentDone", "eta", "downloadDir"],
  };

  return basePayload(args, RpcMethod.Get, sessionId);
}
