import { z } from "zod";
import { TorrentStatus } from "../types";

export const TorrentResponseSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
  status: z.union([
    z.literal(TorrentStatus.Stopped),
    z.literal(TorrentStatus.CheckWait),
    z.literal(TorrentStatus.Check),
    z.literal(TorrentStatus.DownloadWait),
    z.literal(TorrentStatus.Download),
    z.literal(TorrentStatus.SeedWait),
    z.literal(TorrentStatus.Seed),
  ]),
  percentDone: z.number().min(0).max(1),
  eta: z.union([z.literal("Unknown"), z.literal("Stopped"), z.number().min(0)]),
  downloadDir: z.string(),
});

export type TorrentResponse = z.infer<typeof TorrentResponseSchema>;
