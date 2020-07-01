// подключили схему статьи
const Article = require('../models/article');

// Подключим ошибку (без деструктуризации)
const NotFounError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');

// обработчик, отдающий все карточки
module.exports.getArticles = (req, res, next) => {
  // находим все карточки
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    // то же, что .catch(err => next(err)) - с аргументом next идут в центр ошибок
    .catch(next);
};

// Обработчик удаления создания статей
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

// Обработчик удаления карточек
module.exports.deleteArticle = async (req, res, next) => {
  await Article.findById(req.params.articleId)
    // база данных по умолчания поле owner не отдает
    .select('+owner')
    .orFail(new NotFounError('Такой статьи нет'))
    .then((article) => {
      // JSON в строку - берем поле owner и сравниваем с id пользователя
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        // генерируется ошибка и переходим в след. обработчик ошибки
        throw new Forbidden('Нельзя удалить чужую статью');
      }
      return article.remove()
        .then(res.send({ data: article }));
    })
    .catch(next);
};
