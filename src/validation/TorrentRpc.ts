import { z } from "zod";

export const TorrentRpcSchema = z
  .object({
    id: z.number().min(1),
    name: z.string(),
    status: z.union([
      z.literal(0), // stopped
      z.literal(1), // check wait
      z.literal(2), // check
      z.literal(3), // download wait
      z.literal(4), // download
      z.literal(5), // seed wait
      z.literal(6), // seed
    ]),
    percentDone: z.number().min(0).max(1),
    eta: z.union([
      z.literal(-1), // unknown
      z.literal(-2), // stopped/none
      z.number().min(0), // seconds remaining
    ]),
    downloadDir: z.string(),
  })
  .strip();

export type TorrentRpc = z.infer<typeof TorrentRpcSchema>;
