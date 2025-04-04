const pool = require("../config/db");

// 로그인 컨트롤러
const loginUser = async (req, res) => {
  const { userEmail, userPw } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ? AND userPw = ?",
      [userEmail, userPw]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const user = rows[0];

    res.status(200).json({
      message: "로그인 성공",
      user: {
        userNum: user.userNum,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole
      }
    });
  } catch (err) {
    console.error("로그인 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = { loginUser };
