const express = require('express');

const router = express.Router();

const { todos } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const allTodos = await todos.findAll();
    res.json(allTodos);
    //проверим, что считались с базы
    // console.log(allTodos);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/done', async (req, res) => {
  try {
    const allTodos = await todos.findAll({ where: { completed: true } });
    res.json(allTodos);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/notdone', async (req, res) => {
  try {
    const allTodos = await todos.findAll({ where: { completed: false } });
    res.json(allTodos);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    // console.log(text);
    const todo = await todos.create({
      text,
      completed: false,
    });
    if (todo.id) {
      res.json({ message: 'success', data: todo });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { id, completed } = req.body;
    const todoUpdate = await todos.update({ completed }, { where: { id } });
    console.log(todoUpdate); // в данном случае при изменении БД будет число 1, так как изменило одну сущность
    const upTodo = await todos.findOne({ where: { id } });
    res.json({ message: 'success', data: upTodo });
  } catch ({ message }) {
    res.json(message);
  }
});

router.put('/update', async (req, res) => {
  try {
    const { id, text } = req.body;
    const upTodo = await todos.update({ text }, { where: { id } });
    const todoUp = await todos.findOne({ where: { id } });
    if (upTodo) {
      res.json({ message: 'success', data: todoUp });
    }
  } catch ({ message }) {
    res.json(message);
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    //  console.log(id);
    const todo = await todos.findByPk(+id);
    if (todo) {
      await todos.destroy({
        where: {
          id: todo.id,
        },
      });
      return res.status(200).json({ message: 'success' });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
