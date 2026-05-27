function DonutChart({ statusCount }) {
  const data = [
    { label: "읽고 싶음", count: statusCount.읽고싶음, color: "#c8a882" },
    { label: "읽는 중", count: statusCount.읽는중, color: "#6f4e37" },
    { label: "완독", count: statusCount.완독, color: "#4e3525" },
  ];

  const total = data.reduce((sum, d) => sum + d.count, 0);

  const SIZE = 160;
  const STROKE = 28;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const CENTER = SIZE / 2;

  // 책이 없을 때
  if (total === 0) {
    return (
      <div className="donut-chart-wrapper">
        <p style={{ color: "var(--color-subtext)", fontSize: "14px" }}>
          기록된 도서가 없습니다.
        </p>
      </div>
    );
  }

  // 각 항목의 stroke-dasharray, stroke-dashoffset 계산
  let cumulativePercent = 0;
  const segments = data.map((d) => {
    const percent = d.count / total;
    const offset = CIRCUMFERENCE * (1 - cumulativePercent);
    const dash = CIRCUMFERENCE * percent;
    cumulativePercent += percent;
    return { ...d, dash, offset };
  });

  return (
    <div className="donut-chart-wrapper">
      <svg width={SIZE} height={SIZE}>
        {/* 배경 원 */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={STROKE}
        />
        {segments.map((seg) => (
          <circle
            key={seg.label}
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={seg.color}
            strokeWidth={STROKE}
            strokeDasharray={`${seg.dash} ${CIRCUMFERENCE - seg.dash}`}
            strokeDashoffset={seg.offset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        ))}
        {/* 가운데 총 권수 */}
        <text
          x={CENTER}
          y={CENTER}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="800"
          fill="var(--color-primary-dark)"
        >
          {total}권
        </text>
      </svg>

      {/* 범례 */}
      <div className="donut-legend">
        {data.map((d) => (
          <div key={d.label} className="donut-legend-item">
            <div
              className="donut-legend-dot"
              style={{ backgroundColor: d.color }}
            />
            <span>{d.label}</span>
            <span style={{ marginLeft: "auto", fontWeight: 700 }}>
              {d.count}권
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;