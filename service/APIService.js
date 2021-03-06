/**
 * APIService
 * 2021.04.04
 * 외부 REST API 요청이 필요한경우 사용되는 클래스 입니다
 * 
 * checkKakaoAppidValidation(kakaoToken)
 * 해당 토큰의 AppID와 서비스 AppID를 비교해 토큰 유효성을 검증합니다
 * 
 * getKakaoUserInfo(userToken)
 * 토큰 유저 정보를 로드합니다 이후 유저 데이터만 반환합니다
 */
const axios = require("axios");

class APIService {
    //카카오 토큰 유효성 검증
    async checkKakaoAppidValidation(userToken) {
        try {
            const URL_HOST = "https://kapi.kakao.com/v1/user/access_token_info";
            const APPID = 553373; // 추후 환경변수로 작성 필요

            const result = await axios.get(URL_HOST, {
                headers: {
                    Authorization: `Bearer {${userToken}}`,
                },
            });
            if (result.data.appId === APPID) {
                return true;
            } else {
                throw new Error("Token validation failed");
            }
        } catch (error) {
            //모든 에러를 아래문구로 처리 추후 상세 에러 로깅시 error 매개변수 사용
            throw new Error("Token validation failed");
        }
    }
    // 카카오 유저정보 로드
    async getKakaoUserInfo(userToken) {
        try {
            const URL_HOST = "https://kapi.kakao.com/v2/user/me";

            const result = await axios.get(URL_HOST, {
                headers: {
                    Authorization: `Bearer {${userToken}}`,
                },
            });

            return result.data;
        } catch (error) {
            //모든 에러를 아래문구로 처리 추후 상세 에러 로깅시 error 매개변수 사용
            throw new Error("Failed to load user information on Kakao server");
        }
    }
}

module.exports = new APIService();
