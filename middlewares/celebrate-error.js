// подключим предварительную валидацию
const { celebrate, Joi } = require('celebrate');

// подключили валидатор. Перед этим надо установить
const { default: validator } = require('validator');

// валидация id. документация https://www.npmjs.com/package/joi-objectid
Joi.objectId = require('joi-objectid')(Joi);

// класс ошибки
const BadReq = require('../errors/bad-req');

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.empty': 'Поле keyword должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'string.empty': 'Поле title должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'string.empty': 'Поле text должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'string.empty': 'Поле date должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'string.empty': 'Поле date должно быть заполнено',
      }),
    // создали валидатор на основе библиотки validator
    link: Joi.required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadReq('В поле link вставьте ссылку');
      } else { return value; }
    }),
    image: Joi.required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadReq('В поле image вставьте ссылку');
      } else { return value; }
    }),
  }),
});

const atricleIdValidate = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId()
      .message('Неправильное id статьи'),
  }),
});

const createUserValidate = celebrate({
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
});

const userLoginValidate = celebrate({
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
});

module.exports = {
  validateArticleBody,
  atricleIdValidate,
  createUserValidate,
  userLoginValidate,
};
