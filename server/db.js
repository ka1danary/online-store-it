//конфигурация для подключения к БД
const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, //название бд
    process.env.DB_USER, //имя пользоватля, под которым мы подключаемся
    process.env.DB_PASSWORD, //пароль
    {
        dialect : 'postgres',
        host : process.env.DB_HOST,
        port : process.env.DB_PORT
    }
)

