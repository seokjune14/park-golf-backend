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
  const { userName, userEmail, userPw, userinfo, userImg } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO users (userName, userEmail, userPw, userinfo, userImg) VALUES (?, ?, ?, ?, ?)",
      [userName, userEmail, userPw, userinfo, userImg]
    );
    res.status(201).json({
      userNum: result.insertId,
      userName,
      userEmail,
      userPw,
      userinfo,
      userImg
    });
  } catch (err) {
    console.error("유저 등록 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = { getUsers, createUser };
