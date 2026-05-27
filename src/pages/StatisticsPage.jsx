import useStatsData from "../hooks/useStatsData";
import StatsSummary from "../components/stats/StatsSummary";
import AttendanceCalendar from "../components/stats/AttendanceCalendar";
import DonutChart from "../components/stats/DonutChart";
import "../styles/stats.css";

function StatisticsPage() {
  const { averageProgress, statusCount, totalReadDays, allDateLogs } =
    useStatsData();

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

      <div className="stats-grid">
        <div className="card">
          <AttendanceCalendar allDateLogs={allDateLogs} />
        </div>
        <div className="card">
          <StatsSummary
            averageProgress={averageProgress}
            statusCount={statusCount}
            totalReadDays={totalReadDays}
          />
        </div>
      </div>

      <div className="card">
        <DonutChart statusCount={statusCount} />
      </div>
    </section>
  );
}

export default StatisticsPage;