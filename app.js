// Подключили библиотеку экспресс
const express = require('express');

// mongoos помогает подружить JS с документами в MongoDB
const mongoose = require('mongoose');

// чтобы читать данные их .env
require('dotenv').config();

// Этот модуль объединяет приходящие пакеты из запроса. Они доступны так: const { body } = req;
const bodyParser = require('body-parser');

// модуль, чтобы удобно извлекать токен из куков
const cookieParser = require('cookie-parser');

// модуль для безопасности
const helmet = require('helmet');

// мидлвер из библиотеки celebrate для предвартельной ошибки. См код рута index
const { errors } = require('celebrate');

// подключили корс
const cors = require('cors');

// Для защиты от DDoS.
const { limiter } = require('./middlewares/limiter');

// Подключим руты
const { userRout } = require('./routes/userRout');
const { articleRout } = require('./routes/articleRout');
const { signup, signin } = require('./routes/index');

// подключили логгеры ошибок и запросов
const { requestLogger, errorLogger } = require('./middlewares/logger');
// центральный обработчик ошибок
const { errorCenter } = require('./middlewares/error-center');

// Так мы создали приложение на экспресс
const app = express();

// настройки корс
const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
};
// активируем настройки корс
app.use(cors(corsOptions));

// Достали из перем. окружения порт
const { PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/byazrov-news' } = process.env;
// модуль для безопасности
app.use(helmet());
// Для защиты от DDoS.
app.use(limiter);

// Собрали приходящие пакеты в json
app.use(bodyParser.json());

// разрешаем запросы с фронтенда
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);

  next();
}); */

// Нужно извлечь куки из запроса перед основными запросами
app.use(cookieParser());

app.use(requestLogger); // подключаем логгер запросов

// Подключили приложениея рутам, а рут обращается к контроллеру
app.use('/users', userRout);
app.use('/articles', articleRout);
app.use('/signup', signup);
app.use('/signin', signin);

// Для всех неправильных запросов к апи
app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Упс, Запрашиваемый ресурс не найден' });
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// Централизовання обработка ошибок
app.use(errorCenter);

// подключили монго. Тут меняется только название БД - byazrov-news
mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  // eslint-disable-next-line no-console
  .then(() => { console.log('БД подключена!'); })
  // eslint-disable-next-line no-console
  .catch(() => { console.log('БД не подключена(('); });

// Наше приложение будеn слушать запросы, которые приходят на PORT
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
