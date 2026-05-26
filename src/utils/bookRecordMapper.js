import { createId } from "./createId";
import { getBookStatus } from "./bookStatus";

export function createBookRecordFromForm(form) {
  const progressRate = form.progressRate === "" ? 0 : Number(form.progressRate);
  const recordNo = createId();

  const dateLogs = form.recentReadDate
    ? [
        {
          dateLogNo: createId(),
          readDate: form.recentReadDate,
        },
      ]
    : [];

  return {
    // BOOK
    bookId: createId(),
    title: form.title.trim(),
    author: form.author.trim(),
    publisher: form.publisher.trim(),

    // READING_RECORD
    recordNo,
    progressRate,
    status: getBookStatus(progressRate),
    startDate: form.startDate,
    finishDate: form.finishDate,
    recentReadDate: form.recentReadDate,
    rating: form.rating === "" ? null : Number(form.rating),
    createdAt: new Date().toISOString(),
    updatedAt: null,

    // READING_MEMO
    memo: {
      memoNo: createId(),
      impression: form.impression.trim(),
      quote: form.quote.trim(),
      oneLineReview: form.oneLineReview.trim(),
    },

    // READING_DATE_LOG
    dateLogs,
  };
}
