/**
 * jobTagList
 * 2021 03 26 @ Leeseongrok(argon1025)
 * 직업 태그 리스트를 반환합니다
 *
 *
 * TODO
 */
 const Create = require("../../service/Response"); // 응답 생성 모듈
 const saveLogs = require("../../service/saveLogs"); // 로그 생성 모듈
 const Mysql = require("../../service/Mysql"); // 데이터베이스 접근 모듈

 module.exports = async (event) => {
    let response;
    try{
        // 로그 출력
        saveLogs(event, "Jobtags list", false);

        // 데이터베이스 질의
        const dataBaseResult = await Mysql.getJobTagList();

        response = await Create.nomalResponse(200, null, {
            error: false,
            msg: `JobTags Load successful`,
            data: dataBaseResult,
        });
    }catch(error){
        // 오류 응답 생성
        //console.log(error);
        response = await Create.errorResponseUseErrorTable(error);
    }
    return response;
};