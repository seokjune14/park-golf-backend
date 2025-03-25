-- 1. 외래키 제약조건 비활성화
SET FOREIGN_KEY_CHECKS = 0;

-- 2. 사용할 데이터베이스 선택
USE parkgolf;

-- 3. 기존 테이블 삭제
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS instructors;
-- 4. 사용자(users) 테이블 생성
CREATE TABLE users (
  userNum INT AUTO_INCREMENT PRIMARY KEY,        -- 사용자 고유번호
  userName VARCHAR(50) NOT NULL,                 -- 사용자 이름
  userEmail VARCHAR(100) NOT NULL UNIQUE,        -- 사용자 이메일
  userPw VARCHAR(100) NOT NULL,                  -- 사용자 비밀번호
  userinfo TEXT,                                 -- 강사 경력 및 자격증 (일반 유저는 NULL)
  userImg VARCHAR(255)                           -- 강사 프로필 이미지 (일반 유저는 NULL)
);

-- 5. 사용자 예시 데이터 삽입
INSERT INTO users (userName, userEmail, userPw, userinfo, userImg) VALUES
('홍길동', 'hong@gmail.com', '12345678', NULL, NULL),
('김강사', 'kang@gmail.com', 'qwer1234', '파크골프 자격증, 대회 수상 경력 있음', 'https://example.com/instructor.jpg');

-- 6. 레슨(lessons) 테이블 생성
CREATE TABLE lessons (
  lesNum INT AUTO_INCREMENT PRIMARY KEY,         -- 레슨 고유번호
  userNum INT NOT NULL,                          -- 강사 userNum (외래키)
  lesName VARCHAR(100) NOT NULL,                 -- 레슨명
  lesinfo TEXT,                                  -- 레슨 설명
  lesPlace VARCHAR(100),                         -- 장소
  lesPrice INT,                                  -- 가격
  lesTime TIME,                                  -- 시간
  FOREIGN KEY (userNum) REFERENCES users(userNum) ON DELETE CASCADE
);

-- 7. 레슨 예시 데이터 삽입
INSERT INTO lessons (userNum, lesName, lesinfo, lesPlace, lesPrice, lesTime) VALUES
(2, '입문 레슨', '기초부터 배우는 파크골프 입문 과정입니다.', '서울 파크골프장', 20000, '10:00:00'),
(2, '중급 레슨', '실전 중심의 중급자 대상 레슨입니다.', '부산 파크골프장', 30000, '14:00:00');

-- 8. 외래키 제약조건 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;
