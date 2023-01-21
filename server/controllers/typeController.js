// здесь будем учиться добавлять в бд объекты
const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class typeController {

    async create(req,res) { // создание типов
        const {name} = req.body // у пост запроса есть тело и мы берем из него имя
        const type = await Type.create({name}) // с помощью функции криэйт создаем этот тип
        return res.json(type) // на клиент возвращаем ввесь массив объектов
    }

    async getAll(req,res) { // получение типов
        const types = await Type.findAll()
        return res.json(types)
    }
}
module.exports = new typeController()

