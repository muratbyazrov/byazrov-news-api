// для навешивания обработчика на приложение
const userRout = require('express').Router();

// Подключили обработчик из контроллера
const { getUser } = require('../controllers/userController');

// запрос приходит сюда и включается getUser
userRout.get('/', getUser);

// Экспортируем рут - он потом используется в app.js
module.exports = { userRout };
