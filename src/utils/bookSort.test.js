import { sortBooks } from './bookSort';

describe('정렬 로직', () => {
  const mockBooks = [
    {
      title: '클린 코드',
      author: '로버트 마틴',
      progressRate: 50,
      rating: 4.5,
      recentReadDate: '2026-05-20',
    },
    {
      title: '자바스크립트 완벽 가이드',
      author: '데이비드 플래너건',
      progressRate: 100,
      rating: 4,
      recentReadDate: '2026-05-25',
    },
    {
      title: '파이썬 크래시 코스',
      author: '에릭 매티스',
      progressRate: 30,
      rating: 3.5,
      recentReadDate: '2026-05-15',
    },
    {
      title: '디자인 패턴',
      author: '감 아메로타',
      progressRate: 75,
      rating: 5,
      recentReadDate: '2026-05-28',
    },
    {
      title: '리팩토링',
      author: '마틴 파울러',
      progressRate: 60,
      rating: null,
      recentReadDate: null,
    },
  ];

  describe('제목 가나다순 정렬', () => {
    it('제목을 가나다순으로 정렬', () => {
      const result = sortBooks(mockBooks, 'title-asc');
      expect(result[0].title).toBe('디자인 패턴');
      expect(result[1].title).toBe('리팩토링');
      expect(result[2].title).toBe('자바스크립트 완벽 가이드');
      expect(result[3].title).toBe('클린 코드');
      expect(result[4].title).toBe('파이썬 크래시 코스');
    });

    it('원본 배열을 수정하지 않음', () => {
      const originalBooks = [...mockBooks];
      sortBooks(mockBooks, 'title-asc');
      expect(mockBooks).toEqual(originalBooks);
    });
  });

  describe('최근 읽은 날짜 최신순 정렬', () => {
    it('최근 읽은 날짜가 최신인 것부터 정렬', () => {
      const result = sortBooks(mockBooks, 'date-desc');
      expect(result[0].recentReadDate).toBe('2026-05-28');
      expect(result[1].recentReadDate).toBe('2026-05-25');
      expect(result[2].recentReadDate).toBe('2026-05-20');
      expect(result[3].recentReadDate).toBe('2026-05-15');
    });

    it('날짜가 null인 도서는 맨 뒤로', () => {
      const result = sortBooks(mockBooks, 'date-desc');
      expect(result[result.length - 1].recentReadDate).toBeNull();
    });

    it('모두 null인 경우 순서 유지', () => {
      const booksAllNull = mockBooks.map((book) => ({
        ...book,
        recentReadDate: null,
      }));
      const result = sortBooks(booksAllNull, 'date-desc');
      expect(result).toHaveLength(5);
      expect(result.every((book) => book.recentReadDate === null)).toBe(true);
    });
  });

  describe('최근 읽은 날짜 오래된 순 정렬', () => {
    it('가장 오래 읽은 날짜부터 정렬', () => {
      const result = sortBooks(mockBooks, 'date-asc');
      expect(result[0].recentReadDate).toBe('2026-05-15');
      expect(result[1].recentReadDate).toBe('2026-05-20');
      expect(result[2].recentReadDate).toBe('2026-05-25');
      expect(result[3].recentReadDate).toBe('2026-05-28');
    });

    it('날짜가 null인 도서는 맨 뒤로', () => {
      const result = sortBooks(mockBooks, 'date-asc');
      expect(result[result.length - 1].recentReadDate).toBeNull();
    });
  });

  describe('진도율 높은 순 정렬', () => {
    it('진도율이 높은 순서대로 정렬', () => {
      const result = sortBooks(mockBooks, 'progress-desc');
      expect(result[0].progressRate).toBe(100);
      expect(result[1].progressRate).toBe(75);
      expect(result[2].progressRate).toBe(60);
      expect(result[3].progressRate).toBe(50);
      expect(result[4].progressRate).toBe(30);
    });

    it('같은 진도율인 경우 원래 순서 유지', () => {
      const booksWithSameProgress = [
        { title: 'A', progressRate: 50, recentReadDate: null, rating: null },
        { title: 'B', progressRate: 50, recentReadDate: null, rating: null },
        { title: 'C', progressRate: 50, recentReadDate: null, rating: null },
      ];
      const result = sortBooks(booksWithSameProgress, 'progress-desc');
      expect(result.map((b) => b.title)).toEqual(['A', 'B', 'C']);
    });
  });

  describe('별점 높은 순 정렬', () => {
    it('별점이 높은 순서대로 정렬', () => {
      const result = sortBooks(mockBooks, 'rating-desc');
      expect(result[0].rating).toBe(5);
      expect(result[1].rating).toBe(4.5);
      expect(result[2].rating).toBe(4);
      expect(result[3].rating).toBe(3.5);
    });

    it('별점이 null인 도서는 맨 뒤로', () => {
      const result = sortBooks(mockBooks, 'rating-desc');
      expect(result[result.length - 1].rating).toBeNull();
    });

    it('모두 null인 경우 순서 유지', () => {
      const booksAllNull = mockBooks.map((book) => ({
        ...book,
        rating: null,
      }));
      const result = sortBooks(booksAllNull, 'rating-desc');
      expect(result).toHaveLength(5);
      expect(result.every((book) => book.rating === null)).toBe(true);
    });

    it('소수점 별점 정렬 (0.5 단위)', () => {
      const booksWithDecimal = [
        { title: 'A', progressRate: 0, recentReadDate: null, rating: 3.5 },
        { title: 'B', progressRate: 0, recentReadDate: null, rating: 4.5 },
        { title: 'C', progressRate: 0, recentReadDate: null, rating: 3.0 },
      ];
      const result = sortBooks(booksWithDecimal, 'rating-desc');
      expect(result.map((b) => b.rating)).toEqual([4.5, 3.5, 3.0]);
    });
  });

  describe('정렬 옵션에 따른 우선순위 및 null 처리', () => {
    it('타이틀 정렬은 모든 도서 정렬 (null 무관)', () => {
      const result = sortBooks(mockBooks, 'title-asc');
      expect(result).toHaveLength(5);
    });

    it('날짜 정렬에서 null과 non-null 혼합', () => {
      const booksWithMixed = [
        { title: 'A', progressRate: 0, recentReadDate: null, rating: null },
        { title: 'B', progressRate: 0, recentReadDate: '2026-05-20', rating: null },
        { title: 'C', progressRate: 0, recentReadDate: '2026-05-10', rating: null },
      ];
      const result = sortBooks(booksWithMixed, 'date-desc');
      expect(result[0].title).toBe('B');
      expect(result[1].title).toBe('C');
      expect(result[2].title).toBe('A');
    });

    it('별점 정렬에서 null과 non-null 혼합', () => {
      const booksWithMixed = [
        { title: 'A', progressRate: 0, recentReadDate: null, rating: null },
        { title: 'B', progressRate: 0, recentReadDate: null, rating: 4 },
        { title: 'C', progressRate: 0, recentReadDate: null, rating: 2 },
      ];
      const result = sortBooks(booksWithMixed, 'rating-desc');
      expect(result[0].title).toBe('B');
      expect(result[1].title).toBe('C');
      expect(result[2].title).toBe('A');
    });
  });

  describe('잘못된 정렬 옵션', () => {
    it('존재하지 않는 정렬 옵션은 원래 순서 유지', () => {
      const result = sortBooks(mockBooks, 'invalid-option');
      expect(result).toEqual(mockBooks);
    });

    it('빈 문자열 정렬 옵션은 원래 순서 유지', () => {
      const result = sortBooks(mockBooks, '');
      expect(result).toEqual(mockBooks);
    });
  });

  describe('다양한 날짜 형식 정렬', () => {
    it('ISO 8601 형식 날짜 정렬', () => {
      const booksWithIso = [
        { title: 'A', progressRate: 0, recentReadDate: '2026-05-20', rating: null },
        { title: 'B', progressRate: 0, recentReadDate: '2026-05-10', rating: null },
        { title: 'C', progressRate: 0, recentReadDate: '2026-05-30', rating: null },
      ];
      const result = sortBooks(booksWithIso, 'date-desc');
      expect(result.map((b) => b.title)).toEqual(['C', 'A', 'B']);
    });

    it('같은 날짜인 경우 순서 유지', () => {
      const booksWithSameDate = [
        { title: 'A', progressRate: 0, recentReadDate: '2026-05-20', rating: null },
        { title: 'B', progressRate: 0, recentReadDate: '2026-05-20', rating: null },
        { title: 'C', progressRate: 0, recentReadDate: '2026-05-20', rating: null },
      ];
      const result = sortBooks(booksWithSameDate, 'date-desc');
      expect(result.map((b) => b.title)).toEqual(['A', 'B', 'C']);
    });
  });
});
