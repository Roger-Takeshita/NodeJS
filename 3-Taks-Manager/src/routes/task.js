const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/task');
const { authJWT } = require('../middlewares/auth');

router.get('', authJWT, taskCtrl.getTasks);
router.get('/:id', authJWT, taskCtrl.getTask);
router.put('/:id', authJWT, taskCtrl.updateTask);
router.delete('/:id', authJWT, taskCtrl.deleteTask);
router.post('/new', authJWT, taskCtrl.newTask);

module.exports = router;
