/**
 * 상태 필터에 따라 도서 목록을 필터링합니다.
 * @param {Array} books - 도서 객체 배열
 * @param {string} statusFilter - 상태 필터 ("all", "읽고 싶음", "읽는 중", "완독")
 * @returns {Array} 필터링된 도서 배열
 */
export function filterBooksByStatus(books, statusFilter) {
  if (statusFilter === 'all') {
    return books;
  }

  return books.filter((book) => book.status === statusFilter);
}
