'use strict';

const env               = process.env.NODE_ENV || 'development',
      UPLOAD_PATH       = require(`${__dirname}/../../global.config.json`)[env].UPLOAD_PATH,
      multer            = require('multer'),
      path              = require('path'),
      uuid              = require("uuid");

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${UPLOAD_PATH}/`)
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
    fileFilter: imageFilter
})

module.exports = storage;