const Router = require('express') // получаем роуты
const router = new Router()

//импорт всех роутеров
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

// объединили 4 роутера в 1 => нужно сообщить об этом серверу
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router