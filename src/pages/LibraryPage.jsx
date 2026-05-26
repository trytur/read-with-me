import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import { getBooksFromStorage } from "../utils/bookStorage";
import { BOOK_STATUS } from "../utils/bookStatus";

const STATUS_CLASS = {
  [BOOK_STATUS.WANT_TO_READ]: "status-want",
  [BOOK_STATUS.READING]: "status-reading",
  [BOOK_STATUS.FINISHED]: "status-finished",
};

function LibraryPage() {
  const [books] = useState(() => getBooksFromStorage());

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

      {books.length === 0 ? (
        <EmptyState
          title="아직 저장된 독서 기록이 없습니다."
          description="독서 기록 탭에서 첫 책을 추가해보세요."
        />
      ) : (
        <div className="book-grid">
          {books.map((book) => (
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
