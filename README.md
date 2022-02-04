# Harmony-server

> 🔧 This project won't be maintained 🔧 

주니어 개발자를 위한 팀 구인 플랫폼

Team recruitment platform for junior developers

Service Endpoint Document is [here](https://github.com/argon1025/Harmony-serverless-backend/issues/1)

Service pages is [HERE](http://harmony.seongrok.net)

# Project Stack
![download](https://user-images.githubusercontent.com/55491354/111910406-95f40900-8aa4-11eb-8fe8-46bb9530bd20.png)
- NodeJS
- Mysql/SequelizeORM
- serverless

# Database
![image](https://user-images.githubusercontent.com/55491354/112328394-a0f3a700-8cf9-11eb-9c0d-14d21c4021d6.png)

# How to Run

## 1. Clone this Project
```
git clone https://github.com/argon1025/Harmony-serverless-backend.git
```

## 2. Move Project folder and Install npm module
```
cd Harmony-serverless-backend
npm install
```
## 3. Install serverless module
```
npm install -g serverless
```

## 4. change serverless.yml settings
```
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  stage: dev1
  region: ap-northeast-2
```
> please check AWS `region`, `stage`

## 5. deploy AWS
```
sls deploy
```

## 6. AWS lambda environment variables settings
|variable name|Variable|
|---|----|
DB_DATABASE|	harmony
DB_DIALECT|	mysql
DB_HOST|	`DB HOST`
DB_PASSWORD|	`DB Password`
DB_USER|	`DB User ID`
IS_AWS|	True
NODE_ENV|	production

# Issues
[Here](https://github.com/argon1025/Harmony-serverless-backend/issues)
