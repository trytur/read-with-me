export const BOOK_STATUS = {
  WANT_TO_READ: "읽고 싶음",
  READING: "읽는 중",
  FINISHED: "완독",
};

export function getBookStatus(progressRate) {
  const rate = Number(progressRate);

  if (Number.isNaN(rate)) {
    return BOOK_STATUS.WANT_TO_READ;
  }

  if (rate <= 0) {
    return BOOK_STATUS.WANT_TO_READ;
  }

  if (rate >= 100) {
    return BOOK_STATUS.FINISHED;
  }

  return BOOK_STATUS.READING;
}
