/**
 * 도서 정보 수정 폼의 유효성을 검증합니다.
 * @param {Object} editForm - 수정 폼 데이터
 * @param {string} editForm.title - 제목
 * @param {string} editForm.author - 저자
 * @param {string} editForm.progressRate - 진도율 (0-100)
 * @param {string} editForm.rating - 별점 (1-5, 0.5 단위)
 * @returns {string} 검증 오류 메시지 (유효하면 빈 문자열)
 */
export function validateEditForm(editForm) {
  if (!editForm.title.trim()) {
    return '제목을 입력해주세요.';
  }

  if (!editForm.author.trim()) {
    return '저자를 입력해주세요.';
  }

  if (editForm.progressRate !== '') {
    const rate = Number(editForm.progressRate);
    if (Number.isNaN(rate) || rate < 0 || rate > 100) {
      return '진도율은 0부터 100 사이의 숫자로 입력해주세요.';
    }
  }

  if (editForm.rating !== '') {
    const rating = Number(editForm.rating);
    if (Number.isNaN(rating) || rating < 1 || rating > 5 || rating % 0.5 !== 0) {
      return '별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.';
    }
  }

  return '';
}
