import { useState, useMemo } from "react";
import EmptyState from "../components/common/EmptyState";
import { getBooksFromStorage, saveBooksToStorage } from "../utils/bookStorage";
import { BOOK_STATUS, getBookStatus } from "../utils/bookStatus";

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
  const [books, setBooks] = useState(() => getBooksFromStorage());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editError, setEditError] = useState("");
  const [deletingBook, setDeletingBook] = useState(null);

  const handleDeleteConfirm = () => {
    const nextBooks = books.filter(
      (book) => book.recordNo !== deletingBook.recordNo
    );
    setBooks(nextBooks);
    saveBooksToStorage(nextBooks);
    setDeletingBook(null);
  };

  const handleEditOpen = (book) => {
    setEditingBook(book);
    setEditForm({
      title: book.title,
      author: book.author,
      publisher: book.publisher || "",
      progressRate: String(book.progressRate),
      startDate: book.startDate || "",
      finishDate: book.finishDate || "",
      recentReadDate: book.recentReadDate || "",
      rating: book.rating != null ? String(book.rating) : "",
      impression: book.memo?.impression || "",
      quote: book.memo?.quote || "",
      oneLineReview: book.memo?.oneLineReview || "",
    });
    setEditError("");
  };

  const handleEditClose = () => {
    setEditingBook(null);
    setEditForm(null);
    setEditError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    if (editError) setEditError("");
  };

  const validateEditForm = () => {
    if (!editForm.title.trim()) return "제목을 입력해주세요.";
    if (!editForm.author.trim()) return "저자를 입력해주세요.";
    if (editForm.progressRate !== "") {
      const rate = Number(editForm.progressRate);
      if (Number.isNaN(rate) || rate < 0 || rate > 100)
        return "진도율은 0부터 100 사이의 숫자로 입력해주세요.";
    }
    if (editForm.rating !== "") {
      const rating = Number(editForm.rating);
      if (Number.isNaN(rating) || rating < 1 || rating > 5 || rating % 0.5 !== 0)
        return "별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.";
    }
    return "";
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const validationMessage = validateEditForm();
    if (validationMessage) {
      setEditError(validationMessage);
      return;
    }

    const progressRate =
      editForm.progressRate === "" ? 0 : Number(editForm.progressRate);

    const updatedBook = {
      ...editingBook,
      title: editForm.title.trim(),
      author: editForm.author.trim(),
      publisher: editForm.publisher.trim(),
      progressRate,
      status: getBookStatus(progressRate),
      startDate: editForm.startDate,
      finishDate: editForm.finishDate,
      recentReadDate: editForm.recentReadDate,
      rating: editForm.rating === "" ? null : Number(editForm.rating),
      updatedAt: new Date().toISOString(),
      memo: {
        ...editingBook.memo,
        impression: editForm.impression.trim(),
        quote: editForm.quote.trim(),
        oneLineReview: editForm.oneLineReview.trim(),
      },
    };

    const nextBooks = books.map((book) =>
      book.recordNo === editingBook.recordNo ? updatedBook : book
    );
    setBooks(nextBooks);
    saveBooksToStorage(nextBooks);
    handleEditClose();
  };

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
    <>
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
                <div>
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="book-card-author">{book.author}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="card-action-button"
                    onClick={() => handleEditOpen(book)}
                  >
                    수정
                  </button>
                  <button
                    className="card-action-button card-action-button-danger"
                    onClick={() => setDeletingBook(book)}
                  >
                    삭제
                  </button>
                </div>
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

    {editingBook && editForm && (
      <div className="modal-overlay" onClick={handleEditClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="section-title">독서 기록 수정</h3>
            <button className="modal-close-button" onClick={handleEditClose}>
              ×
            </button>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="modal-body">
              <div className="form-grid">
                <label className="form-field">
                  <span>제목 <strong className="required">*</strong></span>
                  <input type="text" name="title" value={editForm.title} onChange={handleEditChange} />
                </label>
                <label className="form-field">
                  <span>저자 <strong className="required">*</strong></span>
                  <input type="text" name="author" value={editForm.author} onChange={handleEditChange} />
                </label>
                <label className="form-field">
                  <span>출판사</span>
                  <input type="text" name="publisher" value={editForm.publisher} onChange={handleEditChange} />
                </label>
                <label className="form-field">
                  <span>진도율</span>
                  <input type="number" name="progressRate" value={editForm.progressRate} onChange={handleEditChange} min="0" max="100" step="1" />
                </label>
                <label className="form-field">
                  <span>별점</span>
                  <input type="number" name="rating" value={editForm.rating} onChange={handleEditChange} min="1" max="5" step="0.5" />
                </label>
                <label className="form-field">
                  <span>한줄평</span>
                  <input type="text" name="oneLineReview" value={editForm.oneLineReview} onChange={handleEditChange} maxLength="255" />
                </label>
                <label className="form-field">
                  <span>독서 시작일</span>
                  <input type="date" name="startDate" value={editForm.startDate} onChange={handleEditChange} />
                </label>
                <label className="form-field">
                  <span>완독일</span>
                  <input type="date" name="finishDate" value={editForm.finishDate} onChange={handleEditChange} />
                </label>
                <label className="form-field">
                  <span>최근 읽은 날짜</span>
                  <input type="date" name="recentReadDate" value={editForm.recentReadDate} onChange={handleEditChange} />
                </label>
              </div>
              <label className="form-field full-width">
                <span>느낀점</span>
                <textarea name="impression" value={editForm.impression} onChange={handleEditChange} maxLength="1000" />
              </label>
              <label className="form-field full-width">
                <span>기록하고 싶은 구절</span>
                <textarea name="quote" value={editForm.quote} onChange={handleEditChange} maxLength="1000" />
              </label>
              {editError && <p className="error-message">{editError}</p>}
            </div>
            <div className="modal-footer">
              <button type="button" className="secondary-button" onClick={handleEditClose}>취소</button>
              <button type="submit" className="primary-button">저장</button>
            </div>
          </form>
        </div>
      </div>
    )}
    {deletingBook && (
      <div className="modal-overlay" onClick={() => setDeletingBook(null)}>
        <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
          <h3 className="section-title">독서 기록 삭제</h3>
          <p className="confirm-message">
            <strong>"{deletingBook.title}"</strong>을(를) 정말 삭제하시겠습니까?
            <br />
            삭제된 기록은 복구할 수 없습니다.
          </p>
          <div className="confirm-actions">
            <button
              className="secondary-button"
              onClick={() => setDeletingBook(null)}
            >
              취소
            </button>
            <button className="danger-button" onClick={handleDeleteConfirm}>
              삭제
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default LibraryPage;
