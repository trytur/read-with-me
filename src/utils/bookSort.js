/**
 * 도서 목록을 정렬 옵션에 따라 정렬합니다.
 * @param {Array} books - 도서 객체 배열
 * @param {string} sortOption - 정렬 옵션 (title-asc, date-desc, date-asc, progress-desc, rating-desc)
 * @returns {Array} 정렬된 도서 배열
 */
export function sortBooks(books, sortOption) {
  return [...books].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title, 'ko');
      case 'date-desc':
        if (!a.recentReadDate && !b.recentReadDate) return 0;
        if (!a.recentReadDate) return 1;
        if (!b.recentReadDate) return -1;
        return b.recentReadDate.localeCompare(a.recentReadDate);
      case 'date-asc':
        if (!a.recentReadDate && !b.recentReadDate) return 0;
        if (!a.recentReadDate) return 1;
        if (!b.recentReadDate) return -1;
        return a.recentReadDate.localeCompare(b.recentReadDate);
      case 'progress-desc':
        return b.progressRate - a.progressRate;
      case 'rating-desc':
        if (a.rating == null && b.rating == null) return 0;
        if (a.rating == null) return 1;
        if (b.rating == null) return -1;
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}
