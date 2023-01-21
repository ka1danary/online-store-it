const Router = require('express') // получаем роуты
const router = new Router()
const userController = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

// res.json({message : "userRouter work"}) // отправка сообщения запросом http://localhost:5000/api/user/auth
// авторизован пользователь или нет по gvt токену

module.exports = router