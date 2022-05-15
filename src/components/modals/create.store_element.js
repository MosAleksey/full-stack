import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form, ListGroup, Modal, Row, ToggleButton} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {machine__Info__query} from "../queries/machine__info_query";
import {create__store__query} from "../queries/store_query";

const CreateStoreElement = observer(({show, onHide}) => {
    const {__machine} = useContext(Context)
    const [target, setTarget] = useState({inv_number:'', m_title:''})
    const [radioValue, setRadioValue] = useState('1');
    const [createStoreElement, setCreateStoreElement] = useState({machine_id:'', title:'', availability:''})

    const radios = [
        { name: 'Б/У', value: '2' },
        { name: 'Новая', value: '1' },
    ];

    useEffect(()=>{
        machine__Info__query().then(data => __machine.setMachineInfo(data))
    },[])

    const addStoreElement = () => {
        const formData = new FormData()
        formData.append('machine_id', `${createStoreElement.machine_id}`)
        formData.append('title', `${createStoreElement.title}`)
        formData.append('fettle', `${radioValue}`)
        formData.append('availability', `${createStoreElement.availability}`)
        console.log(formData.get('machine_id'))
        create__store__query(formData).then(data=> onHide())
    }
    return (
        <div>
            <Modal
                onHide={onHide}
                show={show}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавление комплектующих
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col className="col-sm-12">
                                <div className="mb-2">
                                    <Form.Text>Список оборудования</Form.Text>
                                </div>
                                <ListGroup>
                                    {__machine.machine_Info_Data.map(element=>
                                        <ListGroup.Item style={{cursor:'pointer'}} key={element.id}
                                                        onClick={()=> {setTarget({inv_number: element.inv_number, m_title: element.m_title});
                                            setCreateStoreElement({...createStoreElement, machine_id: element.machine_id})}}>{element.inv_number} || {element.m_title}</ListGroup.Item>
                                    )}
                                </ListGroup>
                                <Form.Control className="mt-3" disabled value={`${target.inv_number} || ${target.m_title}`}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-sm-12">
                                <div className="mb-1 mt-3">
                                    <Form.Text>Наименование</Form.Text>
                                </div>
                                <Form.Control onChange={e=> setCreateStoreElement({...createStoreElement, title: e.target.value})} placeholder="Название/параметры/производитель"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-sm-12 mt-3">
                                <div className="mb-1">
                                    <Form.Text>Состояние компонента</Form.Text>
                                </div>
                                <ButtonGroup>
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-sm-12 mt-3">
                                <div className="mb-1">
                                    <Form.Text>Наличие</Form.Text>
                                </div>
                                <Form.Control onChange={e=> setCreateStoreElement({...createStoreElement, availability: e.target.value})} placeholder="Наличие/количество"/>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=> addStoreElement()}>Добавить</Button>
                    <Button onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateStoreElement;