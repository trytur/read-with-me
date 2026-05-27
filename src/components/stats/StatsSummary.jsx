function StatsSummary({ averageProgress, statusCount, totalReadDays }) {
  const items = [
    { label: "평균 진도율", value: `${averageProgress}%` },
    { label: "읽고 싶음", value: `${statusCount.읽고싶음}권` },
    { label: "읽는 중", value: `${statusCount.읽는중}권` },
    { label: "완독", value: `${statusCount.완독}권` },
    { label: "총 독서 일수", value: `${totalReadDays}일` },
  ];

  return (
    <div className="stats-summary">
      {items.map((item) => (
        <div key={item.label} className="stats-summary-item">
          <span className="stats-summary-label">{item.label}</span>
          <span className="stats-summary-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsSummary;