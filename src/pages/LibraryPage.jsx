import EmptyState from "../components/common/EmptyState";
import { getBooksFromStorage } from "../utils/bookStorage";

function LibraryPage() {
  const savedBooks = getBooksFromStorage();

  /*
    TODO: 서재 탭 담당자 구현 기준

    1. localStorage의 readWithMeBooks 데이터를 기준으로 도서 목록을 카드 형식으로 표시한다.
    2. 표시 항목:
       - 제목 title
       - 저자 author
       - 독서 상태 status
       - 진도율 progressRate
       - 최근 읽은 날짜 recentReadDate
       - 별점 rating
    3. 검색:
       - title, author 기준 부분 일치 검색
       - 대소문자 구분 없음
       - 검색어가 없으면 전체 목록 표시
    4. 정렬:
       - 제목 가나다순
       - 최근 읽은 날짜 최신순
       - 최근 읽은 날짜 오래된 순
       - 진도율 높은 순
       - 별점 높은 순
    5. 상태 필터:
       - 읽고 싶음
       - 읽는 중
       - 완독
    6. 수정:
       - 모든 입력 항목 수정 가능
       - 수정 시 updatedAt 갱신
       - progressRate 변경 시 status 재계산 필요
    7. 삭제:
       - 삭제 전 확인 다이얼로그 표시
  */

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
      </div>

      <div className="card handoff-card">
        <h3 className="section-title">서재 탭 개발 기준</h3>

        <ul className="handoff-list">
          <li>공통 데이터 key: readWithMeBooks</li>
          <li>현재 저장된 독서 기록 수: {savedBooks.length}개</li>
          <li>검색 기준: 제목, 저자 부분 일치 검색</li>
          <li>정렬 기준: 가나다순, 날짜순, 진도율 높은 순, 별점 높은 순</li>
          <li>상태 필터 기준: 읽고 싶음, 읽는 중, 완독</li>
          <li>수정/삭제 후 localStorage를 즉시 갱신해야 함</li>
        </ul>

        <EmptyState
          title="서재 탭 개발 예정"
          description="이 영역은 서재 담당자가 위 기준에 따라 이어서 구현하면 됩니다."
        />
      </div>
    </section>
  );
}

export default LibraryPage;
