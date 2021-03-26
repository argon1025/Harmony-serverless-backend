"use strict";
const controllers = require("./controllers");

/**
 * demo Handler
 */
module.exports.hello = controllers.accounts.hello;

/**
 * accounts Handler
 */
module.exports.accounts = {
    // POST /api/v1/kakao/account 회원등록을 요청
    kakaoAcount: controllers.accounts.kakaoAcount,
    // GET /api/v1/kakao/authorize 로그인을 요청
    kakaoAuthorize: controllers.accounts.kakaoAuthorize,
    // GET /api/v1/accounts/:accountID 유저 정보를 요청
    userInfo: controllers.accounts.userInfo,
};
