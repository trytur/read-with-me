import EmptyState from "../components/common/EmptyState";

function StatisticsPage() {
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

      <div className="card">
        <EmptyState
          title="통계 탭 개발 예정"
          description="이 영역은 통계 담당자가 이어서 구현합니다."
        />
      </div>
    </section>
  );
}

export default StatisticsPage;