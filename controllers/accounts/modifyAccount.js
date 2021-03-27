/**
 * Modify Account
 * 2021 03 26 @ Leeseongrok(argon1025)
 * 유저 정보를 수정합니다
 *
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
    let pathParameter;
    let headData;
    let bodyData;

    try {
        headData = event.headers;
        pathParameter = event.pathParameters;

        // Body data 변환 시도
        try {
            bodyData = JSON.parse(event.body);
        } catch (error) {
            throw new Error('BodyData is invalid')
        }

        // path parameter 존재유무 확인
        if(!pathParameter.accountID){
            throw new Error('accountID does not exist')
        }

        // head 데이터가 존재하지 않는 경우
        if (!headData.usertoken || !headData.usertokentype) {
            throw new Error("HeadData does not exist");
        }

        // body data 존재유무 확인
        if (!bodyData || !bodyData.blogLink || !bodyData.jobTag || !bodyData.name || !bodyData.profileImageUrl) {
            throw new Error("BodyData does not exist");
        }

        return {
            accountID: pathParameter.accountID,
            userToken: headData.usertoken,
            userTokenType: headData.usertokentype,
            blogLink: bodyData.blogLink,
            jobTag: bodyData.jobTag,
            name: bodyData.name,
            profileImageUrl: bodyData.profileImageUrl,
        };
    } catch (error) {
        throw error;
    }
}
module.exports = async(event)=>{
    let response; // responseData
    let userData; // bodyData
    try {
        userData = await clientDataLoad(event);
        console.log(userData);
        // 정상 처리 response 생성
        //${userData.blogLink} ${userData.jobTag} ${userData.userToken} ${userData.userTokenType} ${kakaoUserInfoData.id} ${kakaoUserInfoData.kakao_account.profile.nickname} ${kakaoUserInfoData.kakao_account.profile.profile_image_url}
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Kakao User registration successful`,
        });
    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
}