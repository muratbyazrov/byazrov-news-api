// для навешивания обработчика на приложение
const signup = require('express').Router();
const signin = require('express').Router();

// подключим предварительную валидацию
const { celebrate, Joi } = require('celebrate');

// Экспортировали обработчики
const { createUser, login } = require('../controllers/userController');

// предварительно валидируем данные при регистрации пользователя
signup.post('/', celebrate({
  // body должно быть объектом с ключами name, password, email
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.email': 'Неправильный формат email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Поле password должно быть заполнено',
        'string.min': 'Слишком короткий пароль. Минимальне количество символов 8',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле name должно быть заполнено',
        'string.min': 'Минимальне количество символов 2',
        'string.max': 'Максимальное количество символов 30',
      }),
  }),
}), createUser);

// предвартельно валидируем данные при логировании
signin.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.email': 'Неправильный формат email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Поле password должно быть заполнено',
        'string.min': 'Слишком короткий пароль. Минимальне количество символов 8',
      }),
  }),
}), login);

module.exports = { signup, signin };

// Не работает селебрейт - разобарться почему
