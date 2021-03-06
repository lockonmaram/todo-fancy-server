var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todosController')

/* GET todos listing. */
router.post('/', todoController.getTodo);
router.post('/add', todoController.addTodo);
router.delete('/delete', todoController.deleteTodo);
router.put('/updateDone', todoController.updateDone)
router.put('/updateNot', todoController.updateNot)

module.exports = router;
