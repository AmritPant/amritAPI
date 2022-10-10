const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.trunc(Math.random() * 100) + ',' + file.originalname
    );
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
