import { render, screen, fireEvent } from "@testing-library/react";
import AttendanceCalendar from "./AttendanceCalendar";

describe("AttendanceCalendar 컴포넌트", () => {
  describe("초기 렌더링", () => {
    it("현재 년도와 월이 표시된다", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      render(<AttendanceCalendar allDateLogs={[]} />);

      expect(screen.getByText(`${year}년 ${month}월`)).toBeInTheDocument();
    });
  });

  describe("월 이동", () => {
    it("◀ 버튼 클릭 시 이전 달로 이동한다", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      render(<AttendanceCalendar allDateLogs={[]} />);

      fireEvent.click(screen.getByText("◀"));

      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      expect(screen.getByText(`${prevYear}년 ${prevMonth}월`)).toBeInTheDocument();
    });

    it("▶ 버튼 클릭 시 다음 달로 이동한다", () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      render(<AttendanceCalendar allDateLogs={[]} />);

      fireEvent.click(screen.getByText("▶"));

      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      expect(screen.getByText(`${nextYear}년 ${nextMonth}월`)).toBeInTheDocument();
    });

    it("1월에서 ◀ 클릭 시 전년도 12월로 이동한다", () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2026-01-15"));

      render(<AttendanceCalendar allDateLogs={[]} />);

      fireEvent.click(screen.getByText("◀"));

      expect(screen.getByText("2025년 12월")).toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe("독서 날짜 표시", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2026-05-15"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("allDateLogs에 있는 날짜에 active 클래스가 적용된다", () => {
      const { container } = render(
        <AttendanceCalendar allDateLogs={["2026-05-10"]} />
      );

      const activeDays = container.querySelectorAll(".calendar-day.active");
      const texts = Array.from(activeDays).map((el) => el.textContent);

      expect(activeDays.length).toBe(1);
      expect(texts).toContain("10");
    });

    it("allDateLogs에 없는 날짜에 active 클래스가 적용되지 않는다", () => {
      const { container } = render(
        <AttendanceCalendar allDateLogs={["2026-05-10"]} />
      );

      const allDays = container.querySelectorAll(".calendar-day:not(.empty)");
      const day15 = Array.from(allDays).find((el) => el.textContent === "15");

      expect(day15).not.toHaveClass("active");
    });
  });
});
