-- 데이터베이스 생성 및 사용
CREATE DATABASE IF NOT EXISTS parkgolf;
USE parkgolf;

-- 유저 테이블: 회원 정보 저장
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- 유저 고유 ID
  name VARCHAR(50) NOT NULL,                       -- 이름
  email VARCHAR(100) NOT NULL UNIQUE,              -- 이메일
  password VARCHAR(100) NOT NULL,                  -- 비밀번호
  phone VARCHAR(20),                               -- 전화번호
  location VARCHAR(100)                            -- 지역
);

INSERT INTO users (name, email, password, phone, location) VALUES
('홍길동', 'hong@gmail.com', '12345678', '010-1234-5678', '서울'),
('박철수', 'park@gmail.com', '23456789', '010-2345-6789', '부산'),
('김영희', 'kim@gmail.com', '34567890', '010-3456-7890', '대구');

-- 강사 테이블: 강사 정보 저장
DROP TABLE IF EXISTS instructors;
CREATE TABLE instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- 강사 고유 ID
  name VARCHAR(50) NOT NULL,                       -- 이름
  bio TEXT,                                        -- 자기소개
  photo_url VARCHAR(255),                          -- 프로필 사진 URL
  region VARCHAR(100),                             -- 활동 지역
  career_info VARCHAR(255)                         -- 경력 및 자격증
);

INSERT INTO instructors (name, bio, photo_url, region, career_info) VALUES
('박강사', '5년 경력의 파크골프 강사입니다.', 'https://example.com/photo1.jpg', '서울', '파크골프 자격증 보유'),
('이강사', '전문 자격증 보유 강사입니다.', 'https://example.com/photo2.jpg', '부산', '파크골프 대회 3회 수상');

-- 레슨 테이블: 수업 정보 저장
DROP TABLE IF EXISTS lessons;
CREATE TABLE lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- 레슨 고유 ID
  title VARCHAR(100) NOT NULL,                     -- 레슨 제목
  description TEXT,                                -- 설명
  date DATE,                                       -- 날짜
  time TIME,                                       -- 시간
  location VARCHAR(100),                           -- 위치
  price INT                                        -- 가격
);

INSERT INTO lessons (title, description, date, time, location, price) VALUES
('입문 레슨', '처음 배우는 분들을 위한 기초 과정입니다.', '2025-04-01', '10:00:00', '서울 파크골프장', 20000),
('중급 레슨', '중급 기술을 배우는 실전 과정입니다.', '2025-04-02', '14:00:00', '부산 파크골프장', 30000);

-- 예약 테이블: 유저가 레슨 예약한 정보
DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- 예약 고유 ID
  user_id INT NOT NULL,                            -- 유저 ID (외래키)
  lesson_id INT NOT NULL,                          -- 레슨 ID (외래키)
  reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 예약 시간
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

INSERT INTO reservations (user_id, lesson_id) VALUES
(1, 1),
(2, 2);
