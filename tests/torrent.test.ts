import { mapTorrentRpcToTorrent, TorrentStatus } from "../src/types";
import { TorrentRpc } from "../src/validation";

describe("Torrent test", () => {
  const torrentRpcFixture: TorrentRpc = {
    id: 1,
    name: "flac audio",
    status: 0,
    percentDone: 0,
    eta: 120,
    downloadDir: "./downloads",
  };

  it("should map Torrent eta to `Unknown` literal", () => {
    const torrentRpcFixtureWithUnknownEta: TorrentRpc = {
      ...torrentRpcFixture,
      eta: -1,
    };

    const torrent = mapTorrentRpcToTorrent(torrentRpcFixtureWithUnknownEta);

    expect(torrent.eta).toBe("Unknown");
  });

  it("should map Torrent eta to `Stopped` literal", () => {
    const torrentRpcFixturetWithStoppedEta: TorrentRpc = {
      ...torrentRpcFixture,
      eta: -2,
    };

    const torrent = mapTorrentRpcToTorrent(torrentRpcFixturetWithStoppedEta);

    expect(torrent.eta).toBe("Stopped");
  });

  it("should map Torrent eta to number", () => {
    const torrent = mapTorrentRpcToTorrent(torrentRpcFixture);

    expect(torrent.eta).toBe(torrentRpcFixture.eta);
  });

  it("should map Torrent status to `Download` literal", () => {
    const torrentRpcFixtureWithDownloadStatus: TorrentRpc = {
      ...torrentRpcFixture,
      status: 4,
    };

    const torrent = mapTorrentRpcToTorrent(torrentRpcFixtureWithDownloadStatus);

    expect(torrent.status).toBe(TorrentStatus.Download);
  });

  it("should map Torrent status to `Stopped` literal", () => {
    const torrentRpcFixtureWithStoppedStatus: TorrentRpc = {
      ...torrentRpcFixture,
      status: 0,
    };

    const torrent = mapTorrentRpcToTorrent(torrentRpcFixtureWithStoppedStatus);

    expect(torrent.status).toBe(TorrentStatus.Stopped);
  });
});
