/**
 * user Info
 * 2021 03 26 @ Leeseongrok(argon1025)
 * 유저 정보를 반환합니다
 *
 * 추후 전체 유저데이터 반환에서 페이징 기능을 구현해야합니다
 *
 * TODO
 *  1. 로그를 기록합니다 saveLogs()
 *  2. 쿼리스트링을 로드합니다 clientDataLoad(event)
 *  3. 쿼리 스트링이 존재한다면 유저가 보낸 데이터값을 검증합니다 DataVerification.checkNumber()
 *  4. 유저 정보를 요청합니다 Mysql.getUserInfo(userId) userId가 null일경우 전체 목록을 반환합니다
 *  5. 이후 정상처리 응답을 반환합니다 Create.nomalResponse()
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

        if (!queryString || !queryString.userid) {
            saveLogs(event, "queryString don't have userid", false);
            return {
                userid: null,
            };
        }

        return {
            userId: queryString.userid,
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
        saveLogs(event, "Kakao account join", false);

        //데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        // 특정 userid 정보조회만 요청했을 경우
        // 해당 쿼리 스트링 데이터를 검증
        if (userData.userId) {
            await DataVerification.checkNumber(userData.userId);
        }

        // 데이터베이스 질의
        const databaseResult = await Mysql.getAccountInfo(userData.userId);

        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `User Data Load successful`,
            data: databaseResult,
        });
    } catch (error) {
        // 오류 응답 생성
        //console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
};
