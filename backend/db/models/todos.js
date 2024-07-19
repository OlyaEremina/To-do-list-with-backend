'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    static associate(models) {
    }
  }
  todos.init({
    completed: DataTypes.BOOLEAN,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};