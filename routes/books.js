var express = require('express');
var router = express.Router();
const book = require('../models/books');
const uploader = require('./utils/uploader');

/* GET books listing. */
router.get('/', async (req, res) => {
  let books = await book.find().sort('-likes');
  res.render('books', {books});
});

router.post('/add', uploader.single('cover'), async (req, res) => {
  try{
    let body = {...req.body, imageUrl: req.file.path}
    let b = await book.create(body)
    res.status(201);
    res.redirect('/');
  }
  catch(e){
    res.status(502).send('An Error Occured')
  }
  
})

module.exports = router;
