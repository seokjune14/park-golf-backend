const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");
const lessonRoutes = require("./routes/lessonRoutes"); 
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

app.use("/api/lessons", lessonRoutes);
app.use("/api/instructors", instructorRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.send(`DB 연결 성공! 결과: ${rows[0].result}`);
  } catch (err) {
    console.error("DB 연결 실패:", err);
    res.status(500).send("DB 연결 실패");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중! http://localhost:${PORT}`);
});
