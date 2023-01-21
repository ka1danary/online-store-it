// здесь декодируем токен и проверяем его на валидность
const jwt = require('jsonwebtoken')
module.exports = function (req,res,next) {
    if (req.method === "OPTIONS") { // то пропускаем
       next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // в первой части вылавливаем токен (тип токена, потом сам токен в параметрах)
        if (!token) { // если токена нет то ошибка
            return res.status(401).json({message : "Пользователь не авторизован"})
        }
        // если токен есть, то нам надо его раскодировать
        const decoded = jwt.verify(token, process.env.SECRET_KEY) // сначала сам токен, потом ключ для декодирования
        req.user = decoded // добавим данные user
        next()

    } catch(e) {
        res.status(401).json({message : "Пользователь не авторизован"})
    }
}

