const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { authJWT } = require('../middlewares/auth');

router.post('/new', userCtrl.newUser);
router.post('/login', userCtrl.loginUser);

router.get('', authJWT, userCtrl.getUsers);
router.get('/me', authJWT, userCtrl.getUserProfile);
router.get('/:id', authJWT, userCtrl.getUser);
router.put('/:id', authJWT, userCtrl.updateUser);
router.delete('/me', authJWT, userCtrl.deleteUser);

module.exports = router;
