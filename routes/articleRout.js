// для навешивания обработчика на приложение
const articleRout = require('express').Router();

// Подключили обработчик из контроллера
const { getArticles, createArticle, deleteArticle } = require('../controllers/articleController');

// запрос приходит сюда и включается getUser
articleRout.get('/', getArticles);
articleRout.post('/', createArticle);
articleRout.delete('/:articleId', deleteArticle);

// Экспортируем рут - он потом используется в app.js
module.exports = { articleRout };
