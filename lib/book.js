var db = require('./db');
var qs = require('querystring');

function authIsOwner(request, response) {
    if(request.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

function dateOfEightDigit(){
    var today = new Date();
    var nowdate = String(today.getFullYear());
    var month ;
    var day ;
    if (today.getMonth() < 9)
        month = "0" + String(today.getMonth()+1);
    else
        month = String(today.getMonth()+1);
    if (today.getDate() < 10)
        day = "0" + String(today.getDate());
    else
        day = String(today.getDate());

    return nowdate + month + day;
}

module.exports = {
    home: function(request, response) {
        db.query(`SELECT count(*) as total FROM book`,function(error, nums){
            var numPerPage = 3;
            var pageNum = request.params.pNum;
            var offs = (pageNum-1)*numPerPage;
            var totalPages = Math.ceil(nums[0].total / numPerPage);

            db.query(`SELECT * FROM book ORDER BY id desc, id LIMIT ? OFFSET ?`, [numPerPage, offs],function(error, result) {
                if(error) {
                    throw error;
                }
                var tmplogin = authIsOwner(request, response);
                var tmpid = request.session.login_id;
                var context = {
                    doc: './book/book.ejs',
                    cls : request.session.class,
                    loggined: tmplogin,
                    id: tmpid,
                    kind : 'Home',
                    results : result,
                    pageNum : pageNum,
                    totalpages : totalPages
                };
                request.app.render('index',context, function(err, html){
                    response.end(html);
                });
            });
        });
    },
    books: function(request, response) {
        db.query(`SELECT count(*) as total FROM book`,function(error, nums){
            var numPerPage = 3;
            var pageNum = request.params.pNum;
            var offs = (pageNum-1)*numPerPage;
            var totalPages = Math.ceil(nums[0].total / numPerPage);

            db.query(`SELECT * FROM book ORDER BY id desc, id LIMIT ? OFFSET ?`, [numPerPage, offs],function(error, result) {
                if(error) {
                    throw error;
                }
                var tmplogin = authIsOwner(request, response);
                var tmpid = request.session.login_id;
                var context = {
                    doc: './book/book.ejs',
                    cls : request.session.class,
                    loggined: tmplogin,
                    id: tmpid,
                    kind : 'Book',
                    results : result,
                    pageNum : pageNum,
                    totalpages : totalPages
                };
                request.app.render('index',context, function(err, html){
                    response.end(html);
                });
            });
        });
    },
    detail: function(request, response) {
        var bId = request.params.bId;
        db.query(`SELECT * FROM book WHERE id = ${bId}`, function(error, result) {
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './book/bookdetail.ejs',
                loggined: tmplogin,
                id: tmpid,
                results: result,
                cls: request.session.class,
                bId: bId
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        })
    },
    bookCreate: function(request, response) {
        var titleofcreate = 'Create';
        var tmplogin = authIsOwner(request, response);
        var tmpid = request.session.login_id;
        var context = {
            doc: `./book/bookCreate.ejs`,
            name: '',
            publisher: '',
            author: '',
            stock: '',
            pubdate: '',
            price: '',
            ISBN: '',
            ebook: '',
            nation: '',
            kindOfDoc: 'C',
            loggined: tmplogin,
            id: tmpid,
            cls : request.session.class
        };
        request.app.render('index', context, function(error, html) {
            response.end(html);
        });
    },
    bookCreate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var bookR = qs.parse(body);
            db.query(`INSERT INTO book (name, publisher, author, stock, pubdate, ISBN, ebook, nation) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                        [bookR.name, bookR.publisher, bookR.author, bookR.stock, bookR.pubdate, bookR.ISBN, bookR.ebook, bookR.nation], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/books/1`});
                response.end();
            });
        });
    },
    bookList: function(request, response) {
        db.query(`SELECT * FROM book`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: `./book/bookList.ejs`,
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
    bookUpdate: function(request, response) {
        var titleofcreate = 'Update';
        var bookId = request.params.bookId;
        db.query(`SELECT * FROM book where id = '${bookId}'`, function(error, result) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './book/bookCreate.ejs',
                name: result[0].name,
                publisher: result[0].publisher,
                author: result[0].author,
                stock: result[0].stock,
                pubdate: result[0].pubdate,
                price: result[0].price,
                ISBN: result[0].ISBN,
                ebook: result[0].ebook,
                nation: result[0].nation,
                bId: bookId,
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
    bookUpdate_process: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            bookId = request.params.bookId;
            console.log(bookId);
            db.query('UPDATE book SET name = ?, publisher = ?, author = ?, stock = ?, pubdate = ?,price = ?, ISBN = ?, ebook = ?, nation = ? WHERE id = ?',
                        [post.name, post.publisher, post.author, post.stock, post.pubdate, post.price, post.ISBN, post.ebook, post.nation, bookId], function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/books`});
                response.end();
            });
        })
    },
    bookDelete_process: function(request, response) {
        var bookId = request.params.bookId;
        db.query('DELETE FROM book WHERE id = ?', [bookId], function(error, result) {
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: `/books`});
            response.end();
        });
    },
    best: function(request, response) {
        db.query(`SELECT * FROM book B join (SELECT *
                                                    FROM (
                                                        SELECT bookid, count(bookid) as numOfSeller
                                                        FROM purchase
                                                        group by bookid
                                                        order by count(bookid) desc) A
                                                        LIMIT 3) S on B.id = S.bookid`, function(error, books) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './book/book.ejs',
                loggined: tmplogin,
                id: tmpid,
                kind : 'Best Seller',
                results: books,
                cls : request.session.class,
                pageNum : 0,
                totalpages : 0
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        })
    },
    month: function(request, response) {
        db.query(`SELECT * FROM book B join (SELECT *
                                                    FROM (
                                                        SELECT bookid, count(bookid) as numOfSeller
                                                        FROM purchase
                                                        WHERE left(purchasedate, 6) = ?
                                                        group by bookid
                                                        order by count(bookid) desc) A
                                                    LIMIT 3) S on B.id = S.bookid`, [dateOfEightDigit().substring(0, 6)], function(error, books) {
            if(error) {
                throw error;
            }
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './book/book.ejs',
                loggined: tmplogin,
                id: tmpid,
                kind : 'Monthly Book',
                results: books,
                cls : request.session.class,
                pageNum : 0,
                totalpages : 0
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        })
    },
    eBook: function(request, response) {
        db.query(`SELECT count(*) as total FROM book WHERE ebook = 'Y'`, function(error, nums){
            var numPerPage = 3;
            var pageNum = request.params.pNum;
            var offs = (pageNum-1)*numPerPage;
            var totalPages = Math.ceil(nums[0].total / numPerPage);
            db.query(`SELECT * FROM book WHERE ebook = 'Y' ORDER BY id desc, id LIMIT ? OFFSET ?`, [numPerPage, offs], function(error, books) {
                if(error) {
                    throw error;
                }
                var tmplogin = authIsOwner(request, response);
                var tmpid = request.session.login_id;
                var context = {
                    doc: './book/book.ejs',
                    loggined: tmplogin,
                    id: tmpid,
                    kind : 'e-Book',
                    results: books,
                    cls : request.session.class,
                    pageNum : pageNum,
                    totalpages : totalPages
                };
                request.app.render('index', context, function(err, html) {
                    response.end(html);
                });
            });
        });
    },
    cart: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            console.log(post);
            db.query(`INSERT INTO cart (custid, bookid, cartdate, qty) VALUES(?, ?, ?, ?)`,
                    [request.session.login_id, post.bId, dateOfEightDigit(), post.qty], function(error, insert) {
                response.redirect("/book/cart");
            });
        });
    },
    getCart: function(request, response) {
        db.query(`SELECT * FROM cart WHERE custid = ?`, [request.session.login_id], function(error2, results) {
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './cart.ejs',
                loggined: tmplogin,
                id: tmpid,
                cls: request.session.class,
                results: results
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        });
    },
    purchase: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`INSERT INTO purchase (custid, bookid, purchasedate, qty) VALUES(?, ?, ?, ?)`,
                    [request.session.login_id, post.bId, dateOfEightDigit(), post.qty], function(error, insert) {
                response.redirect("/book/purchase");
            });
        });
    },
    cartToPurchase: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`SELECT * FROM cart WHERE cartid = ?`, [post.cartid], function(error2, select) {
                db.query(`INSERT INTO purchase (custid, bookid, purchasedate, qty) VALUES(?, ?, ?, ?)`,
                    [request.session.login_id, select[0].bookid, dateOfEightDigit(), select[0].qty], function(error, insert) {
                    if(error) {
                        throw error;
                    }
                    db.query(`DELETE FROM cart WHERE cartid = ?`, [post.cartid], function(error2, del) {
                    });
                    response.redirect("/book/purchase");
                });
            })
        });
    },
    cartToPurchaseAll: function(request, response) {
        db.query(`SELECT * FROM cart WHERE custid = ?`, [request.session.login_id], function(error, select) {
            for (var i = 0; i < select.length; i++) {
                db.query(`INSERT INTO purchase (custid, bookid, purchasedate, qty) VALUES(?, ?, ?, ?)`,
                [request.session.login_id, select[i].bookid, dateOfEightDigit(), select[i].qty], function(error2, insert) {
                if(error) {
                    throw error;
                }
                });
            }
            db.query(`DELETE FROM cart WHERE custid = ?`, [request.session.login_id], function(error3, del) {
                response.redirect("/book/purchase");
            });
        });
    },
    getPurchase: function(request, response) {
        db.query(`SELECT * FROM purchase WHERE custid = ?`, [request.session.login_id], function(error2, results) {
            var tmplogin = authIsOwner(request, response);
            var tmpid = request.session.login_id;
            var context = {
                doc: './purchase.ejs',
                loggined: tmplogin,
                id: tmpid,
                cls: request.session.class,
                results: results
            };
            request.app.render('index', context, function(err, html) {
                response.end(html);
            });
        })
    },
    purchaseCancel: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var cancel;
            if(post.cancel === 'Y') {
                cancel = 'N';
            } else {
                cancel = 'Y';
            }
            db.query(`UPDATE purchase SET cancel = ? WHERE purchaseid = ?`, [cancel, post.purchaseid], function(error, update) {
                if(error) {
                    throw error;
                }
                response.redirect("/book/purchase");
            });
        });
    },
    purchaseDelete: function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`DELETE FROM purchase WHERE purchaseid = ?`, [post.purchaseid], function(error, del) {
                if(error) {
                    throw error;
                }
                response.redirect("/book/purchase");
            });
        });
    }
}