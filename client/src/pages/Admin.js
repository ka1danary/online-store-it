import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button} from "@mui/material";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import CreateBrands from "../components/modals/CreateBrands";


const Admin = () => {
    const [BrandVisible, setBrandVisible] = useState(false)
    const [TypeVisible, setTypeVisible] = useState(false)
    const [DeviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant="light"
                    className="mt-4"
                    onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button variant="light"
                    className="mt-4"
                    onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant="light"
                className="mt-4"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateType show={TypeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrands show={BrandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={DeviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;