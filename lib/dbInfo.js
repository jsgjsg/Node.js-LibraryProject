var dbPrivate = require('./dbPrivate');

var dbInfo = {
    host: 'localhost',
    user: dbPrivate.user, // db 계정 id
    password: dbPrivate.password, // db 계정 password
    database: dbPrivate.database // db 스키마
};

module.exports = dbInfo;