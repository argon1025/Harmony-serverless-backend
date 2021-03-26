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
const DataVerification = require("../../service/DataVerification"); // 데이터 검증 모듈
async function clientDataLoad(event) {
    let queryString;

    try {
        queryString = event.queryStringParameters;

        if (!queryString.userid) {
            saveLogs(event, "queryString don't have userid", false);
            return {
                userid: null,
            };
        }

        return {
            userid: queryString.userid,
        };
    } catch (error) {
        throw error;
    }
}
module.exports = async (event) => {
    let response; // responseData
    let userData; // bodyData

    try {
        // 로그 출력
        saveLogs(event, "Kakao account join", true);

        //데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        // 특정 userid 정보조회만 요청했을 경우
        // 해당 쿼리 스트링 데이터를 검증
        if(userData.userid){
           await DataVerification.checkNumber(userData.userid);
        }

        // 데이터베이스 질의
        const databaseResult = await Mysql.getUserInfo(userData.userid);

        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Kakao User registration successful`,
            data: databaseResult,
        });

    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
};
