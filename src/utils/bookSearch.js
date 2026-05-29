/**
 * 검색어를 기반으로 도서 목록을 필터링합니다.
 * @param {Array} books - 도서 객체 배열
 * @param {string} searchQuery - 검색어
 * @returns {Array} 필터링된 도서 배열
 */
export function filterBooksBySearch(books, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) {
    return books;
  }

  const query = searchQuery.trim().toLowerCase();

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );
}
