//로그를 발생합니다
async function saveLogs(event,detail="") {
    // 타겟 아이피
    const TARGET_ADDRESS = event.requestContext.identity.sourceIp;
    //요청 URL
    const RESOURCE = event.resource;
    //메소드
    const METHOD = event.httpMethod;

    //해당양식에 맞게 기록
    console.log(`[system] ${METHOD} ${TARGET_ADDRESS} - ${RESOURCE} - detail[${detail}]`);
}
module.exports = saveLogs;
