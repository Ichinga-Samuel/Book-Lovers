const multer = require('multer');
const gcs = require('multer-cloud-storage');

const uploader = multer({
  storage: gcs.storageEngine({
    acl: 'publicRead',
    keyFilename: './config/booklovers-v1-5606eddf4394.json',
    uniformBucketLevelAccess: false,
    destination: function(req, file, cb){
      let dest = `BookLovers`
      cb(null, dest)
    }
  })
}
)

module.exports = uploader
