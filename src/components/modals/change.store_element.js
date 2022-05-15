import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {update__store__query__byid} from "../queries/store_query";

const ChangeStoreElement = observer(({show, onHide, id, context}) => {
    const [updateStore, setUpdateStore] = useState({title:'', fettle:'', availability:''})
    const compare_fettle = (fettle) => {
        if (fettle === 1){
            return 'Новая'
        }

        else{
            return 'Б/У'
        }

    }
    const compare_fettle_text = (fettle) => {
        if(fettle === 'Новая')
            setUpdateStore({...updateStore, fettle: '1'})
        else
            setUpdateStore({...updateStore, fettle: '2'})
    }
    const update_store = () =>{

        const formData = new FormData()
        formData.append('machine_id', `${context.machine_id}`)
        if (updateStore.title === '')
        {
            formData.append('title', `${context.title}`)
        } else
            formData.append('title', `${updateStore.title}`)
        if (updateStore.fettle === '')
        {
            formData.append('fettle', `${context.fettle}`)
        } else
            formData.append('fettle', `${updateStore.fettle}`)
        if (updateStore.availability === '')
        {
            formData.append('availability', `${context.availability}`)
        } else
            formData.append('availability', `${updateStore.availability}`)
        update__store__query__byid(context.id, formData).then(data => onHide())
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
                        Редактирование/удаление
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <Table striped bordered hover style={{marginTop:'20px'}}>
                                <thead>
                                <tr>
                                    <th style={{textAlign:'center'}}>Оборудование</th>
                                    <th style={{textAlign:'center'}}>Наименование</th>
                                    <th style={{textAlign:'center'}}>Состояние</th>
                                    <th style={{textAlign:'center'}}>Наличие</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th style={{textAlign: 'center'}}>{context.m_title}</th>
                                    <th style={{fontWeight:'400'}}><Form.Control defaultValue={context.title} onChange={e=> setUpdateStore({...updateStore, title: e.target.value})}/></th>
                                    <th style={{textAlign: 'center', ontWeight:'400'}}><Form.Control defaultValue={compare_fettle(context.fettle)} onChange={e=> compare_fettle_text(e.target.value)}/></th>
                                    <th style={{fontWeight:'400'}}><Form.Control defaultValue={context.availability} onChange={e=> setUpdateStore({...updateStore, availability: e.target.value})}/></th>
                                </tr>
                                </tbody>
                            </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={()=> update_store()}>Изменить</Button>
                    <Button variant="danger" onClick={()=> console.log(id)}>Удалить</Button>
                    <Button onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default ChangeStoreElement;