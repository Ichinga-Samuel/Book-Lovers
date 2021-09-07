const multer = require('multer');
const gcs = require('multer-google-storage');

const uploader = multer({
  storage: gcs.storageEngine({
    acl: 'publicRead',
    uniformBucketLevelAccess: false,
    destination: function(req, file, cb){
      let dest = `BookLovers/${req.body.title}/${file.originalname}`
      cb(null, dest)
    }
  })
}
)

module.exports = uploader