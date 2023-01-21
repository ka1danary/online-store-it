const Router = require('express') // получаем роуты
const router = new Router()
const deviceController = require('../controllers/deviceController') // импортировали контроллер

router.post('/', deviceController.create) // для создания девайса
router.get('/', deviceController.getAll) // для получения девайса
router.get('/:id',deviceController.getOne) // получение конкретно взятого девайса

module.exports = router