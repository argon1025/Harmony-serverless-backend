/**
 * Project Modify
 * 2021 03 29 @ Leeseongrok(argon1025)
 * 프로젝트를 수정합니다
 *
 *
 * TODO
 */
 const Create = require("../../service/Response"); // 응답 생성 모듈
 const saveLogs = require("../../service/saveLogs"); // 로그 생성 모듈
 const APIService = require("../../service/APIService"); // API 서비스 모듈
 const Mysql = require("../../service/Mysql"); // 데이터베이스 접근 모듈
 const DataVerification = require("../../service/DataVerification"); // 데이터 검증 모듈

module.exports = async (event) => {
    return await Create.nomalResponse(200, null, {
        error: false,
        msg: `Project Modify successful`,
    });
}