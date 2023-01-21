import {Col, Dropdown, Form, Modal, Row, Button} from "react-bootstrap";
import {Context} from "../../index";
import {useContext, useState} from "react";


const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context)
    const {info, setInfo} = useState([]) //массив характеристик

    const addInfo = () => { //...info - разворот старого массива + добавление новых полей
        setInfo([...info, {title : '', description: '', number : Date.now()}])
    }
    //функция удаления характеристик
    const removeInfo = (number) => { //...info - разворот старого массива + добавление новых полей
        setInfo(info.filter(i => i.number !== number))
    }
    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-4">
                        <Dropdown.Toggle>
                            Выберите тип
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-4">
                        <Dropdown.Toggle>
                            Выберите бренд
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название устройства">
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        type="number"
                        placeholder="Введите цену устройства">
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        >
                    </Form.Control>
                    <hr/>
                    <Button
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {
                        info.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите название характеристик"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание характеристик"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        onClick={() => removeInfo(i.number)}
                                    >Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
        );
        };
export default CreateDevice;