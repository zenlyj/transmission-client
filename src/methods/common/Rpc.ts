export enum RpcMethod {
  Get = "torrent-get",
}

export enum RpcResponseResult {
  Success = "success",
  MethodNotFound = "MethodNotFound",
  InvalidArgument = "InvalidArgument",
  DuplicateTorrent = "DuplicateTorrent",
}

export type RpcResponse<T> = {
  result: RpcResponseResult;
  arguments?: T;
};

export type TorrentGetResponse = {
  torrents: any[]; // will be passed to validation anyway
};
