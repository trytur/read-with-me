import { useState, useMemo } from "react";
import EmptyState from "../components/common/EmptyState";
import { getBooksFromStorage } from "../utils/bookStorage";
import { BOOK_STATUS } from "../utils/bookStatus";

const STATUS_CLASS = {
  [BOOK_STATUS.WANT_TO_READ]: "status-want",
  [BOOK_STATUS.READING]: "status-reading",
  [BOOK_STATUS.FINISHED]: "status-finished",
};

const STATUS_FILTERS = [
  { value: "all", label: "전체" },
  { value: BOOK_STATUS.WANT_TO_READ, label: "읽고 싶음" },
  { value: BOOK_STATUS.READING, label: "읽는 중" },
  { value: BOOK_STATUS.FINISHED, label: "완독" },
];

const SORT_OPTIONS = [
  { value: "title-asc", label: "제목 가나다순" },
  { value: "date-desc", label: "최근 읽은 날짜 최신순" },
  { value: "date-asc", label: "최근 읽은 날짜 오래된 순" },
  { value: "progress-desc", label: "진도율 높은 순" },
  { value: "rating-desc", label: "별점 높은 순" },
];

function sortBooks(books, sortOption) {
  return [...books].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title, "ko");
      case "date-desc":
        if (!a.recentReadDate && !b.recentReadDate) return 0;
        if (!a.recentReadDate) return 1;
        if (!b.recentReadDate) return -1;
        return b.recentReadDate.localeCompare(a.recentReadDate);
      case "date-asc":
        if (!a.recentReadDate && !b.recentReadDate) return 0;
        if (!a.recentReadDate) return 1;
        if (!b.recentReadDate) return -1;
        return a.recentReadDate.localeCompare(b.recentReadDate);
      case "progress-desc":
        return b.progressRate - a.progressRate;
      case "rating-desc":
        if (a.rating == null && b.rating == null) return 0;
        if (a.rating == null) return 1;
        if (b.rating == null) return -1;
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}

function LibraryPage() {
  const [books] = useState(() => getBooksFromStorage());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBooks = useMemo(() => {
    let result = books;

    if (statusFilter !== "all") {
      result = result.filter((book) => book.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    return sortBooks(result, sortOption);
  }, [books, searchQuery, sortOption, statusFilter]);

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">서재</h2>
          <p className="page-description">
            저장된 독서 기록을 카드 형식으로 조회, 검색, 정렬, 수정, 삭제하는
            탭입니다.
          </p>
        </div>
        <span className="count-badge">총 {books.length}권</span>
      </div>

      <div className="filter-tabs">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            className={`filter-tab${statusFilter === filter.value ? " active" : ""}`}
            onClick={() => setStatusFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="library-controls">
        <input
          type="search"
          className="search-input"
          placeholder="제목 또는 저자로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <EmptyState
          title={
            books.length === 0
              ? "아직 저장된 독서 기록이 없습니다."
              : "조건에 맞는 도서가 없습니다."
          }
          description={
            books.length === 0
              ? "독서 기록 탭에서 첫 책을 추가해보세요."
              : "다른 검색어나 필터를 시도해보세요."
          }
        />
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div key={book.recordNo} className="book-card">
              <div className="book-card-header">
                <h3 className="book-card-title">{book.title}</h3>
                <p className="book-card-author">{book.author}</p>
              </div>

              <div className="book-card-badges">
                <span className={`status-badge ${STATUS_CLASS[book.status] ?? ""}`}>
                  {book.status}
                </span>
                {book.rating != null && (
                  <span className="rating-badge">★ {book.rating}</span>
                )}
              </div>

              <div className="progress-bar-wrapper">
                <div
                  className="progress-bar"
                  style={{ width: `${book.progressRate}%` }}
                />
              </div>
              <p className="progress-label">{book.progressRate}%</p>

              {book.recentReadDate && (
                <p className="book-card-date">
                  최근 읽은 날짜: {book.recentReadDate}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LibraryPage;
