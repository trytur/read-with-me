import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("독서 기록 작성 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("제목과 저자를 입력하면 독서 기록이 localStorage에 저장된다", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("예: 데미안"), {
      target: { value: "데미안" },
    });

    fireEvent.change(screen.getByPlaceholderText("예: 헤르만 헤세"), {
      target: { value: "헤르만 헤세" },
    });

    fireEvent.click(screen.getByRole("button", { name: "기록 저장" }));

    const savedBooks = JSON.parse(localStorage.getItem("readWithMeBooks") || "[]");

    expect(savedBooks).toHaveLength(1);
    expect(savedBooks[0].title).toBe("데미안");
    expect(savedBooks[0].author).toBe("헤르만 헤세");
  });

  it("제목이 비어 있으면 독서 기록이 저장되지 않는다", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("예: 헤르만 헤세"), {
      target: { value: "헤르만 헤세" },
    });

    fireEvent.click(screen.getByRole("button", { name: "기록 저장" }));

    const savedBooks = JSON.parse(localStorage.getItem("readWithMeBooks") || "[]");

    expect(savedBooks).toHaveLength(0);
  });
});