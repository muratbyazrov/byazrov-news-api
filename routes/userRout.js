// для навешивания обработчика на приложение
const userRout = require('express').Router();

// Подключили обработчик из контроллера
const { getUser } = require('../controllers/userController');

// Мидлвер авторизации
const auth = require('../middlewares/auth');

// запрос приходит сюда и включается getUser
userRout.get('/me', auth, getUser);

// Экспортируем рут - он потом используется в app.js
module.exports = { userRout };
