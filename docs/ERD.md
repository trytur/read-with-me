<img width="1870" height="702" alt="image" src="https://github.com/user-attachments/assets/c17c7f72-118d-49bb-802a-fcb72cc203e4" />


### ERD 설명

- BOOK, READING_RECORD, READING_MEMO, READING_DATE_LOG 총 4개 테이블로 구성한다. 
  
- BOOK Tabe : 도서의 기본 정보를 저장하는 테이블로, 도서 고유 ID, 제목, 저자, 출판사를 관리한다. 

- READING_RECORD Table : 독서 기록의 핵심 테이블로, 진도율, 독서 시작일, 완독일, 별점, 기록 생성 및 수정 일시를 관리한다. 진도율을 기반으로 독서 상태를 자동 계산하며 (0% 읽고 싶음 / 1~99% 읽는 중 / 100% 완독), 서재의 정렬 및 필터링 기준이 된다.

- READING_MEMO Table : 독서 기록에 종속된 메모 테이블로, 느낀점, 기록하고 싶은 구절, 한줄평을 관리한다. 각 메모는 특정 독서 기록에 귀속되며 독서기록 번호를 통해 참조한다.

- READING_DATE_LOG Table : 실제로 책을 읽은 날짜를 로그 형태로 기록하는 테이블로, 출석 체크 달력 표시와 총 독서 일수 계산의 기준이 된다. 동일 날짜에 여러 기록이 존재해도 1일 출석으로 처리한다.

- 테이블 관계: BOOK 1:N READING_RECORD / READING_RECORD 1:1 READING_MEMO / READING_RECORD 1:N READING_DATE_LOG

- localStorage 기반 프로젝트로 ERD는 JSON 데이터 구조의 설계도로 활용한다.
