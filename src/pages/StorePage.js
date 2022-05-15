import React, {useEffect} from 'react';
import NavBarStore from "../components/NavBarStore";
import {Button, Col, Container, Row} from "react-bootstrap";
import StoreTable from "../components/storeTable";
import {useState} from "react";
import ChangeStore_element from "../components/modals/change.store_element";
import {store__query__byid} from "../components/queries/store_query";

const StorePage = () => {
    const [changeVisible, setChangeVisible] = useState(false)
    const [createVisible, setCreateVisible] = useState(false)
    const [target, setTarger] = useState('')
    const [targetContext, setTargetContext] = useState([])

    useEffect(()=>{
        store__query__byid(target).then(data=> setTargetContext(data))
    },[target])

    const change_target = (target) => {
        setTarger(target)
    }

    return (
        <div>
            <NavBarStore />
            <Container>
                <Row>
                    <Col className="col-lg-12">
                        <StoreTable update={changeVisible} inTarget={change_target}/>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-lg-12 d-flex justify-content-end'>
                        <Button variant="warning"
                                style={{marginRight:'10px'}}
                                onClick={()=> {setChangeVisible(true);

                                }}
                        >Изменить выбраный</Button>
                        <Button variant="success" style={{marginRight:'30px'}}>Добавить</Button>
                    </Col>
                </Row>
            </Container>
            <ChangeStore_element context={targetContext} id={target} show={changeVisible} onHide={()=> setChangeVisible(false)}/>
        </div>
    );
};

export default StorePage;