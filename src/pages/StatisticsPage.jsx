import EmptyState from "../components/common/EmptyState";
import { getBooksFromStorage } from "../utils/bookStorage";

function StatisticsPage() {
  const savedBooks = getBooksFromStorage();

  const uniqueReadDates = new Set(
    savedBooks.flatMap((book) =>
      Array.isArray(book.dateLogs)
        ? book.dateLogs.map((dateLog) => dateLog.readDate)
        : []
    )
  );

  /*
    TODO: 통계 탭 담당자 구현 기준

    1. localStorage의 readWithMeBooks 데이터를 기준으로 통계를 계산한다.
    2. 평균 진도율:
       - progressRate 전체 평균
    3. 상태별 도서 수:
       - status가 "읽고 싶음"인 도서 수
       - status가 "읽는 중"인 도서 수
       - status가 "완독"인 도서 수
    4. 총 독서 일수:
       - dateLogs.readDate 기준
       - 동일 날짜에 여러 기록이 있어도 1일로 처리
       - Set을 사용해 중복 제거
    5. 월별 출석 체크:
       - dateLogs.readDate를 기준으로 달력에 표시
       - 이전/다음 월 이동 가능
    6. 시각화:
       - 상태별 도서 수 또는 진도율 통계를 도넛 차트로 표시
  */

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">통계</h2>
          <p className="page-description">
            월별 출석 체크, 평균 진도율, 상태별 도서 수를 확인하는 탭입니다.
          </p>
        </div>
      </div>

      <div className="card handoff-card">
        <h3 className="section-title">통계 탭 개발 기준</h3>

        <ul className="handoff-list">
          <li>공통 데이터 key: readWithMeBooks</li>
          <li>현재 저장된 독서 기록 수: {savedBooks.length}개</li>
          <li>현재 고유 독서 날짜 수: {uniqueReadDates.size}일</li>
          <li>평균 진도율은 progressRate 기준으로 계산</li>
          <li>상태별 도서 수는 status 기준으로 계산</li>
          <li>출석 체크는 dateLogs.readDate 기준으로 계산</li>
          <li>동일 날짜에 여러 기록이 있어도 1일 출석으로 처리</li>
        </ul>

        <EmptyState
          title="통계 탭 개발 예정"
          description="이 영역은 통계 담당자가 위 기준에 따라 이어서 구현하면 됩니다."
        />
      </div>
    </section>
  );
}

export default StatisticsPage;
