/**
 * Project Create
 * 2021 03 29 @ Leeseongrok(argon1025)
 * 프로젝트를 생성합니다
 *
 *
 * TODO
 * 헤더 ( 토큰, 토큰타입, 서비스 유저id, )
 * 바디(제목, 콘텐트)
 */
 const Create = require("../../service/Response");
 const saveLogs = require("../../service/saveLogs");
 const DataVerification = require("../../service/DataVerification");
 const Mysql = require("../../service/Mysql");

 async function clientDataLoad(event) {
    let bodyData;
    let headData;
    try {
        // Head-Data 적재
        headData = event.headers;

        //Body-Data 적재
        try {
            bodyData = JSON.parse(event.body);
        } catch (error) {
            throw new Error('BodyData is invalid');
        }

        //데이터 존재유무 체크
        // head 데이터가 존재하지 않는 경우
        if (!headData.usertoken || !headData.usertokentype || !headData.userid) {
            throw new Error("HeadData does not exist");
        }
        // body 데이터가 존재하지 않는경우
        if (!bodyData || !bodyData.title || !bodyData.content) {
            throw new Error("BodyData does not exist");
        }

        //데이터 리턴
        return {
            userToken: headData.usertoken,
            userTokenType: headData.usertokentype,
            userID: headData.userid,
            title: bodyData.title,
            content: bodyData.content,
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
        saveLogs(event, "Project Create", true);

        // 데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        //데이터 검증
        await DataVerification.checkNumber(userData.userID);
        await DataVerification.checkTitle(userData.title);
        await DataVerification.checkContent(userData.content);

        //데이터 질의

        
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Project Create successful`,
            data: userData,
        });
    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
}