import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {user_query} from "../components/queries/user_query";
import UserTable from "../components/userTable";
import CreateUser from "../components/modals/create.user";


const UserPage = observer(() => {
    const {__user} = useContext(Context)

    const [shopVisible, setShopVisible] = useState(false)
    useEffect(()=>{
        user_query().then(data => __user.setUser(data))
    }, [])

    return (
        <div>
            <NavBar/>
            <Container>
                <Row>
                    <Col className='col-lg-12'>
                        <UserTable />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-md-4'>
                        <h6
                            onClick={() => setShopVisible(true)}
                            style={{marginLeft: '2rem', cursor: 'pointer'}}
                        >| Добавить добавить нового сотрудника -></h6>
                    </Col>
                </Row>
                <CreateUser show={shopVisible} onHide={() => setShopVisible(false)}/>
            </Container>
        </div>
    );
});

export default UserPage;