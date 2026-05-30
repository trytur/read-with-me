import { render, screen } from "@testing-library/react";
import DonutChart from "./DonutChart";

describe("DonutChart 컴포넌트", () => {
  describe("빈 상태", () => {
    it('statusCount가 모두 0이면 "기록된 도서가 없습니다" 텍스트가 표시된다', () => {
      render(
        <DonutChart statusCount={{ 읽고싶음: 0, 읽는중: 0, 완독: 0 }} />
      );

      expect(
        screen.getByText("기록된 도서가 없습니다.")
      ).toBeInTheDocument();
    });
  });

  describe("차트 렌더링", () => {
    const statusCount = { 읽고싶음: 2, 읽는중: 3, 완독: 1 };

    it('총 도서 수가 "N권" 형식으로 표시된다', () => {
      render(<DonutChart statusCount={statusCount} />);

      expect(screen.getByText("6권")).toBeInTheDocument();
    });

    it("읽고 싶음, 읽는 중, 완독 범례가 렌더링된다", () => {
      render(<DonutChart statusCount={statusCount} />);

      expect(screen.getByText("읽고 싶음")).toBeInTheDocument();
      expect(screen.getByText("읽는 중")).toBeInTheDocument();
      expect(screen.getByText("완독")).toBeInTheDocument();
    });
  });
});
