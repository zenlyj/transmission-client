import { TorrentRpc } from "../validation";
import { TorrentEta, TorrentStatus } from "./TorrentFields";

export interface Torrent {
  id: number;
  name: string;
  status: TorrentStatus;
  percentDone: number;
  eta: TorrentEta;
  downloadDir: string;
}

export function mapTorrentRpcToTorrent({
  id,
  name,
  status,
  percentDone,
  eta,
  downloadDir,
}: TorrentRpc): Torrent {
  let torrentEta: TorrentEta;
  switch (eta) {
    case -1:
      torrentEta = "Unknown";
      break;
    case -2:
      torrentEta = "Stopped";
      break;
    default:
      torrentEta = eta;
  }

  const torrentStatus = Object.values(TorrentStatus).at(
    status
  ) as TorrentStatus; // index bound validated by zod

  return {
    id: id,
    name: name,
    status: torrentStatus,
    percentDone: percentDone,
    eta: torrentEta,
    downloadDir: downloadDir,
  };
}
