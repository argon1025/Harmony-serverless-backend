/**
 * Project List
 * 2021 03 29 @ Leeseongrok(argon1025)
 * 프로젝트 리스트를 반환합니다
 *
 * 추후 전체 데이터 반환에서 페이징 기능을 구현해야합니다
 *
 * TODO
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

        if (!queryString || !queryString.title) {
            saveLogs(event, "queryString don't have title", false);
            return {
                title: null,
            };
        }
        return {
            title: queryString.title,
        };
    } catch (error) {
        throw error;
    }
}
module.exports = async (event) => {
    let response;
    let userData;
    try {
        // 로그 출력
        saveLogs(event, "Project List", true);

        //데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        //쿼리 스트링 데이터가 있을경우 title에 대한 데이터 검증
        if(userData.title){
            await DataVerification.checkTitle(userData.title);
        }

        // 데이터베이스 질의
        const databaseResult = Mysql.getProjectList(userData.title);

        // 응답 생성
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `User Data Load successful`,
            data: databaseResult,
        });

    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
}