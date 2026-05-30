import { render, screen } from "@testing-library/react";
import StatsSummary from "./StatsSummary";

describe("StatsSummary 컴포넌트", () => {
  const defaultProps = {
    averageProgress: 75,
    statusCount: { 읽고싶음: 2, 읽는중: 3, 완독: 1 },
    totalReadDays: 14,
  };

  describe("수치 표시", () => {
    it('평균 진도율이 "75%" 형식으로 렌더링된다', () => {
      render(<StatsSummary {...defaultProps} />);

      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it('상태별 도서 수가 "N권" 형식으로 렌더링된다', () => {
      render(<StatsSummary {...defaultProps} />);

      expect(screen.getByText("2권")).toBeInTheDocument();
      expect(screen.getByText("3권")).toBeInTheDocument();
      expect(screen.getByText("1권")).toBeInTheDocument();
    });

    it('총 독서 일수가 "N일" 형식으로 렌더링된다', () => {
      render(<StatsSummary {...defaultProps} />);

      expect(screen.getByText("14일")).toBeInTheDocument();
    });
  });
});
