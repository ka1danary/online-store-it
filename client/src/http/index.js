import axios from "axios"
import config from "bootstrap/js/src/util/config";

//запросы без авторизации
const $host = axios.create({
    baseURL : process.env.REACT_APP_API_URL
})

//запросы с авторизацией
const $authHost = axios.create({
    baseURL : process.env.REACT_APP_API_URL
})

//интерцептор
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}