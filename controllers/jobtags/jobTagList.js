/**
 * jobTagList
 * 2021 03 26 @ Leeseongrok(argon1025)
 * 직업 태그 리스트를 반환합니다
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
    response = await Create.nomalResponse(200, null, {
        error: false,
        msg: `jobTags load successful`,
    });
    return response;
};