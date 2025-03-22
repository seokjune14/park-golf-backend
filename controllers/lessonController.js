const pool = require("../config/db");

const getLessons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM lessons");
    res.json(rows);
  } catch (err) {
    console.error("레슨 불러오기 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = { getLessons };
