import { useState } from "react";

function AttendanceCalendar({ allDateLogs }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0~11

  // 이번 달 1일이 무슨 요일인지 (0=일요일)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // 이번 달 마지막 날
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 독서한 날짜 Set ("YYYY-MM-DD" 형식)
  const logSet = new Set(allDateLogs);

  // 달력에 표시할 날짜 배열 (앞에 빈칸 채우기)
  const days = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

  const formatDate = (d) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  return (
    <div>
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={() => {
            if (month === 0) {
              setYear((y) => y - 1);
              setMonth(11);
            } else {
              setMonth((m) => m - 1);
            }
          }}
        >
          ◀
        </button>
        <span className="calendar-title">
          {year}년 {month + 1}월
        </span>
        <button
          className="calendar-nav-btn"
          onClick={() => {
            if (month === 11) {
              setYear((y) => y + 1);
              setMonth(0);
            } else {
              setMonth((m) => m + 1);
            }
          }}
        >
          ▶
        </button>
      </div>

      <div className="calendar-grid">
        {DAY_LABELS.map((label) => (
          <div key={label} className="calendar-day-label">
            {label}
          </div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day ${day === null ? "empty" : ""} ${
              day && logSet.has(formatDate(day)) ? "active" : ""
            }`}
          >
            {day ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceCalendar;