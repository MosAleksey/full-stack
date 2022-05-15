import React from 'react';
import NavBarMain from "../components/NavBarMain";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../components/style/mainPage.css'

const MainPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <NavBarMain />
            <Container>
                <Row>
                    <Col className="col-lg-12 mt-3">
                        <div onClick={()=> navigate('/errors')} className="shadow-div d-flex justify-content-center" style={{border: "2px solid black", borderRadius: "10px", padding: '20px'}}>
                            <h2>Сервисный отдел</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-lg-12 mt-3">
                        <div onClick={()=> navigate('/store')} className="shadow-div d-flex justify-content-center" style={{border: "2px solid black", borderRadius: "10px", padding: '20px'}}>
                            <h2>Склад комплектующих</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;