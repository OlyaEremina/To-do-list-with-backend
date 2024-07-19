const router = require('express').Router();

const todosApiRouter = require('./api/todos.routes');

router.use('/todos', todosApiRouter);




module.exports = router;
