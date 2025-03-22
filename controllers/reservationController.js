const pool = require("../config/db");

const getReservations = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, u.name AS user, l.title AS lesson, r.reserved_at
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN lessons l ON r.lesson_id = l.id
      ORDER BY r.reserved_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("예약 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = { getReservations };
