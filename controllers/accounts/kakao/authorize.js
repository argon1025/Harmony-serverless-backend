/**
 * Kakao authorize
 * 2021 03 25 @ Leeseongrok(argon1025)
 * 카카오 서버와 통신하여 유저가 보낸 토큰의 유효성을 체크합니다
 *
 * TODO
 *  1. 로그를 기록합니다 saveLogs()
 *  2. header 데이터를 로드 합니다 clientDataLoad(event)
 *  3. 카카오restapi서버에 토큰을 전송해 복호화를 받고 appid가 일치하는지 확인합니다 APIService.checkKakaoAppidValidation()
 *  4. 카카오 RESTAPI 서버에 토큰을 전송해 유저 데이터를 받아옵니다 APIService.getKakaoUserInfo()
 *  5. 데이터베이스에 kakaouserid를 기반으로 유저의 가입유무를 확인합니다 Mysql.alreadyRegisteredKakaoUser()
 *  6. 이후 정상처리 응답을 반환합니다 Create.nomalResponse()
 */

const Create = require("../../../service/Response");
const saveLogs = require("../../../service/saveLogs");
const APIService = require("../../../service/APIService");
const Mysql = require("../../../service/Mysql");

//head, 데이터 로드 (usertoken, usertokenType)
async function clientDataLoad(event) {
    let bodyData;
    let headData;

    try {
        //head, body data parse
        headData = event.headers;

        // head 데이터가 존재하지 않는 경우
        if (!headData.usertoken || !headData.usertokentype) {
            throw new Error("HeadData does not exist");
        }

        // data 리턴
        return {
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
        saveLogs(event, "Kakao authorize", true);

        //데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        // 토큰 유효성 검증부
        await APIService.checkKakaoAppidValidation(userData.userToken);

        // 토큰 으로 카카오 인증서버에 유저정보 요청
        const kakaoUserInfoData = await APIService.getKakaoUserInfo(
            userData.userToken
        );

        //받아온 정보에서 가입된 회원인지 체크
        await Mysql.kakaoUserSignIn(kakaoUserInfoData.id);

        // 정상 처리 response 생성
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Kakao User Token Authentication Successful`,
        });
    } catch (error) {
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }

    return response;
};
