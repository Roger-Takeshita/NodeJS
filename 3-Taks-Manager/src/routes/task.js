const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/task');

router.get('', taskCtrl.getTasks);
router.get('/:id', taskCtrl.getTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);
router.post('/new', taskCtrl.newTask);

module.exports = router;
