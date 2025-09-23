export enum TorrentStatus {
  Stopped = "Stopped",
  CheckWait = "CheckWait",
  Check = "Check",
  DownloadWait = "DownloadWait",
  Download = "Download",
  SeedWait = "SeedWait",
  Seed = "Seed",
}

export type TorrentEta = "Unknown" | "Stopped" | number;
