const express = require('express');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var dbInfo = require('./lib/dbInfo');
var auth = require('./lib/authentication');
var etc = require('./lib/etc');
var book = require('./lib/book');
var auth = require('./lib/authentication');
var search = require('./lib/search');
var session = require('express-session');
const board = require('./lib/board');
var MySqlStore = require('express-mysql-session')(session);
var sessionStore = new MySqlStore(dbInfo);
app.use(session({
    secret : 'asadlfkj!@#$%^dfgasdg',
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}));

app.use(express.static('public'));

// book ----------------------------------------------------------------
app.get('/', function(request, response) {
    response.redirect('/home/1');
})
app.get('/home/:pNum', function(request, response) {
    book.home(request,response);
});
app.get('/books/:pNum', function(request, response) {
    book.books(request,response);
});
app.get('/book_detail/:bId', function(request, response) {
    book.detail(request,response);
});
app.get('/book/create', function(request, response) {
    book.bookCreate(request, response);
});
app.post('/book/create_process', function(request, response) {
    book.bookCreate_process(request, response);
});
app.get('/book/list', function(request, response) {
    book.bookList(request, response);
});
app.get('/book/update/:bookId', function(request, response) {
    book.bookUpdate(request, response);
})
app.post('/book/update_process/:bookId', function(request, response) {
    book.bookUpdate_process(request, response);
});
app.get('/book/delete_process/:bookId', function(request, response) {
    book.bookDelete_process(request, response);
});
app.get('/best', function(request, response) {
    book.best(request, response);
});
app.get('/month', function(request, response) {
    book.month(request, response);
});
app.get('/ebook/:pNum', function(request, response) {
    book.eBook(request, response);
});
app.post('/book/cart', function(request, response) {
    book.cart(request, response);
});
app.get('/book/cart', function(request, response) {
    book.getCart(request, response);
});
app.post('/book/purchase', function(request, response) {
    book.purchase(request, response);
});
app.post('/book/cart-to-purchase', function(request, response) {
    book.cartToPurchase(request, response);
});
app.post('/book/cart-to-purchase-all', function(request, response) {
    book.cartToPurchaseAll(request, response);
});
app.get('/book/purchase', function(request, response) {
    book.getPurchase(request, response);
});
app.post('/book/purchase-cancel', function(request, response) {
    book.purchaseCancel(request, response);
});
app.post('/book/purchase-delete', function(request, response) {
    book.purchaseDelete(request, response);
});
// search ----------------------------------------------------------------
app.get('/book/search', function(request, response) {
    search.getBookSearch(request, response);
});
app.post('/book/search', function(request, response) {
    search.postBookSearch(request, response);
});
app.get('/namecard/search', function(request, response) {
    search.getNamecardSearch(request, response);
});
app.post('/namecard/search', function(request, response) {
    search.postNamecardSearch(request, response);
});
app.get('/calendar/search', function(request, response) {
    search.getCalendarSearch(request, response);
});
app.post('/calendar/search', function(request, response) {
    search.postCalendarSearch(request, response);
});

// calendar ----------------------------------------------------------------
app.get('/calendar', function(request, response) {
    etc.calendarHome(request, response);
});
app.get('/calendar/create', function(request, response) {
    etc.calendarCreate(request, response);
});
app.post('/calendar/create_process', function(request, response) {
    etc.calendarCreate_process(request, response);
});
app.get('/calendar/list', function(request, response) {
    etc.calendarList(request, response);
});
app.get('/calendar/update/:planId', function(request, response) {
    etc.calendarUpdate(request, response);
})
app.post('/calendar/update_process/:planId', function(request, response) {
    etc.calendarUpdate_process(request, response);
});
app.get('/calendar/delete_process/:planId', function(request, response) {
    etc.calendarDelete_process(request, response);
});
// namecard -------------------------------------------------------------------
app.get('/namecard', function(request, response) {
    etc.namecardHome(request, response);
});
app.get('/namecard/create', function(request, response) {
    etc.namecardCreate(request, response);
});
app.post('/namecard/create_process', function(request, response) {
    etc.namecardCreate_process(request, response);
});
app.get('/namecard/list', function(request, response) {
    etc.namecardList(request, response);
});
app.get('/namecard/update/:personId', function(request, response) {
    etc.namecardUpdate(request, response);
})
app.post('/namecard/update_process/:personId', function(request, response) {
    etc.namecardUpdate_process(request, response);
});
app.get('/namecard/delete_process/:personId', function(request, response) {
    etc.namecardDelete_process(request, response);
});
// user -------------------------------------------------------------------
app.get('/user', function(request, response) {
    etc.userHome(request, response);
});
app.get('/user/create', function(request, response) {
    etc.userCreate(request, response);
});
app.post('/user/create_process', function(request, response) {
    etc.userCreate_process(request, response);
});
app.get('/user/list', function(request, response) {
    etc.userList(request, response);
});
app.get('/user/update/:loginId', function(request, response) {
    etc.userUpdate(request, response);
})
app.post('/user/update_process/:loginId', function(request, response) {
    etc.userUpdate_process(request, response);
});
app.get('/user/delete_process/:loginId', function(request, response) {
    etc.userDelete_process(request, response);
});
// login -------------------------------------------------------------------
app.get('/login', function(request, response) {
    auth.login(request, response);
});
app.post('/login_process', function(request, response) {
    auth.login_process(request, response);
});
app.get('/logout', function(request, response) {
    auth.logout(request, response);
});
app.get('/register', function(request, response) {
    auth.register(request, response);
});
app.post('/register_process', function(request, response) {
    auth.register_process(request, response);
});
app.get('/changepw/:loginId', function(request, response) {
    auth.changepw(request, response);
});
app.post('/changepw_process/:loginId', function(request, response) {
    auth.changepw_process(request, response);
});

// board -------------------------------------------------------------
app.get('/board/list/:pNum', function(request, response) {
    board.list(request, response);
});
app.get('/board/view/:bNum/:pNum', function(request, response) {
    board.view(request, response);
});
app.get('/board/create', function(request, response) {
    board.create(request, response);
});
app.post('/board/create_process', function(request, response) {
    board.create_process(request, response);
});
app.get('/board/update/:bNum/:pNum', function(request, response) {
    board.update(request, response);
});
app.post('/board/update_process', function(request, response) {
    board.update_process(request, response);
});
app.get('/board/delete/:bNum/:pNum', function(request, response) {
    board.delete(request, response);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});