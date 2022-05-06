import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Col, Container, Row} from "react-bootstrap";
import {error__query} from "../components/queries/error__query";
import ErrorTable from "../components/errorTable";
import CreateError from "../components/modals/create.error";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const ErrorsPage = observer(() => {
    const {__error} = useContext(Context)
    const [createErrorVisible, setCreateErrorVisible] = useState(false)

    useEffect(() => {
        error__query().then(data => __error.setError(data))
    },[])

    return (
        <div>
            <NavBar/>
            <Container>
                <Row>
                    <Col className='col-lg-12'>
                        <ErrorTable />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-md-4'>
                        <h6
                            style={{marginLeft: '2rem', cursor: 'pointer'}}
                            onClick={() => setCreateErrorVisible(true)}
                        >| Добавить заявку -></h6>
                    </Col>
                </Row>
                {/*<CreateError err_list={__error} show={createErrorVisible} onHide={() => setCreateErrorVisible(false)}/>*/}
            </Container>
        </div>
    );
});

export default ErrorsPage;