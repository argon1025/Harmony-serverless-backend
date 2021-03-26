/**
 * user Info
 * 2021 03 26 @ Leeseongrok(argon1025)
 * 유저 정보를 반환합니다
 * 
 * 추후 전체 유저데이터 반환에서 페이징 기능을 구현해야합니다
 *
 * TODO
 *  1. 쿼리 스트링 존재 유무를 파악하고 리턴
 *  2. 쿼리 스트링이 존재한다면 데이터 검증
 *  3. 쿼리스트링이 존재한다면 해당 데이터만 DB에서 리턴 아닐경우 전체 유저 데이터 리턴 리밋 1000
 */

 const Create = require("../../service/Response"); // 응답 생성 모듈
 const saveLogs = require("../../service/saveLogs"); // 로그 생성 모듈
 const APIService = require("../../service/APIService"); // API 서비스 모듈
 const Mysql = require("../../service/Mysql"); // 데이터베이스 접근 모듈
 const DataVerification = require("../../../service/DataVerification"); // 데이터 검증 모듈

 module.exports = async(event)=>{
    console.log(event);
    return Create.nomalResponse(200, null, {
        error: false,
        msg: `user info`,
    });
 }