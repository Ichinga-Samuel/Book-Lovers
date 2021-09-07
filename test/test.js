const mocha = require('mocha');
const mongoose = require('mongoose');
const assert = require('chai').assert;
const books = require('../models/books');
const db = require('../config/db');
const dotenv = require('dotenv');
const { after } = require('mocha');

dotenv.config({path: './config/gae.env'})
db()

const dummyData = [
  {
    title: "Things Fall Apart",
    Author: "Chinua Achebe",
    year: 1958,
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1352082529l/37781.jpg",
    likes: 4
  },
  {
    title: "Juju Rock",
    Author: "Cyprian Ekwensi",
    year: 1966,
    likes: 5,
    imageUrl: "https://textbookcentre.com/media/products/2010141000588.jpg"
  }
]


describe('Test Database', function(){
  before(async function(){
    let book = await books.create(dummyData[1])
  })

  describe('save', function(){
    it('Should Save Without Error', async function(){
      let book = await books.create(dummyData[0])
    })
  })

  describe('find', function(){
    it('find book by title', async function(){
      let book = await books.findOne({title: dummyData[1].title})
      assert(book.title === "Juju Rock")
    })
  })

  after(async function(){
    let titles = dummyData.map(t => t.title)
    let dels = await books.deleteMany({title: {$in: titles}})
    mongoose.connection.close(function(){
      console.log('Mongoose disconnected through app termination');
  })
  })
})

