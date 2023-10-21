var db = require('./db');
var qs = require('querystring');
const { resourceLimits } = require('worker_threads');

function authIsOwner(request, response) {
    if(request.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    login: function(request, response) {
        var subdoc;
        if(authIsOwner(request, response) === true) {
            subdoc = 'book.ejs';
        } else {
            subdoc = 'login.ejs';
        }

        var context = { doc : subdoc,
                        loggined : authIsOwner(request, response),
                        id : request.session.login_id,
                        cls : request.session.class
        };
        
        request.app.render('index', context, function(err, html) {
            console.log(context);
            response.end(html);
        })
    },
    login_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        console.log(request.session);
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`SELECT loginid, password, class FROM person WHERE loginid = ? and password = ?`,
                [post.id, post.pw], function(error, result) {
                    if(error) {
                        throw error;
                    }
                    if(result[0] === undefined) {
                        response.end('Who ?');
                    } else {
                        request.session.is_logined = true;
                        request.session.login_id = result[0].loginid;
                        request.session.class = result[0].class;

                        response.redirect('/');
                    }
                })
        })
    },
    logout: function(request, response) {
        request.session.destroy(function(err) {
            response.redirect('/');
        });
    },
    register: function(request, response) {
        var titleofcreate = 'Create';
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: `./register.ejs`,
            loginid: '',
            password: '',
            name: '',
            address: '',
            tel: '',
            birth: '',
            classA: '',
            grade: '',
            kindOfDoc: 'C',
            loggined: tmplogin,
            id: tmpid,
            cls : request.session.class
        };
        request.app.render('index', context, function(error, html) {
            response.end(html);
        });
    },
    register_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`INSERT INTO person (loginid, password, name, address, tel, birth) VALUES(?, ?, ?, ?, ?, ?)`,
                        [post.id, post.pw, post.name, post.address, post.tel , post.birth], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    },
    changepw: function(request, response) {
        var titleofcreate = 'Update';
        var loginId = request.params.loginId;

        db.query(`SELECT * FROM person where loginid = '${loginId}'`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: 'changepw.ejs',
                loginid: result[0].loginid,
                password: result[0].password,
                name: result[0].name,
                address: result[0].address,
                tel: result[0].tel,
                birth: result[0].birth,
                classA: result[0].class,
                grade: result[0].grade,
                logId: loginId,
                loggined: tmplogin,
                id: tmpid,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    changepw_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            loginId = request.params.loginId;
            db.query('UPDATE person SET password = ? WHERE loginid = ?',
                        [post.password, loginId], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        })
    }
}