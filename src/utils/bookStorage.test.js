import { STORAGE_KEY } from "../constants/storageKey";
import { getBooksFromStorage, saveBooksToStorage } from "./bookStorage";

describe("bookStorage - 독서 기록 저장소 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("저장된 도서 기록이 없으면 빈 배열을 반환한다", () => {
    expect(getBooksFromStorage()).toEqual([]);
  });

  it("도서 기록 목록을 정해진 STORAGE_KEY에 저장한다", () => {
    const books = [
      {
        title: "Demian",
        author: "Hermann Hesse",
      },
    ];

    saveBooksToStorage(books);

    expect(localStorage.getItem(STORAGE_KEY.BOOKS)).toBe(JSON.stringify(books));
  });

  it("저장된 도서 기록 목록을 불러온다", () => {
    const books = [
      {
        title: "Demian",
        author: "Hermann Hesse",
      },
    ];

    localStorage.setItem(STORAGE_KEY.BOOKS, JSON.stringify(books));

    expect(getBooksFromStorage()).toEqual(books);
  });

  it("기존 도서 기록 목록을 새 목록으로 덮어쓴다", () => {
    const firstBooks = [{ title: "Old Book", author: "Old Author" }];
    const nextBooks = [{ title: "New Book", author: "New Author" }];

    saveBooksToStorage(firstBooks);
    saveBooksToStorage(nextBooks);

    expect(getBooksFromStorage()).toEqual(nextBooks);
  });
});
