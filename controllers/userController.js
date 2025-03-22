const pool = require("../config/db");

// 유저 목록 조회
const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("유저 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 유저 등록
const createUser = async (req, res) => {
  const { name, phone, location } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, phone, location) VALUES (?, ?, ?)",
      [name, phone, location]
    );
    res.status(201).json({ id: result.insertId, name, phone, location });
  } catch (err) {
    console.error("유저 등록 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = { getUsers, createUser };
