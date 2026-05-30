import { createBookRecordFromForm } from "./bookRecordMapper";
import { getBookStatus } from "./bookStatus";

function createBaseForm(overrides = {}) {
  return {
    title: "  Demian  ",
    author: "  Hermann Hesse  ",
    publisher: "  Minumsa  ",
    progressRate: "50",
    startDate: "2026-05-01",
    finishDate: "2026-05-20",
    recentReadDate: "2026-05-15",
    rating: "4.5",
    impression: "  This book was impressive.  ",
    quote: "  The bird fights its way out of the egg.  ",
    oneLineReview: "  A memorable growth novel.  ",
    ...overrides,
  };
}

describe("bookRecordMapper - 독서 기록 데이터 매핑 테스트", () => {
  it("입력 폼 데이터를 독서 기록 객체 구조로 변환한다", () => {
    const record = createBookRecordFromForm(createBaseForm());

    expect(record.title).toBe("Demian");
    expect(record.author).toBe("Hermann Hesse");
    expect(record.publisher).toBe("Minumsa");
    expect(record.progressRate).toBe(50);
    expect(record.rating).toBe(4.5);
    expect(record.status).toBe(getBookStatus(50));
    expect(record.startDate).toBe("2026-05-01");
    expect(record.finishDate).toBe("2026-05-20");
    expect(record.recentReadDate).toBe("2026-05-15");
  });

  it("memo 입력값의 앞뒤 공백을 제거해 저장한다", () => {
    const record = createBookRecordFromForm(createBaseForm());

    expect(record.memo.impression).toBe("This book was impressive.");
    expect(record.memo.quote).toBe("The bird fights its way out of the egg.");
    expect(record.memo.oneLineReview).toBe("A memorable growth novel.");
  });

  it("최근 읽은 날짜가 있으면 dateLogs를 생성한다", () => {
    const record = createBookRecordFromForm(createBaseForm());

    expect(record.dateLogs).toHaveLength(1);
    expect(record.dateLogs[0].readDate).toBe("2026-05-15");
    expect(typeof record.dateLogs[0].dateLogNo).toBe("string");
  });

  it("최근 읽은 날짜가 없으면 dateLogs는 빈 배열이다", () => {
    const record = createBookRecordFromForm(
      createBaseForm({
        recentReadDate: "",
      })
    );

    expect(record.dateLogs).toEqual([]);
  });

  it("진도율이 비어 있으면 0으로 저장하고 상태를 계산한다", () => {
    const record = createBookRecordFromForm(
      createBaseForm({
        progressRate: "",
      })
    );

    expect(record.progressRate).toBe(0);
    expect(record.status).toBe(getBookStatus(0));
  });

  it("별점이 비어 있으면 null로 저장한다", () => {
    const record = createBookRecordFromForm(
      createBaseForm({
        rating: "",
      })
    );

    expect(record.rating).toBeNull();
  });

  it("bookId, recordNo, memoNo, createdAt 값을 생성한다", () => {
    const record = createBookRecordFromForm(createBaseForm());

    expect(typeof record.bookId).toBe("string");
    expect(typeof record.recordNo).toBe("string");
    expect(typeof record.memo.memoNo).toBe("string");
    expect(new Date(record.createdAt).toString()).not.toBe("Invalid Date");
    expect(record.updatedAt).toBeNull();
  });

  it("진도율에 따라 getBookStatus 결과를 status로 저장한다", () => {
    const progressRates = [0, 1, 50, 99, 100];

    progressRates.forEach((progressRate) => {
      const record = createBookRecordFromForm(
        createBaseForm({
          progressRate: String(progressRate),
        })
      );

      expect(record.status).toBe(getBookStatus(progressRate));
    });
  });
});
