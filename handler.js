"use strict";
const controllers = require("./controllers");
var Model = require("./models");

/**
 * demo Handler
 */
module.exports.hello = controllers.accounts.hello;

/**
 * accounts Handler
 */
module.exports.accounts = {
    kakaoAcount: controllers.accounts.kakaoAcount,
    kakaoAuthorize: controllers.accounts.kakaoAuthorize,
    hello: controllers.accounts.hello,
};