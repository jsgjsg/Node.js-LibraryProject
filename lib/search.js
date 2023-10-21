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
    getBookSearch: function(request, response) {
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: './search.ejs',
            loggined: tmplogin,
            id: tmpid,
            cls: request.session.class,
            kind: 'book',
            listyn: 'N'
        };
        request.app.render('index', context, function(err, html) {
            response.end(html);
        });
    },
    postBookSearch: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`SELECT * FROM book where name like ?`, [`%${post.keyword}%`], function(error, results) {
                if(error) {
                    throw error;
                }
                var tmplogin = authIsOwner(request, response);
                var tmpid = request.session.login_id;
                var context = {
                    doc: './search.ejs',
                    loggined: tmplogin,
                    id: tmpid,
                    cls: request.session.class,
                    kind: 'book',
                    listyn: 'Y',
                    bs: results
                };
                request.app.render('index', context, function(err, html) {
                    response.end(html);
                });
            });
        });
    },
    getNamecardSearch: function(request, response) {
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: './search.ejs',
            loggined: tmplogin,
            id: tmpid,
            cls: request.session.class,
            kind: 'namecard',
            listyn: 'N'
        };
        request.app.render('index', context, function(err, html) {
            response.end(html);
        });
    },
    postNamecardSearch: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`SELECT * FROM namecard where name like ?`, [`%${post.keyword}%`], function(error, results) {
                if(error) {
                    throw error;
                }
                var tmplogin = authIsOwner(request, response);
                var tmpid = request.session.login_id;
                var context = {
                    doc: './search.ejs',
                    loggined: tmplogin,
                    id: tmpid,
                    cls: request.session.class,
                    kind: 'namecard',
                    listyn: 'Y',
                    ns: results
                };
                request.app.render('index', context, function(err, html) {
                    response.end(html);
                });
            });
        });
    },
    getCalendarSearch: function(request, response) {
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: './search.ejs',
            loggined: tmplogin,
            id: tmpid,
            cls: request.session.class,
            kind: 'calendar',
            listyn: 'N'
        };
        request.app.render('index', context, function(err, html) {
            response.end(html);
        });
    },
    postCalendarSearch: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`SELECT * FROM calendar where title like ?`, [`%${post.keyword}%`], function(error, results) {
                if(error) {
                    throw error;
                }
                var tmplogin = authIsOwner(request, response);
                var tmpid = request.session.login_id;
                var context = {
                    doc: './search.ejs',
                    loggined: tmplogin,
                    id: tmpid,
                    cls: request.session.class,
                    kind: 'calendar',
                    listyn: 'Y',
                    cs: results
                };
                request.app.render('index', context, function(err, html) {
                    response.end(html);
                });
            });
        });
    }
};