/**
 * saveLogs
 * 2021.04.04
 * 전체 엔드포인트에서 사용되는 로그 생성 모듈입니다 
 * 
 * saveLogs(event,detail="",fullLogs=false)
 * event => AWS APIgateway에서 사용되는 event객체를 이용해서 각종 이벤트를 기록합니다
 * detail => 사용자 정의 코멘트를 지정할 수 있습니다
 * fullLogs => 전체 event 기록여부를 지정합니다
 */
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
