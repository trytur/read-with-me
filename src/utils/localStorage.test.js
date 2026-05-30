import { getStorageData, setStorageData } from "./localStorage";

describe("localStorage utility - 저장소 입출력 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("저장된 데이터가 없으면 기본값을 반환한다", () => {
    const result = getStorageData("empty-key", []);

    expect(result).toEqual([]);
  });

  it("저장된 JSON 데이터를 파싱해서 반환한다", () => {
    const books = [{ title: "Demian", author: "Hermann Hesse" }];

    localStorage.setItem("books", JSON.stringify(books));

    expect(getStorageData("books", [])).toEqual(books);
  });

  it("JSON 파싱에 실패하면 기본값을 반환한다", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    localStorage.setItem("broken-json", "{ invalid json");

    const result = getStorageData("broken-json", []);

    expect(result).toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
  });

  it("데이터를 JSON 문자열로 변환해 localStorage에 저장한다", () => {
    const books = [{ title: "Demian", author: "Hermann Hesse" }];

    setStorageData("books", books);

    expect(localStorage.getItem("books")).toBe(JSON.stringify(books));
  });

  it("저장 중 오류가 발생해도 예외를 밖으로 던지지 않는다", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage error");
    });

    expect(() => setStorageData("books", [])).not.toThrow();
    expect(errorSpy).toHaveBeenCalled();
  });
});
