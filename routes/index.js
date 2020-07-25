// для навешивания обработчика на приложение
const signup = require('express').Router();
const signin = require('express').Router();
const signout = require('express').Router();

// Экспортировали обработчики
const { createUser, login, deleteCookie } = require('../controllers/userController');

// предварительная валидация
const { createUserValidate, userLoginValidate } = require('../middlewares/celebrate-error');

// предварительно валидируем данные при регистрации пользователя
signup.post('/', createUserValidate, createUser);

// предвартельно валидируем данные при логировании
signin.post('/', userLoginValidate, login);

// выходим из аккаунта
signout.post('/', deleteCookie);

module.exports = { signup, signin, signout };
