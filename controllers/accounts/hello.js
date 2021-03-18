const Create = require("../../service/Response");

module.exports = async (event) => {
    console.log(event);
    const response = await Create.errorResponse(401,null,"1","hello?");
    console.log(response);
    return response;
};
