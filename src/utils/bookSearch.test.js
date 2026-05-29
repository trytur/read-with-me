import { filterBooksBySearch } from './bookSearch';

describe('검색 필터링 로직', () => {
  const mockBooks = [
    { title: '클린 코드', author: '로버트 마틴', status: '완독' },
    { title: '자바스크립트 완벽 가이드', author: '데이비드 플래너건', status: '읽는 중' },
    { title: '파이썬 크래시 코스', author: '에릭 매티스', status: '읽고 싶음' },
    { title: 'Clean Architecture', author: '로버트 마틴', status: '완독' },
    { title: '열혈강의 JavaScript', author: '윤인성', status: '읽는 중' },
  ];

  describe('제목 부분 일치 검색', () => {
    it('제목으로 부분 검색 시 일치하는 도서 반환', () => {
      const result = filterBooksBySearch(mockBooks, '클린');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('클린 코드');
    });

    it('정확한 제목 검색', () => {
      const result = filterBooksBySearch(mockBooks, '파이썬');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('파이썬 크래시 코스');
    });

    it('일치하는 제목이 없을 때 빈 배열 반환', () => {
      const result = filterBooksBySearch(mockBooks, '존재하지않는책');
      expect(result).toHaveLength(0);
    });

    it('영문 제목 검색', () => {
      const result = filterBooksBySearch(mockBooks, 'Architecture');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Clean Architecture');
    });
  });

  describe('저자 부분 일치 검색', () => {
    it('저자명으로 부분 검색 시 일치하는 도서 반환', () => {
      const result = filterBooksBySearch(mockBooks, '로버트');
      expect(result).toHaveLength(2);
      expect(result[0].author).toBe('로버트 마틴');
      expect(result[1].author).toBe('로버트 마틴');
    });

    it('저자 성만으로 검색 가능', () => {
      const result = filterBooksBySearch(mockBooks, '마틴');
      expect(result).toHaveLength(2);
    });

    it('일치하는 저자가 없을 때 빈 배열 반환', () => {
      const result = filterBooksBySearch(mockBooks, '없는저자');
      expect(result).toHaveLength(0);
    });
  });

  describe('대소문자 구분 없이 검색', () => {
    it('영문 대문자로 검색 시 일치하는 도서 반환', () => {
      const result = filterBooksBySearch(mockBooks, 'CLEAN');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Clean Architecture');
    });

    it('영문 소문자로 검색 시 일치하는 도서 반환', () => {
      const result = filterBooksBySearch(mockBooks, 'javascript');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('열혈강의 JavaScript');
    });

    it('혼합 대소문자로 검색 시 일치하는 도서 반환', () => {
      const result = filterBooksBySearch(mockBooks, 'JaVaScRiPt');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('열혈강의 JavaScript');
    });
  });

  describe('검색어 없을 때 전체 목록 반환', () => {
    it('빈 문자열 입력 시 전체 목록 반환', () => {
      const result = filterBooksBySearch(mockBooks, '');
      expect(result).toHaveLength(5);
      expect(result).toEqual(mockBooks);
    });

    it('공백만 있는 문자열 입력 시 전체 목록 반환', () => {
      const result = filterBooksBySearch(mockBooks, '   ');
      expect(result).toHaveLength(5);
    });

    it('undefined 입력 시 전체 목록 반환', () => {
      const result = filterBooksBySearch(mockBooks, undefined);
      expect(result).toHaveLength(5);
    });

    it('null 입력 시 전체 목록 반환', () => {
      const result = filterBooksBySearch(mockBooks, null);
      expect(result).toHaveLength(5);
    });
  });

  describe('제목과 저자 동시 검색', () => {
    it('제목 또는 저자 중 하나 일치해도 반환', () => {
      const result = filterBooksBySearch(mockBooks, '마틴');
      expect(result).toHaveLength(2);
      expect(result.every(book => book.author.includes('마틴'))).toBe(true);
    });

    it('제목과 저자 모두에서 검색 결과 나타남', () => {
      const result = filterBooksBySearch(mockBooks, '로버트');
      expect(result).toHaveLength(2);
      // "로버트 마틴"이 저자로 포함된 2개 도서
      expect(result.map(book => book.title)).toEqual([
        '클린 코드',
        'Clean Architecture',
      ]);
    });
  });

  describe('엣지 케이스', () => {
    it('빈 도서 배열에 검색 시 빈 배열 반환', () => {
      const result = filterBooksBySearch([], '검색어');
      expect(result).toHaveLength(0);
    });

    it('특수문자가 포함된 검색어로 검색', () => {
      const booksWithSpecialChar = [
        ...mockBooks,
        { title: "Don't Code", author: '홍길동', status: '읽고 싶음' },
      ];
      const result = filterBooksBySearch(booksWithSpecialChar, "don't");
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Don't Code");
    });

    it('앞뒤 공백이 있는 검색어 처리', () => {
      const result = filterBooksBySearch(mockBooks, '  마틴  ');
      expect(result).toHaveLength(2);
    });

    it('숫자가 포함된 검색어', () => {
      const booksWithNumbers = [
        ...mockBooks,
        { title: 'Python 3.12 가이드', author: '저자1', status: '읽고 싶음' },
      ];
      const result = filterBooksBySearch(booksWithNumbers, '3.12');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Python 3.12 가이드');
    });
  });
});