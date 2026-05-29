import { validateEditForm } from './bookValidation';

describe('수정 유효성 검증 로직', () => {
  const validForm = {
    title: '클린 코드',
    author: '로버트 마틴',
    progressRate: '50',
    rating: '4.5',
  };

  describe('제목 검증', () => {
    it('제목이 없을 때 오류 메시지 반환', () => {
      const form = { ...validForm, title: '' };
      const result = validateEditForm(form);
      expect(result).toBe('제목을 입력해주세요.');
    });

    it('제목이 공백만 있을 때 오류 메시지 반환', () => {
      const form = { ...validForm, title: '   ' };
      const result = validateEditForm(form);
      expect(result).toBe('제목을 입력해주세요.');
    });

    it('제목이 입력되었을 때 통과', () => {
      const form = { ...validForm, title: '클린 코드' };
      const result = validateEditForm(form);
      expect(result).not.toBe('제목을 입력해주세요.');
    });

    it('한글 제목도 정상 처리', () => {
      const form = { ...validForm, title: '파이썬 완벽 가이드' };
      const result = validateEditForm(form);
      expect(result).not.toBe('제목을 입력해주세요.');
    });
  });

  describe('저자 검증', () => {
    it('저자가 없을 때 오류 메시지 반환', () => {
      const form = { ...validForm, author: '' };
      const result = validateEditForm(form);
      expect(result).toBe('저자를 입력해주세요.');
    });

    it('저자가 공백만 있을 때 오류 메시지 반환', () => {
      const form = { ...validForm, author: '   ' };
      const result = validateEditForm(form);
      expect(result).toBe('저자를 입력해주세요.');
    });

    it('저자가 입력되었을 때 통과', () => {
      const form = { ...validForm, author: '로버트 마틴' };
      const result = validateEditForm(form);
      expect(result).not.toBe('저자를 입력해주세요.');
    });

    it('제목이 없으면 먼저 제목 오류 반환', () => {
      const form = { ...validForm, title: '', author: '' };
      const result = validateEditForm(form);
      expect(result).toBe('제목을 입력해주세요.');
    });
  });

  describe('진도율 검증', () => {
    it('진도율이 0일 때 통과', () => {
      const form = { ...validForm, progressRate: '0' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('진도율이 50일 때 통과', () => {
      const form = { ...validForm, progressRate: '50' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('진도율이 100일 때 통과', () => {
      const form = { ...validForm, progressRate: '100' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('진도율이 음수일 때 오류 메시지 반환', () => {
      const form = { ...validForm, progressRate: '-1' };
      const result = validateEditForm(form);
      expect(result).toBe('진도율은 0부터 100 사이의 숫자로 입력해주세요.');
    });

    it('진도율이 100 초과일 때 오류 메시지 반환', () => {
      const form = { ...validForm, progressRate: '101' };
      const result = validateEditForm(form);
      expect(result).toBe('진도율은 0부터 100 사이의 숫자로 입력해주세요.');
    });

    it('진도율이 문자일 때 오류 메시지 반환', () => {
      const form = { ...validForm, progressRate: 'abc' };
      const result = validateEditForm(form);
      expect(result).toBe('진도율은 0부터 100 사이의 숫자로 입력해주세요.');
    });

    it('진도율이 빈 문자열일 때 통과 (선택사항)', () => {
      const form = { ...validForm, progressRate: '' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('진도율이 소수일 때 통과', () => {
      const form = { ...validForm, progressRate: '50.5' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });
  });

  describe('별점 검증', () => {
    it('별점이 1일 때 통과', () => {
      const form = { ...validForm, rating: '1' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('별점이 5일 때 통과', () => {
      const form = { ...validForm, rating: '5' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('별점이 0.5 단위일 때 통과', () => {
      const validRatings = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];
      validRatings.forEach((rating) => {
        const form = { ...validForm, rating };
        const result = validateEditForm(form);
        expect(result).toBe('');
      });
    });

    it('별점이 0.5 단위가 아닐 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: '3.3' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });

    it('별점이 0일 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: '0' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });

    it('별점이 1 미만일 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: '0.5' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });

    it('별점이 5 초과일 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: '5.5' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });

    it('별점이 6일 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: '6' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });

    it('별점이 문자일 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: 'abc' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });

    it('별점이 빈 문자열일 때 통과 (선택사항)', () => {
      const form = { ...validForm, rating: '' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('별점이 0.25 단위일 때 오류 메시지 반환', () => {
      const form = { ...validForm, rating: '3.25' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });
  });

  describe('복합 검증', () => {
    it('유효한 폼 데이터는 빈 문자열 반환', () => {
      const form = {
        title: '클린 코드',
        author: '로버트 마틴',
        progressRate: '50',
        rating: '4.5',
      };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('제목 없이 다른 정보 유효할 때 제목 오류 우선 반환', () => {
      const form = {
        title: '',
        author: '로버트 마틴',
        progressRate: '50',
        rating: '4.5',
      };
      const result = validateEditForm(form);
      expect(result).toBe('제목을 입력해주세요.');
    });

    it('저자 없이 다른 정보 유효할 때 저자 오류 반환', () => {
      const form = {
        title: '클린 코드',
        author: '',
        progressRate: '50',
        rating: '4.5',
      };
      const result = validateEditForm(form);
      expect(result).toBe('저자를 입력해주세요.');
    });

    it('진도율이 유효하지 않을 때 진도율 오류 반환', () => {
      const form = {
        title: '클린 코드',
        author: '로버트 마틴',
        progressRate: '150',
        rating: '4.5',
      };
      const result = validateEditForm(form);
      expect(result).toBe('진도율은 0부터 100 사이의 숫자로 입력해주세요.');
    });

    it('별점이 유효하지 않을 때 별점 오류 반환', () => {
      const form = {
        title: '클린 코드',
        author: '로버트 마틴',
        progressRate: '50',
        rating: '4.2',
      };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });
  });

  describe('엣지 케이스', () => {
    it('진도율과 별점이 모두 빈 문자열일 때 통과', () => {
      const form = {
        title: '클린 코드',
        author: '로버트 마틴',
        progressRate: '',
        rating: '',
      };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('진도율이 0.0일 때 통과', () => {
      const form = { ...validForm, progressRate: '0.0' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('별점이 1.0일 때 통과', () => {
      const form = { ...validForm, rating: '1.0' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('제목이 공백 포함 문자일 때 통과', () => {
      const form = { ...validForm, title: '  클린 코드  ' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('저자가 공백 포함 문자일 때 통과', () => {
      const form = { ...validForm, author: '  로버트 마틴  ' };
      const result = validateEditForm(form);
      expect(result).toBe('');
    });

    it('진도율이 매우 큰 수일 때 오류', () => {
      const form = { ...validForm, progressRate: '999999' };
      const result = validateEditForm(form);
      expect(result).toBe('진도율은 0부터 100 사이의 숫자로 입력해주세요.');
    });

    it('별점이 매우 큰 수일 때 오류', () => {
      const form = { ...validForm, rating: '999999' };
      const result = validateEditForm(form);
      expect(result).toBe('별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.');
    });
  });
});
