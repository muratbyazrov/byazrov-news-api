// для навешивания обработчика на приложение
const articleRout = require('express').Router();

// подключим предварительную валидацию
const { celebrate, Joi } = require('celebrate');

// подключили валидатор. Перед этим надо установить
const { default: validator } = require('validator');

// валидация id. документация https://www.npmjs.com/package/joi-objectid
Joi.objectId = require('joi-objectid')(Joi);

// Подключили обработчик из контроллера
const { getArticles, createArticle, deleteArticle } = require('../controllers/articleController');

// класс ошибки
const BadReq = require('../errors/bad-req');

// Мидлвер авторизации
const auth = require('../middlewares/auth');

// запрос приходит сюда и включается getUser

// показать карточки
articleRout.get('/', auth, getArticles);

// создать карточку статьи
articleRout.post('/', celebrate({
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
    source: Joi.string().required(),
    // создали валидатор на основе библиотки validator
    link: Joi.required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadReq('В поле \'link\' вставьте ссылку');
      } else { return value; }
    }),
    image: Joi.required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadReq('В поле \'image\' вставьте ссылку');
      } else { return value; }
    }),
  }),
}), auth, createArticle);

// удалить карточку статьи
articleRout.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId()
      .message('Неправильное id статьи'),
  }),
}), auth, deleteArticle);

// Экспортируем рут - он потом используется в app.js
module.exports = { articleRout };
