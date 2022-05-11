import React, {useContext, useEffect} from 'react';
import {Button, ListGroup, ListGroupItem, Modal, Table} from "react-bootstrap";
import {Context} from "../../index";
import {machine__Info__query} from "../queries/machine__info_query";

const CreateErrorInvNumber = ({getinv, show, onHide}) => {
    const {__machine} = useContext(Context)

    useEffect(() => {
        machine__Info__query().then(data => __machine.setMachineInfo(data))
    })
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
                        Список оборудования
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {__machine._machine_Info_Data.map(element =>
                            <ListGroupItem style={{cursor: "pointer"}} key={element.id}
                                           onClick={() => {getinv(element.machine_id, `${element.inv_number} (${element.m_title})`, element.name, element.users_work); onHide()}}
                            >{element.inv_number} || {element.m_title}</ListGroupItem>
                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateErrorInvNumber;