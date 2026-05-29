import { filterBooksByStatus } from './bookFilter';

describe('상태 필터링 로직', () => {
  const mockBooks = [
    { title: '클린 코드', author: '로버트 마틴', status: '완독' },
    { title: '자바스크립트 완벽 가이드', author: '데이비드 플래너건', status: '읽는 중' },
    { title: '파이썬 크래시 코스', author: '에릭 매티스', status: '읽고 싶음' },
    { title: 'Clean Architecture', author: '로버트 마틴', status: '완독' },
    { title: '열혈강의 JavaScript', author: '윤인성', status: '읽는 중' },
    { title: '디자인 패턴', author: '감 아메로타', status: '읽고 싶음' },
  ];

  describe('읽고 싶음 필터', () => {
    it('읽고 싶음 상태 필터 시 해당 상태만 반환', () => {
      const result = filterBooksByStatus(mockBooks, '읽고 싶음');
      expect(result).toHaveLength(2);
      expect(result.every((book) => book.status === '읽고 싶음')).toBe(true);
    });

    it('읽고 싶음 필터 시 올바른 도서 반환', () => {
      const result = filterBooksByStatus(mockBooks, '읽고 싶음');
      expect(result.map((book) => book.title)).toEqual([
        '파이썬 크래시 코스',
        '디자인 패턴',
      ]);
    });

    it('읽고 싶음 도서가 없을 때 빈 배열 반환', () => {
      const booksWithoutWant = mockBooks.filter((b) => b.status !== '읽고 싶음');
      const result = filterBooksByStatus(booksWithoutWant, '읽고 싶음');
      expect(result).toHaveLength(0);
    });
  });

  describe('읽는 중 필터', () => {
    it('읽는 중 상태 필터 시 해당 상태만 반환', () => {
      const result = filterBooksByStatus(mockBooks, '읽는 중');
      expect(result).toHaveLength(2);
      expect(result.every((book) => book.status === '읽는 중')).toBe(true);
    });

    it('읽는 중 필터 시 올바른 도서 반환', () => {
      const result = filterBooksByStatus(mockBooks, '읽는 중');
      expect(result.map((book) => book.title)).toEqual([
        '자바스크립트 완벽 가이드',
        '열혈강의 JavaScript',
      ]);
    });

    it('읽는 중 도서가 없을 때 빈 배열 반환', () => {
      const booksWithoutReading = mockBooks.filter((b) => b.status !== '읽는 중');
      const result = filterBooksByStatus(booksWithoutReading, '읽는 중');
      expect(result).toHaveLength(0);
    });
  });

  describe('완독 필터', () => {
    it('완독 상태 필터 시 해당 상태만 반환', () => {
      const result = filterBooksByStatus(mockBooks, '완독');
      expect(result).toHaveLength(2);
      expect(result.every((book) => book.status === '완독')).toBe(true);
    });

    it('완독 필터 시 올바른 도서 반환', () => {
      const result = filterBooksByStatus(mockBooks, '완독');
      expect(result.map((book) => book.title)).toEqual([
        '클린 코드',
        'Clean Architecture',
      ]);
    });

    it('완독 도서가 없을 때 빈 배열 반환', () => {
      const booksWithoutFinished = mockBooks.filter((b) => b.status !== '완독');
      const result = filterBooksByStatus(booksWithoutFinished, '완독');
      expect(result).toHaveLength(0);
    });
  });

  describe('전체 필터', () => {
    it('all 필터 시 전체 목록 반환', () => {
      const result = filterBooksByStatus(mockBooks, 'all');
      expect(result).toHaveLength(6);
      expect(result).toEqual(mockBooks);
    });

    it('전체 목록은 원본 배열과 같음', () => {
      const result = filterBooksByStatus(mockBooks, 'all');
      expect(result).toEqual(mockBooks);
    });

    it('빈 배열에 all 필터 시 빈 배열 반환', () => {
      const result = filterBooksByStatus([], 'all');
      expect(result).toHaveLength(0);
    });
  });

  describe('복합 시나리오', () => {
    it('단일 도서만 있을 때 필터링', () => {
      const singleBook = [mockBooks[0]];
      const result = filterBooksByStatus(singleBook, '완독');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('클린 코드');
    });

    it('모든 도서가 같은 상태일 때 필터링', () => {
      const booksAllFinished = mockBooks.map((b) => ({ ...b, status: '완독' }));
      const result = filterBooksByStatus(booksAllFinished, '완독');
      expect(result).toHaveLength(6);
      expect(result).toEqual(booksAllFinished);
    });

    it('모든 도서가 같은 상태일 때 다른 상태 필터링', () => {
      const booksAllFinished = mockBooks.map((b) => ({ ...b, status: '완독' }));
      const result = filterBooksByStatus(booksAllFinished, '읽는 중');
      expect(result).toHaveLength(0);
    });
  });

  describe('엣지 케이스', () => {
    it('빈 배열에 필터링', () => {
      const result = filterBooksByStatus([], '읽고 싶음');
      expect(result).toHaveLength(0);
    });

    it('존재하지 않는 상태로 필터링', () => {
      const result = filterBooksByStatus(mockBooks, '존재하지않는상태');
      expect(result).toHaveLength(0);
    });

    it('null 상태로 필터링', () => {
      const booksWithNull = [
        ...mockBooks,
        { title: '테스트', author: '저자', status: null },
      ];
      const result = filterBooksByStatus(booksWithNull, null);
      expect(result).toHaveLength(1);
      expect(result[0].status).toBeNull();
    });

    it('대소문자 구분하여 필터링', () => {
      const result = filterBooksByStatus(mockBooks, '읽고싶음');
      expect(result).toHaveLength(0);
    });

    it('공백이 포함된 상태로 필터링', () => {
      const result = filterBooksByStatus(mockBooks, ' 읽고 싶음');
      expect(result).toHaveLength(0);
    });
  });

  describe('필터링 결과 검증', () => {
    it('필터링된 도서 개수 검증', () => {
      const wantBooks = filterBooksByStatus(mockBooks, '읽고 싶음');
      const readingBooks = filterBooksByStatus(mockBooks, '읽는 중');
      const finishedBooks = filterBooksByStatus(mockBooks, '완독');
      const allBooks = filterBooksByStatus(mockBooks, 'all');

      expect(
        wantBooks.length + readingBooks.length + finishedBooks.length
      ).toBe(allBooks.length);
    });

    it('필터링 결과에 다른 상태 포함 안 됨', () => {
      const wantBooks = filterBooksByStatus(mockBooks, '읽고 싶음');
      expect(wantBooks.some((b) => b.status !== '읽고 싶음')).toBe(false);
    });

    it('원본 배열 수정 안 함', () => {
      const originalBooks = JSON.parse(JSON.stringify(mockBooks));
      filterBooksByStatus(mockBooks, '읽고 싶음');
      expect(mockBooks).toEqual(originalBooks);
    });
  });
});
