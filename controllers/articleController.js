// подключили схему статьи
const Article = require('../models/article');

// Подключим ошибку (без деструктуризации)
const NotFounError = require('../errors/not-found-err');

// обработчик, отдающий все карточки
module.exports.getArticles = (req, res, next) => {
  // находим все карточки
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    // то же, что .catch(err => next(err)) - с аргументом next идут в центр ошибок
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = async (req, res, next) => {
  await Article.findById(req.params.articleId)
    .orFail(new NotFounError('Такой статьи нет'))
    .then((article) => article.remove()
      .then(res.send({ data: article })))
    .catch(next);
};
