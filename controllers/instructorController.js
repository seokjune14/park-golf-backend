const pool = require("../config/db");

// 강사 목록 조회 API
const getInstructors = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM instructors");
    res.json(rows);
  } catch (err) {
    console.error("강사 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 강사 등록 API
const createInstructor = async (req, res) => {
  const { name, bio, photo_url, region } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO instructors (name, bio, photo_url, region) VALUES (?, ?, ?, ?)",
      [name, bio, photo_url, region]
    );
    res.status(201).json({ id: result.insertId, name, bio, photo_url, region });
  } catch (err) {
    console.error("강사 등록 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = { getInstructors, createInstructor };
