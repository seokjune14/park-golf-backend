const pool = require("../config/db");
const bcrypt = require("bcrypt");

// 로그인 컨트롤러
const loginUser = async (req, res) => {
  // 클라이언트에서 보내는 데이터 키와 일치시킵니다.
  const { userEmail, userPw } = req.body;

  // 입력값 검증
  if (!userEmail || !userPw) {
    return res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }

  try {
    // userEmail로 사용자 조회 (users 테이블 기준)
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const user = rows[0];

    // bcrypt를 사용하여 클라이언트에서 보낸 비밀번호(userPw)와 데이터베이스의 해시된 비밀번호(user.userPw)를 비교합니다.
    const isMatch = await bcrypt.compare(userPw, user.userPw);
    if (!isMatch) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    res.status(200).json({
      message: "로그인 성공",
      user: {
        userNum: user.userNum,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
      }
    });
  } catch (err) {
    console.error("로그인 실패:", err);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = { loginUser };
