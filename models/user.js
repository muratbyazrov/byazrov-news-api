// Подключим мангус, чтобы испольовать его метод Shema
const mongoose = require('mongoose');

// модуль для хеширования пароля.
const bcrypt = require('bcrypt');

// чтобы валидировать email
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    // чтобы бд не возвращала это поле
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

// создадим статический метод. Он должен проверять, есть ли пользователь с указанным email
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // данный метод ищет пользователя по email
  return this.findOne({ email })
  // нам нужен хеш пароля
    .select('+password')
    .then((user) => {
    // если пользователя нет - отправляем ошибку перескочив к блоку catch
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // Но если пользователь с таким email есть, надо проверить пароль
      return bcrypt.compare(password, user.password)
        .then((matched) => {
        // Если пароль неверный - ошибка
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // а если правльный возвращаем пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
