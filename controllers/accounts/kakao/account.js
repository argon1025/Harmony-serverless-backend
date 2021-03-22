/**
 * Kakao account join
 * 2021 03 18 @ Leeseongrok(argon1025)
 *
 * Response JSON 작성모듈
 * /service/Response
 *
 * Log 기록 모듈
 * /service/saveLogs
 *
 * TODO
 *  - 헤더 데이터, 바디데이터 존재유무를 체크하고 데이터를 로드합니다
 *  - 데이터내 금지된 문자열이 있는지 체크합니다
 *  - 헤더 토큰 데이터를 axios로 kakao api 서버와 통신하여 데이터를 받아옵니다
 *  - 받아온 데이터에서 appid 가 서버 appid와 동일한지 체크합니다
 *  - userid가 이미 가입된 userid인지 체크합니다
 *  - DB에 기록합니다
 */

const axios = require("axios"); // HTTP 비동기 통신 라이브러리

const Create = require("../../../service/Response");
const saveLogs = require("../../../service/saveLogs");
const DataVerification = require("../../../service/DataVerification");

//head, body  데이터 로드 (usertoken, usertokenType, blogLink, jobTag)
async function clientDataLoad(event) {
    let bodyData;
    let headData;

    try {
        //head, body data parse
        headData = event.headers;
        bodyData = JSON.parse(event.body);

        // body 데이터가 존재하지 않는경우
        if (!bodyData.blogLink || !bodyData.jobTag || !bodyData) {
            throw new Error("BodyData does not exist");
        }

        // head 데이터가 존재하지 않는 경우
        if (!headData.usertoken || !headData.usertokentype) {
            throw new Error("HeadData does not exist");
        }

        // data 리턴
        return {
            blogLink: bodyData.blogLink,
            jobTag: bodyData.jobTag,
            userToken: headData.usertoken,
            userTokenType: headData.usertokentype,
        };
    } catch (error) {
        // 에러 생성
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

        // 데이터 값 검증 에러 반환 유무만 체크
        await DataVerification.checkURL(userData.blogLink);
        await DataVerification.checkJobtag(userData.jobTag);

        // 정상 처리 response 생성
        response = await Create.nomalResponse(200, null, {
            msg: `Kakao account join ${userData.blogLink} ${userData.jobTag} ${userData.userToken} ${userData.userTokenType}`,
        });

        console.log(userData);
    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }

    return response;
};
