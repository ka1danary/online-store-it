import React, {useContext, useState} from "react";
import Container from "react-bootstrap/Container";
import {Card, Button, Form, NavLink, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useHistory, useLocation} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer( ()=> {
    const {user} = useContext(Context)
    let data;
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{

            if(isLogin) {
                data = await login(email, password)
            }
            else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)

        } catch (e) {
        alert(e.response.data.message)
        }
    }


    return (
        <Container className="d-flex justify-content-center align-items-md-center" style={{height : window.innerHeight - 54}}>
            <Card style={{width : 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form.Control
                    className="mt-3"
                    placeholder="Введите email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} // переадем переменную в текущем инпуте
                />
                <Form.Control
                    className="mt-3"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)} // переадем переменную в текущем инпуте
                    type = "password"
                />
                <Row className="d-flex justify-content-between mt-3">
                    {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                        </div>

                    }
                    <Button
                    onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                </Row>


            </Card>


        </Container>
    )

})
export default Auth;