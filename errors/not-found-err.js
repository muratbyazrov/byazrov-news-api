// Создаем класс. Этот класс наследует стандартную ошибку + добавляет статуса кода
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
