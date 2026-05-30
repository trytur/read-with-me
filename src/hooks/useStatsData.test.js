import { renderHook, act } from "@testing-library/react";
import useStatsData from "./useStatsData";

describe("useStatsData 훅", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("초기 상태", () => {
    it("localStorage에 데이터가 없으면 books가 빈 배열을 반환한다", async () => {
      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.books).toEqual([]);
    });

    it("localStorage에 데이터가 없으면 averageProgress가 0을 반환한다", async () => {
      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.averageProgress).toBe(0);
    });

    it("localStorage에 데이터가 없으면 totalReadDays가 0을 반환한다", async () => {
      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.totalReadDays).toBe(0);
    });
  });
});
