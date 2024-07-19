// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register');

// использование данных из конфигурации файла .env
require('dotenv').config();

const express = require('express');
const config = require('./config/serverConfig');

// роутеры
const indexRouter = require('./routes/index.routes');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const PORT = process.env.PORT || 3000;

// конфигурация приложения
config(app);

// маршрутизация приложения
app.use('/', indexRouter);

// прослушивание порта приложения
app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
