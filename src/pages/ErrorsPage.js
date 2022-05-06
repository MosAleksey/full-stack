import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Col, Container, Row} from "react-bootstrap";
import {error__query} from "../components/queries/error__query";
import ErrorTable from "../components/errorTable";
import CreateError from "../components/modals/create.error";

const ErrorsPage = () => {

    const [error, setError] = useState([])
    const [createErrorVisible, setCreateErrorVisible] = useState(false)

    function get__errors() {
        error__query().then(error_obj => setError(error_obj))
    }

    useEffect(() => {
        get__errors()
    }, [])

    return (
        <div>
            <NavBar/>
            <Container>
                <Row>
                    <Col className='col-lg-12'>
                        <ErrorTable props={error}/>
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
                <CreateError err_list={error} show={createErrorVisible} onHide={() => setCreateErrorVisible(false)}/>
            </Container>
        </div>
    );
};

export default ErrorsPage;