import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import { createBookRecordFromForm } from "../utils/bookRecordMapper";
import { getBooksFromStorage, saveBooksToStorage } from "../utils/bookStorage";

const initialForm = {
  title: "",
  author: "",
  publisher: "",
  progressRate: "",
  impression: "",
  quote: "",
  oneLineReview: "",
  startDate: "",
  finishDate: "",
  recentReadDate: "",
  rating: "",
};

function ReadingRecordPage() {
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedBooks, setSavedBooks] = useState(() => getBooksFromStorage());

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      return "제목을 입력해주세요.";
    }

    if (!form.author.trim()) {
      return "저자를 입력해주세요.";
    }

    if (form.progressRate !== "") {
      const progressRate = Number(form.progressRate);

      if (Number.isNaN(progressRate) || progressRate < 0 || progressRate > 100) {
        return "진도율은 0부터 100 사이의 숫자로 입력해주세요.";
      }
    }

    if (form.rating !== "") {
      const rating = Number(form.rating);

      if (
        Number.isNaN(rating) ||
        rating < 1 ||
        rating > 5 ||
        rating % 0.5 !== 0
      ) {
        return "별점은 1부터 5 사이에서 0.5 단위로 입력해주세요.";
      }
    }

    if (form.impression.length > 1000) {
      return "느낀점은 최대 1000자까지 입력할 수 있습니다.";
    }

    if (form.quote.length > 1000) {
      return "기록하고 싶은 구절은 최대 1000자까지 입력할 수 있습니다.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    const newBookRecord = createBookRecordFromForm(form);
    const nextBooks = [newBookRecord, ...savedBooks];

    setSavedBooks(nextBooks);
    saveBooksToStorage(nextBooks);

    setForm(initialForm);
    setErrorMessage("");
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrorMessage("");
  };

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">독서 기록 작성</h2>
          <p className="page-description">
            도서 정보와 독서 내용을 입력하면 브라우저 localStorage에 저장됩니다.
          </p>
        </div>
      </div>

      <div className="content-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">기본 도서 정보</h3>

            <div className="form-grid">
              <label className="form-field">
                <span>
                  제목 <strong className="required">*</strong>
                </span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="예: 데미안"
                />
              </label>

              <label className="form-field">
                <span>
                  저자 <strong className="required">*</strong>
                </span>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="예: 헤르만 헤세"
                />
              </label>

              <label className="form-field">
                <span>출판사</span>
                <input
                  type="text"
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                  placeholder="예: 민음사"
                />
              </label>

              <label className="form-field">
                <span>진도율</span>
                <input
                  type="number"
                  name="progressRate"
                  value={form.progressRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  placeholder="미입력 시 0%"
                />
              </label>
            </div>

            <p className="helper-text">
              진도율은 0%이면 읽고 싶음, 1~99%이면 읽는 중, 100%이면 완독으로
              자동 저장됩니다.
            </p>
          </div>

          <div className="form-section">
            <h3 className="section-title">독서 내용</h3>

            <div className="form-grid">
              <label className="form-field">
                <span>별점</span>
                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.5"
                  placeholder="1~5점, 0.5 단위"
                />
              </label>

              <label className="form-field">
                <span>한줄평</span>
                <input
                  type="text"
                  name="oneLineReview"
                  value={form.oneLineReview}
                  onChange={handleChange}
                  maxLength="255"
                  placeholder="짧은 감상을 입력해주세요."
                />
              </label>

              <label className="form-field">
                <span>독서 시작일</span>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>완독일</span>
                <input
                  type="date"
                  name="finishDate"
                  value={form.finishDate}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>최근 읽은 날짜</span>
                <input
                  type="date"
                  name="recentReadDate"
                  value={form.recentReadDate}
                  onChange={handleChange}
                />
              </label>
            </div>

            <p className="helper-text">
              최근 읽은 날짜는 통계 탭의 월별 출석 체크와 총 독서 일수 계산에
              활용됩니다.
            </p>

            <label className="form-field full-width">
              <span>느낀점</span>
              <textarea
                name="impression"
                value={form.impression}
                onChange={handleChange}
                maxLength="1000"
                placeholder="책을 읽고 느낀 점을 자유롭게 기록해주세요. 최대 1000자"
              />
            </label>

            <label className="form-field full-width">
              <span>기록하고 싶은 구절</span>
              <textarea
                name="quote"
                value={form.quote}
                onChange={handleChange}
                maxLength="1000"
                placeholder="기억하고 싶은 문장을 기록해주세요. 최대 1000자"
              />
            </label>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleReset}
            >
              초기화
            </button>
            <button type="submit" className="primary-button">
              기록 저장
            </button>
          </div>
        </form>

        <aside className="card preview-card">
          <div className="preview-header">
            <h3 className="section-title">최근 저장된 독서 기록</h3>
            <span className="count-badge">총 {savedBooks.length}개</span>
          </div>

          {savedBooks.length === 0 ? (
            <EmptyState
              title="아직 저장된 독서 기록이 없습니다."
              description="왼쪽 입력 폼에서 첫 독서 기록을 추가해보세요."
            />
          ) : (
            <ul className="record-list">
              {savedBooks.slice(0, 5).map((book) => (
                <li key={book.recordNo} className="record-item">
                  <div>
                    <p className="record-title">{book.title}</p>
                    <p className="record-meta">
                      {book.author} · {book.status} · {book.progressRate}%
                    </p>
                    {book.recentReadDate && (
                      <p className="record-date">
                        최근 읽은 날짜: {book.recentReadDate}
                      </p>
                    )}
                  </div>

                  {book.rating && (
                    <span className="rating-badge">★ {book.rating}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
}

export default ReadingRecordPage;
