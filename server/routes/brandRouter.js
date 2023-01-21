const Router = require('express') // получаем роуты
const router = new Router()
const brandController = require('../controllers/brandController') // импортировали контроллер

router.post('/', brandController.create) // для создания бренда
router.get('/', brandController.getAll) // для получения брендов

module.exports = router