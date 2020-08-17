// модуль для хеширования пароля
const bcrypt = require('bcrypt');

// модуль для создания токенов
const jwt = require('jsonwebtoken');

// подключили схему пользователя
const User = require('../models/user');

// Подключим класс ошибки
// const NotFoundError = require('../errors/not-found-err');
const BadReq = require('../errors/bad-req');
const Unauthorized = require('../errors/unauthorized');

// обработчик, отдающий данные пользователя
module.exports.getUser = (req, res, next) => {
  // находим пользователя
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    // то же, что .catch(err => next(err)) - с аргументом next идут в центр ошибок
    .catch(next);
};

// обработчик создания нового пользователя
module.exports.createUser = (req, res, next) => {
  // берем данные из тела запроса
  const { email, password, name } = req.body;
  // метод bcrypt создает для входящего пароля хеш с солью 10.
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((user) => res.send({
          email: user.email, name: user.name,
        }))
        // Создается экзмепляр 'плохого запроса'
        .catch((err) => next(new BadReq(err.message)));
    });
};

// Обработчик логгирования
module.exports.login = (req, res, next) => {
  // Получаем данные из тела запроса
  const { email, password } = req.body;
  // достали из переменной окружения секретный ключ. Переменная в файле .env
  const { JWT_SECRET = 'secret-key' } = process.env;
  // используем статический метод (смотри в модели) чтобы провермть введенные логин и пароль
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создаем токен методом sign. Принимает пейлоуд и ключевое слово
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      // запишем токен в куки. Принимает ключ и значение ключа jwt:token
      res.cookie('jwt', token, {
        maxAge: 864000 * 7,
        httpOnly: true,
        // чтобы браузер не отправлял куки, если запрос с другого домена
        // sameSite: true,
      });
      res.send({ message: 'авторизация прошла успешна. Токен записан в куки' });
    })
    // создается экземпляр ошибки авторизации
    .catch((err) => next(new Unauthorized(err.message)));
};

module.exports.deleteCookie = (req, res, next) => {
  res.cookie('jwt', '', {
    maxAge: -1,
    httpOnly: true,
  });
  res.send({ message: 'Выход выполнен' })
    .catch((err) => next(new BadReq(err.message)));
};
