/**
 * Kakao account join
 * 2021 03 18 @ Leeseongrok(argon1025)
 * 카카오 어카운트를 서버에 등록합니다
 *
 * TODO
 *  1. 로그를 기록합니다 saveLogs()
 *  2. header body데이터를 로드 합니다 clientDataLoad(event)
 *  3. 유저가 보낸 데이터값을 검증합니다 DataVerification.checkURL(), DataVerification.checkJobtag()
 *  4. 카카오restapi서버에 토큰을 전송해 복호화를 받고 appid가 일치하는지 확인합니다 APIService.checkKakaoAppidValidation()
 *  5. 카카오 RESTAPI 서버에 토큰을 전송해 유저 데이터를 받아옵니다 APIService.getKakaoUserInfo()
 *  6. 데이터베이스에 kakaouserid를 기반으로 유저의 가입유무를 확인합니다 Mysql.alreadyRegisteredKakaoUser()
 *  7. 가입된 어카운트가 아니라면 데이터베이스에 유저를 등록합니다 Mysql.registerKakaoUserAccount()
 *  8. 이후 정상처리 응답을 반환합니다 Create.nomalResponse()
 */

const Create = require("../../../service/Response");
const saveLogs = require("../../../service/saveLogs");
const DataVerification = require("../../../service/DataVerification");
const APIService = require("../../../service/APIService");
const Mysql = require("../../../service/Mysql");

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
        saveLogs(event, "Kakao account join", false);

        //데이터 존재 유무 체크 및 데이터 로드
        userData = await clientDataLoad(event);

        // 데이터 값 검증 에러 반환 유무만 체크
        await DataVerification.checkURL(userData.blogLink);
        await DataVerification.checkJobtag(userData.jobTag);

        // 토큰 유효성 검증부
        await APIService.checkKakaoAppidValidation(userData.userToken);

        // 토큰 으로 카카오 인증서버에 유저정보 요청
        const kakaoUserInfoData = await APIService.getKakaoUserInfo(
            userData.userToken
        );

        //받아온 정보에서 가입된 회원인지 체크
        await Mysql.alreadyRegisteredKakaoUser(kakaoUserInfoData.id);

        // 가입된 회원이 아니라면 유저 데이터저장
        await Mysql.registerKakaoUserAccount({
            blogLink: userData.blogLink,
            jobTag: userData.jobTag,
            userId: kakaoUserInfoData.id,
            nickname: kakaoUserInfoData.kakao_account.profile.nickname,
            profileImageUrl: kakaoUserInfoData.kakao_account.profile.profile_image_url,
        });

        // 정상 처리 response 생성
        //${userData.blogLink} ${userData.jobTag} ${userData.userToken} ${userData.userTokenType} ${kakaoUserInfoData.id} ${kakaoUserInfoData.kakao_account.profile.nickname} ${kakaoUserInfoData.kakao_account.profile.profile_image_url}
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Kakao User registration successful`,
        });
    } catch (error) {
        // 오류 응답 생성
        //console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }

    return response;
};
