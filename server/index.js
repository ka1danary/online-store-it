require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHendlingMiddleware')
const fileUpLoad = require('express-fileupload')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpLoad({}))
app.use('/api', router)


app.use(errorHandler)




// app.get('/', (req, res) => {
//     res.status(200).json({message : 'Working true'}) // если без ошибок
//
// })

const start = async () =>  {
    try {
        await sequelize.authenticate() // подключение к БД
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()
