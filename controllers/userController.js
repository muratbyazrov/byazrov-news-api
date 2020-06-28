// подключили схему пользователя
const User = require('../models/user');

// обработчик, отдающий данные пользователя
module.exports.getUser = (req, res, next) => {
  // находим пользователя
  User.findOne({})
    .then((user) => res.send({ data: user }))
    // то же, что .catch(err => next(err)) - с аргументом next идут в центр ошибок
    .catch(next);
};
