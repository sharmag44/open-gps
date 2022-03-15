const formidable = require('formidable');
const { uploadToS3 } = require('../providers/s3');
var crypto = require('crypto');

exports.upload = async (req, res) => {
     let form = new formidable.IncomingForm();
     form.parse(req, async (err, fields, files) => {
          if (err) return res.failure(err);

          // @ts-ignore
          if (!files.media || !files.media.path) {
               return res.failure('media file is required');
          }
          try {
               let data = await uploadToS3(
                    files.media,
                    crypto.randomBytes(20).toString('hex')
               );
               if (data) {
                    return res.data({ url: data.media.Location });
               } else {
                    return res.failure('unable to upload document');
               }
          } catch (e) {
               return res.failure(e);
          }
     });
};
