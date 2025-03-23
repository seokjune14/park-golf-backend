const pool = require("../config/db");

// [1] 전체 레슨 조회
const getLessons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM lessons");
    res.json(rows);
  } catch (err) {
    console.error("레슨 전체 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// [2] 특정 레슨 상세 조회
const getLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM lessons WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).send("레슨을 찾을 수 없습니다.");
    res.json(rows[0]);
  } catch (err) {
    console.error("레슨 상세 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// [3] 레슨 등록
const createLesson = async (req, res) => {
  const { title, description, date, time, location, price } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO lessons (title, description, date, time, location, price) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, date, time, location, price]
    );
    res.status(201).json({ id: result.insertId, title, description, date, time, location, price });
  } catch (err) {
    console.error("레슨 등록 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// [4] 레슨 수정
const updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time, location, price } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE lessons SET title = ?, description = ?, date = ?, time = ?, location = ?, price = ? WHERE id = ?",
      [title, description, date, time, location, price, id]
    );
    res.json({ id, title, description, date, time, location, price });
  } catch (err) {
    console.error("레슨 수정 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// [5] 레슨 삭제
const deleteLesson = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM lessons WHERE id = ?", [id]);
    res.json({ message: "레슨 삭제 완료" });
  } catch (err) {
    console.error("레슨 삭제 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
