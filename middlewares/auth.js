// этот мидлвер для авторизации запросов через куки

// модуль для создания токенов
const jwt = require('jsonwebtoken');

// подключим класс с ошибкой для централизованного упраления ошибками
const Unauthorized = require('../errors/unauthorized');

// Проверка куки
module.exports = (req, res, next) => {
  // извлечем токен из куки
  const jwtCookies = req.cookies.jwt;
  // убеждаемся что куки пришел не пустым
  if (!jwtCookies) {
    throw new Unauthorized('Необходима авторизация');
  }
  // Если куки не пустой, нужно проверить, что в куки верный токен
  let payload; // Вынесли переменную полезного груза за try/catch
  try {
    const { JWT_SECRET = 'secret-key' } = process.env;
    // Метод jwt.verify вернёт пейлоуд токена, если тот прошёл проверку, иначе ошибка в catch
    payload = jwt.verify(jwtCookies, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Ошибка авторизации'));
  }
  // Если с токеном все окей, записываем пейлоуд в req.user
  req.user = payload;
  // и вызываем следующий обработчик
  next();
};
// Этим мидлвером защищаем авторизацией все необходимые руты
