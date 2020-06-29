// для навешивания обработчика на приложение
const articleRout = require('express').Router();

// Подключили обработчик из контроллера
const { getArticles, createArticle, deleteArticle } = require('../controllers/articleController');

// Мидлвер авторизации
const auth = require('../middlewares/auth');

// запрос приходит сюда и включается getUser
articleRout.get('/', auth, getArticles);
articleRout.post('/', auth, createArticle);
articleRout.delete('/:articleId', auth, deleteArticle);

// Экспортируем рут - он потом используется в app.js
module.exports = { articleRout };
