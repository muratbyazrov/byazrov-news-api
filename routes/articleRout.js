// для навешивания обработчика на приложение
const articleRout = require('express').Router();

// подключили обработчик из контроллера
const { getArticles, createArticle, deleteArticle } = require('../controllers/articleController');

// подключили предварительную валидацию
const { validateArticleBody, atricleIdValidate } = require('../middlewares/celebrate-error');

// Мидлвер авторизации
const auth = require('../middlewares/auth');

// запрос приходит сюда и включается getUser

// показать карточки
articleRout.get('/', auth, getArticles);

// создать карточку статьи
articleRout.post('/', validateArticleBody, auth, createArticle);

// удалить карточку статьи
articleRout.delete('/:articleId', atricleIdValidate, auth, deleteArticle);

// Экспортируем рут - он потом используется в app.js
module.exports = { articleRout };
