import React, {useContext, useEffect} from 'react';
import NavBar from "../components/NavBar";
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {user_query} from "../components/queries/user_query";
import UserTable from "../components/userTable";

const UserPage = observer(() => {
    const {__user} = useContext(Context)

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
            </Container>
        </div>
    );
});

export default UserPage;