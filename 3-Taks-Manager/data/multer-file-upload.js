//! Multer file uploader

const multer = require('multer');
const upload = multer({
    dest: 'images' //+ ./images/
});
//! upload.single('keyValueUpload') will be the key/value pair to send the falie
app.post('/upload', upload.single('keyValueUpload'), (req, res) => {
    res.send();
});
