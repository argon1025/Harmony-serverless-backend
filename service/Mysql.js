/**
 * Mysql
 * 2021.04.04
 * 데이터 베이스에 접근하는 엔드포인트로써 사용되는 클래스 입니다
 * 
 * 카카오 어카운트 로그인
 * kakaoUserSignIn(userId)
 * 로그인 타입이 kakao이고 userId를 속성으로 가지는 어카운트가 있는지 확인하고 bool 타입을 리턴합니다
 * 
 * 등록된 어카운트인지 확인
 * alreadyRegisteredKakaoUser(userId)
 * 로그인 타입이 kakao이고 userId를 속성으로 가지는 어카운트가 있는지 확인하고 bool 타입을 리턴합니다
 * 
 * 카카오 어카운트 등록
 * registerKakaoUserAccount(userData)
 * userData 객체에 있는 내용으로 어카운트를 등록합니다
 * 
 * 유저(리스트)정보 조회
 * getAccountInfo(userId)
 * userId의 정보를 반환하고 해당 데이터가 undifine일경우 전체 유저 데이터를 반환합니다
 * 
 * 프로필 수정 권한 확인
 * checkAccountIDforKakao(userId = 0, kakaoId = 0)
 * 유저 id(userId)와 토큰내부 id(kakaoId)가 일치하는지 확인합니다
 * 
 * 유저 정보 수정
 * updateAccountInfo(accountId,blogLink,jobTag,name,profileImageUrl)
 * 전달 받는 인자로 유저 정보를 수정합니다
 * 
 * -----------------------------------------------------
 * 
 * 직업태그 리스트
 * getJobTagList()
 * 직업 태그 리스트 정보를 반환합닏
 * 
 * -----------------------------------------------------
 * 
 * 프로젝트(리스트) 정보 조회
 * getProjectList(title)
 * 프로젝트 정보를 반환하고 해당 데이터가 undifine일경우 전체 프로젝트 리스트를 반환합니다
 * 
 * 프로젝트 생성
 * createProject(title, content, userID)
 * 입력된 인자를 기준으로 프로젝트를 생성합니다
 * 
 * 프로젝트 수정 권한 확인
 * isItProjectManager(projectID, managerID)
 * projectID, managerID 가 일치하는지 확인합니다
 * 
 * 프로젝트 삭제
 * deleteProject(projectID)
 * projectID 프로젝트를 삭제합니다 소프트 삭제 됩니다
 * 
 * 프로젝트 수정
 * modifyProject(projectID,title,content)
 * 전달받은 인자의 프로젝트 내용을 수정합니다
 */
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
        try {
            const result = await Model.Accounts.create({
                blogLink: userData.blogLink,
                jobTag: userData.jobTag,
                name: userData.nickname,
                profileImageUrl: userData.profileImageUrl,
                userid: userData.userId,
                loginType: "kakao",
            });
        } catch (error) {
            throw new Error("User account registration failed");
        }
    }
    // 유저정보 조회
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
    // 유저정보 조회
    async getAccountInfoUseKakaoID(kakaoID) {
        try {
            let result;

            result = await Model.Accounts.findOne({
                where: { userid: kakaoID,loginType:"kakao"},
            });

            return result;
        } catch (error) {
            throw new Error("User information not found");
        }
    }
    //카카오 유저아이디와 서비스 유저아이디가 모두 일치하는지 확인
    async checkAccountIDforKakao(userId = 0, kakaoId = 0) {
        try {
            const result = await Model.Accounts.findOne({
                where: { id: userId, userid: kakaoId },
            });
            if (!result) {
                throw new Error("User information not found");
            }
        } catch (error) {
            throw new Error("You do not have permission");
        }
    }
    // 유저 정보 수정
    async updateAccountInfo(
        accountId,
        blogLink,
        jobTag,
        name,
        profileImageUrl
    ) {
        try {
            const result = await Model.Accounts.update(
                {
                    blogLink: blogLink,
                    jobTag: jobTag,
                    name: name,
                    profileImageUrl: profileImageUrl,
                },
                { where: { id: accountId } }
            );
        } catch (error) {
            throw new Error("Account update Failed");
        }
    }
    // 직업 태그 리스트 조회
    async getJobTagList() {
        try {
            const result = await Model.Jobs.findAll();
            return result;
        } catch (error) {
            throw new Error("Failed to load jobtags");
        }
    }
    // 프로젝트 리스트 조회
    async getProjectList(title) {
        let result;
        try {
            if (title) {
                //타이틀 옵션이 존재할경우
                result = await Model.Projects.findAll({
                    where: { title: { like: `%${title}%` } },
                });
            } else {
                // 타이틀 옵션이 존재하지 않을경우 전체 리스트 조회
                result = await Model.Projects.findAll();
            }
        } catch (error) {
            throw new Error("Failed to load Projects");
        }
    }
    // 프로젝트 생성
    async createProject(title, content, userID) {
        try {
            const today = new Date();
            const dd = today.getDate();
            const mm = today.getMonth() + 1; //January is 0!
            const yyyy = today.getFullYear();

            const result = await Model.Projects.create({
                managerID: userID,
                title: title,
                content: content,
                date: `${yyyy}/${mm}/${dd}`,
                delete: "false",
                stateID: 1,
            });
        } catch (error) {
            throw new Error("Project Create failed");
        }
    }
    // 프로젝트 수정 권한 확인
    async isItProjectManager(projectID, managerID) {
        try {
            const result = await Model.Projects.findOne({
                where: { id: projectID, managerID: managerID },
            });
            if (!result) {
                throw new Error("User information not found");
            }
        } catch (error) {
            throw new Error("You do not have permission");
        }
    }
    // 프로젝트 삭제 - 소프트 삭제
    async deleteProject(projectID) {
        try {
            const result = await Model.Projects.update(
                {
                    delete: "true",
                },
                { where: { id: projectID } }
            );
        } catch (error) {
            throw new Error("Project Delete Failed");
        }
    }
    // 프로젝트 수정
    async modifyProject(projectID,title,content) {
        try {
            const result = await Model.Projects.update(
                {
                    title: title,
                    content: content,
                },
                { where: { id: projectID } }
            );
        } catch (error) {
            throw new Error("Project Modify Failed");
        }
    }
}

module.exports = new Mysql();
