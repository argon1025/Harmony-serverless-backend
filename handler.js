"use strict";
const controllers = require("./controllers");

/**
 * accounts Handler
 */
module.exports.accounts = {
    // POST /api/v1/kakao/account 회원등록을 요청
    kakaoAcount: controllers.accounts.kakaoAcount,
    // GET /api/v1/kakao/authorize 로그인을 요청
    kakaoAuthorize: controllers.accounts.kakaoAuthorize,
    // GET /api/v1/accounts유저 정보를 요청
    userInfo: controllers.accounts.userInfo,
    // PUT /api/v1/accounts/:accountID 유저 정보를 수정합니다
    modifyAccount: controllers.accounts.modifyAccount,
};

/**
 * jobTags Handler
 */
module.exports.jobTags = {
    // GET /api/v1/jobtags 잡 태그 리스트
    jobTagList: controllers.jobtags.jobTagList,
};

/**
 * projects Handler
 */
module.exports.projects = {
    // GET /api/v1/projects 프로젝트 리스트
    projectList: controllers.projects.projectList,
    // POST /api/v1/projects 프로젝트 생성
    projectCreate: controllers.projects.projectCreate,
    // PUT /api/v1/projects/:projectID 프로젝트 수정
    projectModify: controllers.projects.projectModify,
    // DELETE /api/v1/projects/:projectID 프로젝트 삭제
    projectDelete: controllers.projects.projectDelete,
};
