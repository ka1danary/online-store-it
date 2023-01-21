const Router = require('express') // получаем роуты
const router = new Router()
const userController = require('../controllers/userControllers') // импортировали контроллер
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration) // для регистрации (передаем из контроллера функции)
router.post('/login', userController.login) // для авторизации
router.get('/auth', authMiddleware, userController.check) // второй параметр проверяет пользователя на авторизованность

// res.json({message : "userRouter work"}) // отправка сообщения запросом http://localhost:5000/api/user/auth
// авторизован пользователь или нет по gvt токену

module.exports = router