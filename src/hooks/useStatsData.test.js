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

  describe("평균 진도율 계산", () => {
    it("진도율 50, 100인 책 2권일 때 평균 75를 반환한다", async () => {
      localStorage.setItem(
        "readWithMeBooks",
        JSON.stringify([
          { progressRate: 50 },
          { progressRate: 100 },
        ])
      );

      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.averageProgress).toBe(75);
    });

    it("책이 1권일 때 해당 진도율을 그대로 반환한다", async () => {
      localStorage.setItem(
        "readWithMeBooks",
        JSON.stringify([{ progressRate: 42 }])
      );

      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.averageProgress).toBe(42);
    });
  });

  describe("상태별 도서 수 계산", () => {
    const books = [
      { status: "읽고 싶음" },
      { status: "읽고 싶음" },
      { status: "읽는 중" },
      { status: "읽는 중" },
      { status: "읽는 중" },
      { status: "완독" },
    ];

    beforeEach(() => {
      localStorage.setItem("readWithMeBooks", JSON.stringify(books));
    });

    it("읽고 싶음 상태 도서 수를 올바르게 카운트한다", async () => {
      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.statusCount.읽고싶음).toBe(2);
    });

    it("읽는 중 상태 도서 수를 올바르게 카운트한다", async () => {
      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.statusCount.읽는중).toBe(3);
    });

    it("완독 상태 도서 수를 올바르게 카운트한다", async () => {
      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.statusCount.완독).toBe(1);
    });
  });

  describe("총 독서 일수 계산", () => {
    it("중복 날짜를 제거하고 고유 날짜 수를 반환한다", async () => {
      localStorage.setItem(
        "readWithMeBooks",
        JSON.stringify([
          {
            dateLogs: [
              { readDate: "2025-01-01" },
              { readDate: "2025-01-01" },
              { readDate: "2025-01-02" },
            ],
          },
          {
            dateLogs: [{ readDate: "2025-01-02" }, { readDate: "2025-01-03" }],
          },
        ])
      );

      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.totalReadDays).toBe(3);
    });

    it("dateLogs가 없는 책이 있어도 오류 없이 처리한다", async () => {
      localStorage.setItem(
        "readWithMeBooks",
        JSON.stringify([
          { dateLogs: [{ readDate: "2025-01-01" }] },
          {},
          { dateLogs: null },
        ])
      );

      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.totalReadDays).toBe(1);
    });

    it("dateLogs의 readDate 필드 기준으로 날짜를 추출한다", async () => {
      localStorage.setItem(
        "readWithMeBooks",
        JSON.stringify([
          {
            dateLogs: [
              { readDate: "2025-03-10", otherField: "무시됨" },
              { readDate: "2025-03-11" },
            ],
          },
        ])
      );

      const { result } = renderHook(() => useStatsData());

      await act(async () => {});

      expect(result.current.totalReadDays).toBe(2);
      expect(result.current.allDateLogs).toEqual(
        expect.arrayContaining(["2025-03-10", "2025-03-11"])
      );
    });
  });
});
