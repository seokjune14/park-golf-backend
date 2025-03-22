const express = require("express");
const router = express.Router();
const { getInstructors, createInstructor } = require("../controllers/instructorController");

router.get("/", getInstructors);      // 강사 전체 조회
router.post("/", createInstructor);   // 강사 등록

module.exports = router;
