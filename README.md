# Node.js-LibraryProject

환경구축-------------------------------------------------------------------------------------------------------------------------------------------

npm install --save express		// express 설치

CREATE SCHEMA '스키마 이름' DEFAULT CHARACTER SET utf8; // mysql 스키마 생성

CREATE USER '계정아이디'@localhost identified by '비밀번호'; // mysql 계정 생성

GRANT ALL privileges on '데이터베이스이름'.'테이블이름' to '계정이름'@'호스트' identified by '계정비밀번호' with grant option; // mysql 계정 권한 주기

dbInfo.js 수정 (mysql 계정 id, password, 스키마)
