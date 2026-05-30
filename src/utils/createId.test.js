import { createId } from "./createId";

describe("createId - ID 생성 테스트", () => {
  it("문자열 타입의 ID를 생성한다", () => {
    const id = createId();

    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("여러 번 호출하면 각각 ID를 생성한다", () => {
    const firstId = createId();
    const secondId = createId();

    expect(typeof firstId).toBe("string");
    expect(typeof secondId).toBe("string");
    expect(firstId.length).toBeGreaterThan(0);
    expect(secondId.length).toBeGreaterThan(0);
  });
});
