const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) { //если класс ошибки ApiError
        // тогда возвращаем ответ со статус кодом из ошибки
        return res.status(err.status).json({message : err.message})
    }
    // если попала ошибка не из ApiError
    return res.status(500).json({message : "indefinite error"})
}