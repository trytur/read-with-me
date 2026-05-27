import { useState, useEffect } from "react";

function useStatsData() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("readWithMeBooks");
    const parsed = raw ? JSON.parse(raw) : [];
    setBooks(parsed);
  }, []);

  // 평균 진도율
  const averageProgress =
    books.length === 0
      ? 0
      : Math.round(
          books.reduce((sum, book) => sum + (book.progressRate ?? 0), 0) /
            books.length
        );

  // 상태별 도서 수
  const statusCount = {
    읽고싶음: books.filter((b) => b.status === "읽고 싶음").length,
    읽는중: books.filter((b) => b.status === "읽는 중").length,
    완독: books.filter((b) => b.status === "완독").length,
  };

  // dateLogs에서 readDate 추출
  const allDateLogs = books.flatMap((b) =>
    Array.isArray(b.dateLogs)
      ? b.dateLogs.map((log) => log.readDate).filter(Boolean)
      : []
  );

  // 고유 독서 날짜 수
  const uniqueDates = new Set(allDateLogs);
  const totalReadDays = uniqueDates.size;

  return {
    books,
    averageProgress,
    statusCount,
    totalReadDays,
    allDateLogs: [...uniqueDates],
  };
}

export default useStatsData;