
-- DB 생성
CREATE DATABASE IF NOT EXISTS parkgolf;
USE parkgolf;

-- 유저 테이블 id,이름,이메일,비밀번호,전화번호,지역
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(100)
);

INSERT INTO users (name, phone, location) VALUES
('홍길동', '010-1234-5678', '서울'),
('박철수', '010-2345-6789', '부산'),
('김영희', '010-3456-7890', '대구');

-- 강사 테이블 강사 고유 id, 이름, 자기소개, 프로필 사진 url, 활동 지역, 경력 및 자격증
DROP TABLE IF EXISTS instructors;
CREATE TABLE instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  bio TEXT,
  photo_url VARCHAR(255),
  region VARCHAR(100)
);

INSERT INTO instructors (name, bio, photo_url, region) VALUES
('박강사', '5년 경력의 파크골프 강사입니다.', 'https://example.com/photo1.jpg', '서울'),
('이강사', '전문 자격증 보유 강사입니다.', 'https://example.com/photo2.jpg', '부산');

-- 레슨 테이블 레슨 고유 id, 레슨 제목, 설명, 날짜, 시간, 위치, 가격
DROP TABLE IF EXISTS lessons;
CREATE TABLE lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  date DATE,
  time TIME,
  location VARCHAR(100),
  price INT
);

INSERT INTO lessons (title, description, date, time, location, price) VALUES
('입문 레슨', '처음 배우는 분들을 위한 기초 과정입니다.', '2025-04-01', '10:00:00', '서울 파크골프장', 20000),
('중급 레슨', '중급 기술을 배우는 실전 과정입니다.', '2025-04-02', '14:00:00', '부산 파크골프장', 30000);

-- 예약 테이블 예약 고유 id, 유저 id, 레슨 id, 예약시간
DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

INSERT INTO reservations (user_id, lesson_id) VALUES
(1, 1),
(2, 2);
