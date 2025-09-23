import { mapTorrentRpcToTorrent, TorrentStatus } from "../src/types";
import { TorrentRpc } from "../src/validation";

describe("Torrent test", () => {
  const mockTorrentRpc: TorrentRpc = {
    id: 1,
    name: "flac audio",
    status: 0,
    percentDone: 0,
    eta: 120,
    downloadDir: "./downloads",
  };

  it("should map Torrent eta to `Unknown` literal", () => {
    const mockTorrentRpcWithUnknownEta: TorrentRpc = {
      ...mockTorrentRpc,
      eta: -1,
    };

    const torrent = mapTorrentRpcToTorrent(mockTorrentRpcWithUnknownEta);

    expect(torrent.eta).toBe("Unknown");
  });

  it("should map Torrent eta to `Stopped` literal", () => {
    const mockTorrenRpctWithStoppedEta: TorrentRpc = {
      ...mockTorrentRpc,
      eta: -2,
    };

    const torrent = mapTorrentRpcToTorrent(mockTorrenRpctWithStoppedEta);

    expect(torrent.eta).toBe("Stopped");
  });

  it("should map Torrent eta to number", () => {
    const torrent = mapTorrentRpcToTorrent(mockTorrentRpc);

    expect(torrent.eta).toBe(mockTorrentRpc.eta);
  });

  it("should map Torrent status to `Download` literal", () => {
    const mockTorrentRpcWithDownloadStatus: TorrentRpc = {
      ...mockTorrentRpc,
      status: 4,
    };

    const torrent = mapTorrentRpcToTorrent(mockTorrentRpcWithDownloadStatus);

    expect(torrent.status).toBe(TorrentStatus.Download);
  });

  it("should map Torrent status to `Stopped` literal", () => {
    const mockTorrentRpcWithStoppedStatus: TorrentRpc = {
      ...mockTorrentRpc,
      status: 0,
    };

    const torrent = mapTorrentRpcToTorrent(mockTorrentRpcWithStoppedStatus);

    expect(torrent.status).toBe(TorrentStatus.Stopped);
  });
});
