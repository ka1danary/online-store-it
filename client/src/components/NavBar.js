import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    // в зависимости от того, авторизован пользователь или нет, меню будет разное
    const {user} = useContext(Context)
    const history = useHistory()
    return (
        <Container>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{background:'white'}} >
                <div className="container-fluid">
                    <NavLink to={SHOP_ROUTE}  style={{color:'black', textDecoration: 'none'}}>Shop</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {user.isAuth ?
                            <div className="navbar-nav">
                                <Button variant={"btn btn-light"} className="ml-4"
                                        onClick={() => history.push(ADMIN_ROUTE)}>
                                    Админ панель
                                </Button>
                                <Button variant={"btn btn-light"} className="ml-4"
                                        onClick={() => history.push(LOGIN_ROUTE)}>
                                    Выйти
                                </Button>
                            </div>
                            :
                            <div className="navbar-nav">
                                <Button variant={"btn btn-light"} className="ml-4" onClick={ () => user.setIsAuth(true)}>Admin</Button>
                                <Button variant={"btn btn-light"} className="ml-4">Sign in</Button>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </Container>

    );
});

export default NavBar;