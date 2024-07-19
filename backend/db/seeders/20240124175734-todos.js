'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const todosData = [
      {
        completed: false,
        text: 'Сходить в кино',
      },
      {
        completed: false,
        text: 'Сделать домашнее задание',
      },
      {
        completed: false,
        text: 'Сходить в магазин',
      },
      {
        completed: false,
        text: 'Накормить кота',
      },
    ];
    const todos = todosData.map((todo) => ({
      ...todo,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('todos', todos);
  },

  async down(queryInterface, Sequelize) {},
};
