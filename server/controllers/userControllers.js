//создаем здесь все функции для чуваков из routers
const ApiError = require('../error/ApiError') // промежуточный регистратор ошибок
const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt') // библиотека для хэширования паролей
const jwt = require('jsonwebtoken')
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email : email, role}, // Первая часть jwt токена
        process.env.SECRET_KEY, // Вторая часть jwt токена
        {expiresIn : '24h'} // опции - время жизни токена
    )
}

class userController{

    async registration(req,res, next) {
        const{email, password, role} = req.body // принимаем эти параметры в запросе
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        // существует ли пользователь с таким email в системе
        const candidate = await User.findOne({where : { email }})

        if (candidate) { // если такой существует
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 10) // хэшируем 10 раз
        const user = await User.create({email, role, password : hashPassword})
        const basket = await Basket.create({userId : user.id})
        const token = generateJwt(user.id, user.email, user.role)
        // после генерации токена возвращаем его на клиент
        return res.json({token})
    }

    async login(req,res,next) {
        const {email,password} = req.body
        // существует ли пользователь с таким email в системе
        const user = await User.findOne({where : {email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        // в бд хешированый пароль, поэтому мы достаем расхеш
        // c помощью синхронной compareSync сравниваем пароли
        let comparePassword = bcrypt.compareSync(password, user.password) // введенный пользователем, второй из бд
        if (!comparePassword) { // если пароли не совпадают
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        // генерируем токен
        const token = generateJwt(user.id, user.email, user.role)
        // на клиент возвращаем сам токен
        return res.json({token})
    }

    async check(req,res, next) { // генерация нового токена и отправка его на клиент
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new userController()

