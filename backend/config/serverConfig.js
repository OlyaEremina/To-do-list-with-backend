const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const serverConfig = (app) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());
};

module.exports = serverConfig;
