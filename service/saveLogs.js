//로그생성 서비스
async function saveLogs(event,detail="",fullLogs=false) {
    // 타겟 아이피
    const TARGET_ADDRESS = event.requestContext.identity.sourceIp;
    //요청 URL
    const RESOURCE = event.resource;
    //메소드
    const METHOD = event.httpMethod;

    //해당양식에 맞게 기록
    console.log(`[system] ${METHOD} ${TARGET_ADDRESS} - ${RESOURCE} - detail[${detail}]`);

    //테스트용 전체 이벤트로그 출력
    if(fullLogs){
        console.log(event);
    }
}
module.exports = saveLogs;
