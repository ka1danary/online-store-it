// логика навигации по страницам
import React, {useContext} from 'react';
import {
    BrowserRouter as Router, Redirect,
    Route,
    Switch
} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context) // заглушка, показываающая, авторизован пользователь или нет
    console.log(user)
    return (

            <Switch>
                {user.isAuth === true && authRoutes.map(({path, Component}) => // через дискрукртуризацию вытаскиваем из объекта путь и компонент
                    <Route key={path} path={path} component={Component} exact/> // ключ exact говорит о том, что путь должен точно совпадать, ключ укажем как путь (тк каждый путь инакальный)
                )}

                {publicRoutes.map(({path, Component}) => // через диструкртуризацию вытаскиваем из объекта путь и компонент
                    <Route key={path} path={path} component={Component} exact/> // ключ exact говорит о том, что путь должен точно совпадать, ключ укажем как путь
                )}
                <Redirect to={SHOP_ROUTE}/>

            </Switch>
    );
};

export default AppRouter;