import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("layout 화면 구성 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("앱의 기본 제목이 화면에 표시된다", () => {
    render(<App />);

    expect(screen.getByText("ReadWithMe")).toBeInTheDocument();
  });

  it("주요 탭 메뉴가 화면에 표시된다", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "독서 기록" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "서재" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "통계" })).toBeInTheDocument();
  });

  it("서재 탭을 클릭하면 서재 화면으로 이동한다", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "서재" }));

    expect(screen.getByRole("heading", { name: /서재/ })).toBeInTheDocument();
  });
});