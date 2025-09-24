import { fetchSessionId, resetCache } from "../src/methods/common/session-id";

describe("Session id test", () => {
  beforeEach(() => {
    resetCache();
    jest.restoreAllMocks();
  });

  const fetchResponseFixture = (
    status: number,
    sessionId: string | null
  ): any => ({
    status: status,
    headers: { get: () => sessionId },
  });

  const mockSessionId = "id";

  it("should fetch new session id when not cached", async () => {
    const mockFetch = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseFixture(409, mockSessionId));

    const res = await fetchSessionId();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(res).toBe(mockSessionId);
  });

  it("should return cached session id", async () => {
    const mockFetch = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseFixture(409, mockSessionId));

    await fetchSessionId();
    const result = await fetchSessionId();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockSessionId);
  });

  it("should throw an error when status is not 409", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseFixture(200, mockSessionId));

    await expect(fetchSessionId()).rejects.toThrow();
  });

  it("should throw an error when session id is missing from headers", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseFixture(409, null));

    await expect(fetchSessionId()).rejects.toThrow();
  });
});
