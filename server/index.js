require('dotenv').config() //для считывания файла .env
const express = require('express')
const sequelize = require('./db') //импорт конфигурации для бд из файла
const models = require('./models/models') // импорт моделей бд
const cors = require('cors') // для отправки запросов с браузера
const router = require('./routes/index') // импорт роутеров
const errorHandler = require('./middleware/ErrorHendlingMiddleware') // эксорт мидла для обработки ошибки
const fileUpLoad = require('express-fileupload') // для получения изображений
const path = require('path') // для передачи пути со статикой
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json()) // для парсинга json формата
app.use(express.static(path.resolve(__dirname, 'static'))) // для пути для статичных файлов (текущая директория, название папки)
app.use(fileUpLoad({})) // регистрация для приема изображений
app.use('/api', router) // путь по которому должны обрабатывать роутер

// послдний middleware это ошибка
app.use(errorHandler) // обязательно должен регестрироваться в самом конце




// app.get('/', (req, res) => {
//     res.status(200).json({message : 'Working true'}) // если без ошибок
//
// })

const start = async () =>  {
    try {
        await sequelize.authenticate() // подключение к БД
        await sequelize.sync() // сверяет состояние БД со схемой данных
        app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()
