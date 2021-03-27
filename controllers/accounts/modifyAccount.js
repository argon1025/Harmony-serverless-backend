/**
 * Modify Account
 * 2021 03 26 @ Leeseongrok(argon1025)
 * 유저 정보를 수정합니다
 *
 *
 *
 * TODO
 * 1. 로그를 기록합니다  saveLogs()
 * 2. 유저가 보낸 데이터 존재유무 체크 및 데이터를 로드 합니다 clientDataLoad(event)
 * 3. 유저가 보낸 데이터값을 검증합니다 DataVerification.checkURL()
 * 4. 앱 ID가 일치하는지 토큰 유효성을 검증합니다 APIService.checkKakaoAppidValidation()
 * 5. accountID가 카카오 userid 속성을 가지는지 권한을 확인합니다
 * 6. 정보를 수정합니다
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
        // 로그 출력
        saveLogs(event, "Modify Account", true);

        //데이터 존재 유무 체크 및 데이터 로드
        //    accountID: pathParameter.accountID,
        //    userToken: headData.usertoken,
        //    userTokenType: headData.usertokentype,
        //    blogLink: bodyData.blogLink,
        //    jobTag: bodyData.jobTag,
        //    name: bodyData.name,
        //    profileImageUrl: bodyData.profileImageUrl,
        userData = await clientDataLoad(event);

        // 데이터 값 검증, 에러 반환 유무만 체크
        await DataVerification.checkURL(userData.blogLink);
        await DataVerification.checkJobtag(userData.jobTag);
        await DataVerification.checkName(userData.name);
        await DataVerification.checkURL(userData.profileImageUrl);

        // 토큰 유효성 검증부
        await APIService.checkKakaoAppidValidation(userData.userToken);

        // 토큰 으로 카카오 인증서버에 유저정보 요청
        const kakaoUserInfoData = await APIService.getKakaoUserInfo(
            userData.userToken
        );
        
        // 수정요청한 어카운트의 id와 카카오 토큰 userid와  일치하는지 확인합니다
        await Mysql.checkAccountIDforKakao(userData.accountID,kakaoUserInfoData.id);

        await Mysql.updateAccountInfo(userData.accountID,userData.blogLink,userData.jobTag,userData.name,userData.profileImageUrl);

        // 정상 처리 response 생성
        //${userData.blogLink} ${userData.jobTag} ${userData.userToken} ${userData.userTokenType} ${kakaoUserInfoData.id} ${kakaoUserInfoData.kakao_account.profile.nickname} ${kakaoUserInfoData.kakao_account.profile.profile_image_url}
        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `Account update successful`,
        });
    } catch (error) {
        // 오류 응답 생성
        console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
}