/**
 * Project Delete
 * 2021 03 29 @ Leeseongrok(argon1025)
 * 프로젝트를 삭제합니다
 *
 *
 * TODO
 */
 const Create = require("../../service/Response"); // 응답 생성 모듈
 const saveLogs = require("../../service/saveLogs"); // 로그 생성 모듈
 const APIService = require("../../service/APIService"); // API 서비스 모듈
 const Mysql = require("../../service/Mysql"); // 데이터베이스 접근 모듈
 const DataVerification = require("../../service/DataVerification"); // 데이터 검증 모듈

 async function clientDataLoad(event) {
    let headData;
    let pathParameter;

    try {
        // Head-Data 적재
        headData = event.headers;

        // path-Parameter 적재
        pathParameter = event.pathParameters;

        //데이터 존재유무 체크
        // head 데이터가 존재하지 않는 경우
        if (!headData.usertoken || !headData.usertokentype || !headData.userid) {
            throw new Error("HeadData does not exist");
        }

        //데이터 리턴
        return {
            userToken: headData.usertoken,
            userTokenType: headData.usertokentype,
            userID: headData.userid,
            projectID: pathParameter.projectID,
        }
    } catch (error) {
        throw error;
    }
 }
module.exports = async (event) => {
    let userData;
    let response;

    try {
        //로그 저장
        saveLogs(event, "Project Delete", true);

        // 데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        //데이터 검증
        await DataVerification.checkNumber(userData.userID);
        await DataVerification.checkNumber(userData.projectID);

        //데이터 질의

        
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Project Delete successful`,
            data: userData,
        });
    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
}