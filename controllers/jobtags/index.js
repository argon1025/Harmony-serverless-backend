/**
 * jobtags controller index
 * jobtag 관련 로직을 관리하는 index.js 입니다
 *
 *
 * @ author leeseongrok(argon1025@gmail.com) - 2021.3.11
 * @ version 1.0
 *
 */
///////////////////////////////////// => 로직 로드
const jobTagListLogic = require("./jobTagList");

///////////////////////////////////// => export
module.exports.jobTagList = jobTagListLogic;
