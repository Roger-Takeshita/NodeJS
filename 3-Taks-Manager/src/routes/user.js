const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { authJWT } = require('../middlewares/auth');
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 1000000 //! 1MB
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(doc|docx|pdf|jpg|jpeg|png)$/)) {
            return callback(new Error('Allowed extensions: .doc, .docx, .pdf, .jpg, .jpeg, .png'));
        }
        callback(undefined, true);
        // callback(new Error('File must be a .PDF'))
        // callback(undefined, true)   // file accepted, return a msg to the user
        // callback(undefined, false)  // file rejected, silence mode (not good)
    }
});

const sendError = (error, req, res, next) => {
    res.status(400).send({ error: error.message });
};

router.post('/new', userCtrl.newUser);
router.post('/login', userCtrl.loginUser);

router.get('', authJWT, userCtrl.getUsers);
router.get('/me', authJWT, userCtrl.getUserProfile);
router.get('/:id', authJWT, userCtrl.getUser);
router.put('/:id', authJWT, userCtrl.updateUser);
router.delete('/me', authJWT, userCtrl.deleteUser);
router.get('/me/avatar', authJWT, userCtrl.getUserAvatar);
router.get('/:id/avatar', userCtrl.getUserAvatar);
router.post('/me/avatar', authJWT, upload.single('avatar'), userCtrl.uploadUserAvatar, sendError);
router.delete('/me/avatar', authJWT, userCtrl.deleteUserAvatar);
router.delete('/id/avatar', authJWT, userCtrl.deleteUserAvatar);

module.exports = router;
