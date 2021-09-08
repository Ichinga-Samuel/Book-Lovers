var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const db = require('./config/db')
dotenv.config({path: './config/gae.env'})
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
const { Mongoose } = require('mongoose');

db()
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'? err: {}
    res.status(err.status || 500)
    res.render('error')
})
mongoose.connection.once('open', ()=>{
    app.emit('ready')
})
app.on('ready', ()=>{
    app.listen(process.env.PORT, () => console.log(`Server running in ${process.env.NODE_ENV}  mode on ${process.env.PORT}`));
})

module.exports = app;
