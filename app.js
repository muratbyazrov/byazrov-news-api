// Подключили библиотеку экспресс
const express = require('express');

// mongoos помогает подружить JS с документами в MongoDB
const mongoose = require('mongoose');

// Этот модуль объединяет приходящие пакеты из запроса. Они доступны так: const { body } = req;
const bodyParser = require('body-parser');

// Подключим руты
const { userRout } = require('./routes/userRout');
const { articleRout } = require('./routes/articleRout');

// Так мы создали приложение на экспресс
const app = express();

// Достали из перем. окружения порт
const { PORT = 3000 } = process.env;

// Собрали приходящие пакеты в json
app.use(bodyParser.json());

// Подключили приложение к запросам
app.use('/users/me', userRout);
app.use('/articles', articleRout);

// Для всех неправильных запросов к апи
app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Упс, Запрашиваемый ресурс не найден' });
});

// Централизовання обработка ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500
      ? 'Упс, На сервере произошла ошибка'
      : message,
  });
});

// подключили монго. Тут меняется только название БД - byazrov-news
mongoose.connect('mongodb://localhost:27017/byazrov-news', {
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
