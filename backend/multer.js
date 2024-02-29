const multer = require("multer");
const path = require("path");

const storage = multer.discStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(req, file, cb));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));

    },



});

const upload = multer({ storage: storage });

module.exports = upload;