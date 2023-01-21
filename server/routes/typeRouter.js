const Router = require('express') // получаем роуты
const router = new Router()
const typeController = require('../controllers/typeController') // импортировали контроллер
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),typeController.create ) // для создания типа
router.get('/', typeController.getAll) // для получения типа


module.exports = router