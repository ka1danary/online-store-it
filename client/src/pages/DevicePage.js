import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import bigStar from '../assets/star.png'
import {Button, Card} from "@mui/material";

const DevicePage = () => {
    const device = {id : 1, name : 'Iphone 1', price : 25000, rating : 5, img : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsoftech.kg%2Fsmartfon-apple-iphone-13-pro-max-1024gb&psig=AOvVaw0bur1jMNbIMgeW06ihF54t&ust=1672163182945000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKj0rbXrl_wCFQAAAAAdAAAAABAI'}
    const description = [
        {id: 1, title : 'Оперативная память', description: '5гб'},
        {id: 2, title : 'Камера', description: '12мп'},
        {id: 3, title : 'Процессор', description: 'Intel Core i7'},
        {id: 4, title : 'Видеокарта', description: 'rtx 3080'}
    ]
    return (

        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img}/>
                </Col>

                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div className="d-flex align-items-center justify-content-center"
                             style = {{background : `url(${bigStar}) no-repeat center center`, width:100, height : 100, backgroundSize:"cover", fontSize:30}}
                        >
                            {device.rating}
                        </div>
                    </Row>

                </Col>

                <Col md={4}>
                    <Card
                    className="d-flex flex-column align-items-md-center justify-content-around"
                    style={{width:300, height:300, fontSize : 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price}</h3>
                        <Button class="btn btn-secondary">Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-2"}>
                <h1>Характеристики</h1>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background:index % 2 === 0 ? 'lightgray' : 'transparent', padding:10}}>
                        {info.title} : {info.description}
                    </Row>
                    )}
            </Row>
        </Container>
    );
};

export default DevicePage;