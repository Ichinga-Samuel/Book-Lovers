var express = require('express');
var router = express.Router();
const book = require('../models/books');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try{
    // find the most liked books
  let books = await book.find().sort('-likes')
  res.render('index', {books: books});
  }
  catch(e){
    console.log('feeeee')
    res.status(502)
    res.redirect('/')
  }
});

module.exports = router;
