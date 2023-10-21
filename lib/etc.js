var db = require('./db');
var qs = require('querystring');

function authIsOwner(request, response) {
    if(request.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    main: function(request, response) {
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        if(authIsOwner(request, response) === true) {
            subdoc = 'book.ejs';
        } else {
            subdoc = 'main.ejs';
        }
        var context = {
            doc: subdoc,
            loggined: tmplogin,
            id: tmpid,
            cls : request.session.class
        };
        request.app.render('index', context, function(err, html) {
            response.end(html);
        });
    },
    calendarHome: function(request, response) {
        db.query(`SELECT * FROM calendar`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./calendar/calendar.ejs`,
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls : request.session.class
            };

            request.app.render('index', context, function(err, html) {

                response.end(html);
            });
        });
    },
    calendarCreate: function(request, response) {
        var titleofcreate = 'Create';
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: `./calendar/calendarCreate.ejs`,
            title: '',
            description: '',
            kindOfDoc: 'C',
            loggined: tmplogin,
            id: tmpid,
            cls : request.session.class
        };
        request.app.render('index', context, function(error, html) {
            response.end(html);
        });
    },
    calendarCreate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var cal = qs.parse(body);
            db.query(`INSERT INTO calendar (title, description, created, author_id) VALUES(?, ?, NOW(), 2)`,
                        [cal.title, cal.description], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/calendar`});
                response.end();
            });
        });
    },
    calendarList: function(request, response) {
        var titleofcreate = 'Create';
        db.query(`SELECT * FROM calendar`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./calendar/calendarList.ejs`,
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            })
        });
    },
    calendarUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var planId = request.params.planId;

        db.query(`SELECT * FROM calendar where id = ${planId}`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './calendar/calendarCreate.ejs',
                title: result[0].title,
                description: result[0].description,
                pId: planId,
                kindOfDoc: 'U',
                loggined: tmplogin,
                id: tmpid,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    calendarUpdate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var plan = qs.parse(body);
            planId = request.params.planId;
            db.query('UPDATE calendar SET title = ?, description = ?, author_id = ? WHERE id = ?',
                        [plan.title, plan.description, 2, planId], function(error, result) {
                response.writeHead(302, {Location: `/calendar`});
                response.end();
            });
        });
    },
    calendarDelete_process: function(request, response) {
        var planId = request.params.planId;
        db.query('DELETE FROM calendar WHERE id = ?', [planId], function(error, result) {
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/calendar`});
            response.end();
        });
    },
    namecardHome: function(request, response) {
        db.query(`SELECT * FROM namecard`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./namecard/namecard.ejs`,
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    namecardCreate: function(request, response) {
        var titleofcreate = 'Create';
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: `./namecard/namecardCreate.ejs`,
            name: '',
            phone: '',
            address: '',
            email: '',
            kindOfDoc: 'C',
            loggined: tmplogin,
            id: tmpid,
            cls : request.session.class
        };
        request.app.render('index', context, function(error, html) {
            response.end(html);
        });
    },
    namecardCreate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`INSERT INTO namecard (name, phone, address, email) VALUES(?, ?, ?, ?)`,
                        [post.name, post.phone, post.address, post.email], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/namecard`});
                response.end();
            });
        });
    },
    namecardList: function(request, response) {
        db.query(`SELECT * FROM namecard`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./namecard/namecardList.ejs`,
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    namecardUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var personId = request.params.personId;

        db.query(`SELECT * FROM namecard where id = ${personId}`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './namecard/namecardCreate.ejs',
                name: result[0].name,
                phone: result[0].phone,
                address: result[0].address,
                email: result[0].email,
                pId: personId,
                kindOfDoc: 'U',
                loggined: tmplogin,
                id: tmpid,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    namecardUpdate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            personId = request.params.personId;
            db.query('UPDATE namecard SET name = ?, phone = ?, address = ?, email = ? WHERE id = ?',
                        [post.name, post.phone, post.address, post.email, personId], function(error, result) {
                response.writeHead(302, {Location: `/namecard`});
                response.end();
                console.log(personId);
            });
        })
    },
    namecardDelete_process: function(request, response) {
        var personId = request.params.personId;
        db.query('DELETE FROM namecard WHERE id = ?', [personId], function(error, result) {
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/namecard`});
            response.end();
        });
    },
    userHome: function(request, response) {
        db.query(`SELECT * FROM person`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./user/user.ejs`,
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    userCreate: function(request, response) {
        var titleofcreate = 'Create';
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: `./user/userCreate.ejs`,
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
    userCreate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`INSERT INTO person (loginid, password, name, address, tel, birth, class, grade) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                        [post.loginid, post.password, post.name, post.address, post.tel , post.birth , post.class , post.grade], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/user`});
                response.end();
            });
        });
    },
    userList: function(request, response) {
        db.query(`SELECT * FROM person`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./user/userList.ejs`,
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    userUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var loginId = request.params.loginId;

        db.query(`SELECT * FROM person where loginid = '${loginId}'`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './user/userCreate.ejs',
                loginid: result[0].loginid,
                password: result[0].password,
                name: result[0].name,
                address: result[0].address,
                tel: result[0].tel,
                birth: result[0].birth,
                classA: result[0].class,
                grade: result[0].grade,
                logId: loginId,
                kindOfDoc: 'U',
                loggined: tmplogin,
                id: tmpid,
                cls : request.session.class
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    userUpdate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            loginId = request.params.loginId;
            db.query('UPDATE person SET loginid = ?, password = ?, name = ?, address = ?, tel = ?, birth = ?, class = ?, grade = ? WHERE loginid = ?',
                        [post.loginid, post.password, post.name, post.address, post.tel, post.birth, post.class, post.grade, loginId], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/user`});
                response.end();
            });
        })
    },
    userDelete_process: function(request, response) {
        var loginId = request.params.loginId;
        db.query('DELETE FROM person WHERE loginid = ?', [loginId], function(error, result) {
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/user`});
            response.end();
        });
    }
}