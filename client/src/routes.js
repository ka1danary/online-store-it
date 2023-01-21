// Маршруты во всем приложении
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Admin from './pages/Admin'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import DevicePage from './pages/DevicePage'
// на эти маршруты только авторизованный пользователь может перейти

export const authRoutes = [
    //добавим объект (путь, компонент (сама страница))
    {
        path : ADMIN_ROUTE,
        Component : Admin
    },
    {
        path : BASKET_ROUTE,
        Component : Admin
    },
]

// на эти маршруты может зайти абсолютно любой пользователь
export const publicRoutes = [
    {
        path : SHOP_ROUTE,
        Component : Shop
    },
    {
    path : REGISTRATION_ROUTE,
        Component : Auth
    },
    {
        path : LOGIN_ROUTE,
        Component : Auth
    },
    {
        path : DEVICE_ROUTE + '/:id',
        Component : DevicePage
    },
]