const Model = require("../models/index");

class Mysql {
    // 카카오 어카운트 로그인
    async kakaoUserSignIn(userId) {
        try {
            //모델
            const result = await Model.Accounts.findOne({
                where: {
                    userid: userId,
                    loginType: "kakao",
                },
            });

            // 데이터가 있을경우 true를 반환
            if (result) {
                return true;
            } else {
                throw new Error("Not registered user");
            }
        } catch (error) {
            throw new Error("Not registered user");
        }
    }
    // 이미 등록된 카카오 어카운트인지 확인
    async alreadyRegisteredKakaoUser(userId) {
        try {
            //모델
            const result = await Model.Accounts.findOne({
                where: {
                    userid: userId,
                    loginType: "kakao",
                },
            });

            // 어카운트가 존재하지 않을경우 true를 반환
            // 존재할경우 에러 발생
            // console.log(result);
            if (!result) {
                return true;
            } else {
                throw new Error("already a registered user");
            }
        } catch (error) {
            throw new Error("already a registered user");
        }
    }

    // 카카오 유저 등록
    /*
    메서드 인자 객체 데이터 내용
    {
            blogLink: userData.blogLink,
            jobTag: userData.jobTag,
            userId: kakaoUserInfoData.id,
            nickname: kakaoUserInfoData.kakao_account.profile.nickname,
            profileImageUrl: kakaoUserInfoData.kakao_account.profile.profile_image_url,
    }
     */
    async registerKakaoUserAccount(userData) {
        console.log(userData);
        console.log(userData.blogLink);
        try {
            const result = await Model.Accounts.create({
                blogLink: userData.blogLink,
                jobTag: userData.jobTag,
                name: userData.nickname,
                profileImageUrl: userData.profileImageUrl,
                userid: userData.userId,
                loginType: "kakao",
            });
            console.log(result);
            const result1 = await Model.Accounts.findAll();
            console.log(result1);
        } catch (error) {
            throw new Error("User account registration failed");
        }
    }

    async getAccountInfo(userId) {
        try {
            let result;

            //userId 가 존재하지 않을경우 전체 어카운트 조회해서 반환
            if (!userId) {
                result = await Model.Accounts.findAll();
            } else {
                //특정 userId만 조회
                result = await Model.Accounts.findOne({
                    where: { id: userId },
                });
                //결과가 없을경우 에러 생성
                if (!result) {
                    throw new Error("User information not found");
                }
            }

            return result;
        } catch (error) {
            throw new Error("User information not found");
        }
    }
    //카카오 유저아이디와 서비스 유저아이디가 모두 일치하는지 확인
    async checkAccountIDforKakao(userId=0,kakaoId=0){
        try {
            const result = await Model.Accounts.findOne({
                where: { id: userId, userid:kakaoId },
            });
            if (!result) {
                throw new Error("User information not found");
            }
            
        } catch (error) {
            throw new Error('You do not have permission');
        }
    }
    async updateAccountInfo(accountId, blogLink, jobTag, name, profileImageUrl){
        try {
            const result = await Model.Accounts.update({blogLink:blogLink,jobTag:jobTag,name:name,profileImageUrl:profileImageUrl},{where:{id:accountId}});
            console.log(result);
        } catch (error) {
            throw new Error('Account update Failed');
        }
    }
}

module.exports = new Mysql();
