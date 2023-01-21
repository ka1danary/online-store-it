// mobx
import {makeAutoObservable} from "mobx";

export default class UserStore { // mobx будет следить за изменением этих переменных и при применении компоненты будут перерендериваться
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    // вызываются только в том случае, если состояние было изменено
    get isAuth() { // геттеры для получения переменных из нашего состояния
        return this._isAuth
    }
    get user() {
        return this._user
    }
}