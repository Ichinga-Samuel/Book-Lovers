const mongoose = require('mongoose');
const conn = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to Database Server')
  }
  catch(e){
    console.log(e)
    console.log('Unable to connect to Mongo database server');
  }
}


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
  });
});

module.exports = conn