import { getBookStatus, BOOK_STATUS } from './bookStatus';

describe('bookStatus - 진도율 기반 상태 계산', () => {
  describe('getBookStatus', () => {
    it('0% 입력 시 "읽고 싶음" 반환', () => {
      expect(getBookStatus(0)).toBe(BOOK_STATUS.WANT_TO_READ);
    });

    it('음수 입력 시 "읽고 싶음" 반환', () => {
      expect(getBookStatus(-10)).toBe(BOOK_STATUS.WANT_TO_READ);
      expect(getBookStatus(-1)).toBe(BOOK_STATUS.WANT_TO_READ);
    });

    it('1~99% 입력 시 "읽는 중" 반환', () => {
      expect(getBookStatus(1)).toBe(BOOK_STATUS.READING);
      expect(getBookStatus(50)).toBe(BOOK_STATUS.READING);
      expect(getBookStatus(99)).toBe(BOOK_STATUS.READING);
    });

    it('100% 입력 시 "완독" 반환', () => {
      expect(getBookStatus(100)).toBe(BOOK_STATUS.FINISHED);
    });

    it('100% 초과 입력 시 "완독" 반환', () => {
      expect(getBookStatus(101)).toBe(BOOK_STATUS.FINISHED);
      expect(getBookStatus(150)).toBe(BOOK_STATUS.FINISHED);
    });

    it('문자열 입력 시 "읽고 싶음" 반환 (NaN 처리)', () => {
      expect(getBookStatus('abc')).toBe(BOOK_STATUS.WANT_TO_READ);
      expect(getBookStatus('test')).toBe(BOOK_STATUS.WANT_TO_READ);
    });

    it('숫자로 변환 가능한 문자열 입력 시 정상 변환', () => {
      expect(getBookStatus('0')).toBe(BOOK_STATUS.WANT_TO_READ);
      expect(getBookStatus('50')).toBe(BOOK_STATUS.READING);
      expect(getBookStatus('100')).toBe(BOOK_STATUS.FINISHED);
    });

    it('undefined 입력 시 "읽고 싶음" 반환', () => {
      expect(getBookStatus(undefined)).toBe(BOOK_STATUS.WANT_TO_READ);
    });

    it('null 입력 시 "읽고 싶음" 반환', () => {
      expect(getBookStatus(null)).toBe(BOOK_STATUS.WANT_TO_READ);
    });

    it('소수점 입력 시 정상 처리', () => {
      expect(getBookStatus(0.1)).toBe(BOOK_STATUS.READING);
      expect(getBookStatus(99.9)).toBe(BOOK_STATUS.READING);
      expect(getBookStatus(100.0)).toBe(BOOK_STATUS.FINISHED);
    });
  });
});
