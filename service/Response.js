//에러일경우, 메시지, 코드
class Response {
    constructor() {
        this.ERROR_TABLE = {
            // 사전 정의된 에러코드가 없을경우
            "default Error": {
                statusCode: "500",
                errorCode: "0",
                errorMessage: "Server logic error your data is not valid",
            },
            // 필요한 Body data가 없을경우
            "BodyData does not exist": {
                statusCode: "404",
                errorCode: "1",
                errorMessage: "Bodydata does not exist",
            },
            // Body data parse가 실패했을 겨웅
            "BodyData is invalid": {
                statusCode: "404",
                errorCode: "1",
                errorMessage: "BodyData is invalid",
            },
            // 필요한 HeadData가 없을경우
            "HeadData does not exist": {
                statusCode: "404",
                errorCode: "2",
                errorMessage: "HeadData does not exist",
            },
            // 데이터 검증에 실패했을경우
            "Value verification failed":{
                statusCode: "401",
                errorCode: "3",
                errorMessage: "Value verification failed",
            },
            // 토큰으로 유저정보 로드에 실패했을경우
            "Failed to load user information on Kakao server":{
                statusCode: "400",
                errorCode: "4",
                errorMessage: "Failed to load user information on Kakao server",
            },
            //토큰으로 토큰정보 로드에 실패했을경우
            "Token validation failed":{
                statusCode: "400",
                errorCode: "5",
                errorMessage: "Token validation failed",
            },
            // 이미 가입된 유저일경우
            "already a registered user":{
                statusCode: "401",
                errorCode: "6",
                errorMessage: "already a registered user",
            },
            // 데이터베이스에 유저등록에 실패했을경우
            "User account registration failed":{
                statusCode: "401",
                errorCode: "7",
                errorMessage: "User account registration failed",
            },
            // 로그인 요청을 받았지만 해당 토큰을 가진 유저가 회원가입된 유저가 아닐경우
            "Not registered user":{
                statusCode: "404",
                errorCode: "8",
                errorMessage: "Not registered user",
            },
            // 특정 유저정보를 찾지 못했을 경우
            "User information not found":{
                statusCode: "404",
                errorCode: "9",
                errorMessage: "User information not found",
            }
        };
    }
    async nomalResponse(statusCode = 200, header = {}, body = {}) {
        const response = {
            statusCode: statusCode,
            body: JSON.stringify(body, null, 2),
        };
        return response;
    }

    async errorResponse(
        statusCode = 401,
        header = {},
        errorCode = "",
        errorMsg = ""
    ) {
        //응답 데이터를 작성합니다
        const response = {
            statusCode: statusCode,
            body: JSON.stringify(
                { errorCode: errorCode, msg: errorMsg },
                null,
                2
            ),
        };

        return response;
    }

    async errorResponseUseErrorTable(error) {
        let response;

        // ERROR_TABLE내 데이터 존재 유무 체크
        if (this.ERROR_TABLE[error.message]) {
            // 에러 객체 지정
            let errorInfo = this.ERROR_TABLE[error.message];

            // 지정된 에러 객체로 응답 작성
            response = {
                statusCode: errorInfo.statusCode,
                body: JSON.stringify(
                    {
                        errorCode: errorInfo.errorCode,
                        msg: errorInfo.errorMessage,
                    },
                    null,
                    2
                ),
            };
        } else {
            // ERROR_TABLE내 참조할 데이터가 없을경우 default Error로 응답

            // 에러 객체 지정
            let errorInfo = this.ERROR_TABLE["default Error"];

            // 저장된 에러 객체로 응답 작성
            response = {
                statusCode: errorInfo.statusCode,
                body: JSON.stringify(
                    {
                        errorCode: errorInfo.errorCode,
                        msg: errorInfo.errorMessage,
                    },
                    null,
                    2
                ),
            };
        }

        return response;
    }
}

module.exports = new Response();
