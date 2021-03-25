/**
 * Kakao authorize
 * 2021 03 18 @ Leeseongrok(argon1025)
 * 
 * Response JSON 작성모듈
 * /service/Response
 * 
 * Log 기록 모듈
 * /service/saveLogs
 * 
 * TODO
 *  - 카카오 서버와 통신하여 유저가 보낸 토큰의 유효성을 체크합니다
 *  - 가입 유무를 체크합니다
 *  - 사용자 프로필을 최신화 합니다
 *  - 사용자 권한을 확인했다는 응답을 반환합니다
 */

const Create = require("../../../service/Response");
const saveLogs = require("../../../service/saveLogs");

module.exports = async (event) => {
    console.log(event);
    saveLogs(event,"Kakao authorize"); // 로그 저장

    const response = await Create.nomalResponse(200,null,{msg:"Kakao authorize"});
    return response;
};
