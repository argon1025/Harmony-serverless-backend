//에러일경우, 메시지, 코드
class Response {
    constructor() {
        this.ERROR_TABLE = {
            "default Error": {
                statusCode: "500",
                errorCode: "0",
                errorMessage: "Server logic error your data is not valid",
            },
            "BodyData does not exist": {
                statusCode: "404",
                errorCode: "1",
                errorMessage: "Bodydata does not exist",
            },
            "HeadData does not exist": {
                statusCode: "404",
                errorCode: "2",
                errorMessage: "HeadData does not exist",
            },
            "Value verification failed":{
                statusCode: "401",
                errorCode: "3",
                errorMessage: "Value verification failed",
            },
            "Failed to load user information on Kakao server":{
                statusCode: "400",
                errorCode: "4",
                errorMessage: "Failed to load user information on Kakao server",
            },
            "Token validation failed":{
                statusCode: "400",
                errorCode: "5",
                errorMessage: "Token validation failed",
            },
            "already a registered user":{
                statusCode: "401",
                errorCode: "6",
                errorMessage: "already a registered user",
            },
            "User account registration failed":{
                statusCode: "401",
                errorCode: "7",
                errorMessage: "User account registration failed",
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
