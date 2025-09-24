import { getTorrents } from "../src/methods";
import {
  RpcResponse,
  TorrentGetResponse,
  RpcResponseResult,
} from "../src/methods/common";
import * as sessionId from "../src/methods/common/session-id";
import { mapTorrentRpcToTorrent } from "../src/types";
import { TorrentRpc } from "../src/validation";

describe("Get torrents test", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(sessionId, "fetchSessionId").mockResolvedValue("123");
  });

  const fetchResponseFixture = (
    result: RpcResponseResult,
    torrents?: any[]
  ): any => ({
    json: async (): Promise<RpcResponse<TorrentGetResponse>> => ({
      result: result,
      arguments: torrents ? { torrents: torrents } : undefined,
    }),
  });

  const torrentRpcFixture: TorrentRpc = {
    id: 1,
    name: "flac audio",
    status: 0,
    percentDone: 0,
    eta: 120,
    downloadDir: "./downloads",
  };

  it("should throw an error when transmission response result is not success", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(
        fetchResponseFixture(RpcResponseResult.MethodNotFound, [])
      );

    await expect(getTorrents()).rejects.toThrow();
  });

  it("should throw an error when parsing malformed data", async () => {
    const malformedTorrent = {
      ...torrentRpcFixture,
      id: undefined,
    };

    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(
        fetchResponseFixture(RpcResponseResult.Success, [malformedTorrent])
      );

    await expect(getTorrents()).rejects.toThrow();
  });

  it("should map and return torrents", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(
        fetchResponseFixture(RpcResponseResult.Success, [torrentRpcFixture])
      );

    const torrents = await getTorrents();

    expect(torrents).toStrictEqual(
      [torrentRpcFixture].map((torrent) => mapTorrentRpcToTorrent(torrent))
    );
  });
});
