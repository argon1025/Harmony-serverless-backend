/**
 * DataVerification
 * 2021.03.26
 * 
 * Joi 라이브러리 사용
 * https://joi.dev/api/?v=17.4.0
 */
const Joi = require("joi");

class DataVerification {
    constructor() {
        this.MAX_SAFE_INT = Number.MAX_SAFE_INTEGER;
        this.URL_PATTERN = new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9|:|.|_|/]+$`);
        this.JOBTAG_PATTERN = new RegExp(`^[0-9]+$`);

        // 스키마 설정

        // URL 데이터
        this.URL_SCHEMA = Joi.object({
            url: Joi.string().pattern(this.URL_PATTERN).min(0).max(99),
        });
        // JobTag 데이터
        this.JOBTAG_SCHEMA = Joi.object({
            jobtag: Joi.string().pattern(this.JOBTAG_PATTERN).min(0).max(99),
        });
        // 단순 숫자 데이터
        this.NUMBER_SCHEMA = Joi.object({
            number: Joi.number().min(0).max(this.MAX_SAFE_INT),
        });
    }

    // URL 데이터
    async checkURL(value) {
        const result = await this.URL_SCHEMA.validate({ url: value });

        if (!result.error) {
            console.log("noerror val");
            return result;
        } else {
            console.log("error val");
            throw new Error("Value verification failed");
        }
    }

    // JobTag 데이터
    async checkJobtag(value) {
        const result = await this.JOBTAG_SCHEMA.validate({ jobtag: value });

        if (!result.error) {
            return result;
        } else {
            throw new Error("Value verification failed");
        }
    }

    // 단순 숫자 데이터
    async checkNumber(value){
        const result = await this.NUMBER_SCHEMA.validate({number:value});

        if (!result.error) {
            return result;
        } else {
            throw new Error("Value verification failed");
        }
    }
}

module.exports = new DataVerification();
