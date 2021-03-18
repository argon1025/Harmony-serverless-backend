class Response {
    async nomalResponse(statusCode = 200, header = {}, body = {}) {
        const response = {
            statusCode: statusCode,
            body: JSON.stringify(body, null, 2),
        };
        return response;
    }

    async errorResponse(statusCode = 401, header = {}, errorCode = "", errorMsg = "") {
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
}

module.exports = new Response();
