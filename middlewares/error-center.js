// eslint-disable-next-line no-unused-vars
module.exports.errorCenter = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500
      ? 'Упс, На сервере произошла ошибка'
      : message,
  });
};
