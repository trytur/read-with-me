import EmptyState from "../components/common/EmptyState";

function LibraryPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">서재</h2>
          <p className="page-description">
            저장된 독서 기록을 조회, 검색, 정렬, 수정, 삭제하는 탭입니다.
          </p>
        </div>
      </div>

      <div className="card">
        <EmptyState
          title="서재 탭 개발 예정"
          description="이 영역은 서재 담당자가 이어서 구현합니다."
        />
      </div>
    </section>
  );
}

export default LibraryPage;