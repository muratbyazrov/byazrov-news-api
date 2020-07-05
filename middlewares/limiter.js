// Для защиты от DDoS.
const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
