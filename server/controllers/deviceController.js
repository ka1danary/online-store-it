const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
class deviceController {

    async create(req,res, next) { // создание девайса
        try {

            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg" // v4 эта функция генерует id
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // указать путь для перемещения сстатичных файлов в папку static

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info) // тк приходят данные в json формате, мы должны парсить их
                // а на бэке обратно перегонять в js объекты
                info.forEach(i =>
                    DeviceInfo.create({
                        title : i.title,
                        description : i.description,
                        deviceId : device.id
                    })
                )
            }

            return res.json(device)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // реализация фильтрации
    async getAll(req,res) { // получение всех девайсов
        let {brandId, typeId} = req.query // принимаем эти парамметры Из query (строки запроса)
        // добавим два параметра - текущая страница и лимит
        let page = page || 1
        let limit = limit || 9 // бужем отправлять по 9 устройств на странице
        let offset = page * limit - limit

        let devices;

        // если хотя бы 1 из параметров указан, будем производить фильтрацию
        if (!brandId && !typeId) { // return все девайсы
            // запрос с к бд
            devices = await Device.findAll({limit, offset}) // добавили опции

        }
        if (brandId && !typeId) { // фильтрация только по бренду
            // запрос с к бд
            devices = await Device.findAll({where : {brandId}, limit, offset}) // с базы вернем только brandID
        }
        if (!brandId && typeId) { // фильтрация только по типу
            devices = await Device.findAll({where : {typeId}, limit, offset}) // с базы вернем только typeID
        }
        if (brandId && typeId) { // фильтрация  по типу и бренду
            devices = await Device.findAll({where : {typeId, brandId}, limit, offset}) // с базы вернем только typeID и brandID
        }

        return res.json(devices) // на выходе возвращаем массив этих девайсов

    }

    async getOne(req,res) { // получение девайса по поределенному  id
        const{id} = req.params // получаем id из параметров
        const device  = await Device.findOne( // помимо устройства нужно получить массив характеристик, тк этот запрос будет отрабатывать тогда, когда мы откроем страницу детального просмотра
            {
                where : {id},
                include : [{model : DeviceInfo, as : 'info'}]
            },
        )
        return res.json(device)
    }
}
module.exports = new deviceController()