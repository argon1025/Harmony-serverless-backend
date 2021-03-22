const Joi = require("joi");

class DataVerification {
    constructor() {
        this.URL_PATTERN = new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9|:|.|_|/]+$`);
        this.JOBTAG_PATTERN = new RegExp(`^[0-9]+$`);

        //URL 데이터
        this.URL_SCHEMA = Joi.object({
            url: Joi.string().pattern(this.URL_PATTERN).min(0).max(99),
        });

        this.JOBTAG_SCHEMA = Joi.object({
            jobtag: Joi.string().pattern(this.JOBTAG_PATTERN).min(0).max(99),
        });
    }

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

    async checkJobtag(value) {
        const result = await this.JOBTAG_SCHEMA.validate({ jobtag: value });

        if (!result.error) {
            return result;
        } else {
            throw new Error("Value verification failed");
        }
    }
}

module.exports = new DataVerification();
