const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('', userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.post('/new', userCtrl.newUser);

module.exports = router;
