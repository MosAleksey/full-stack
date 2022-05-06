import React, {useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {machine__Info__query} from "../queries/machine__info_query";
import {shop_query} from "../queries/shop_query";

const CreateError = ({err_list, show, onHide}) => {
    const [dropInv, setDropInv] = useState('Выберите оборудование | Инвентарный номер')
    const [dropSP, setDropSP] = useState('Выберите цех | Цех №')
    const [machineId, setMachineId] = useState()
    const [getSp, setGetSp] = useState([])
    const [shopId, setShopId] = useState()

    const get_machine_compare = (inv_number) => {
        machine__Info__query(inv_number).then(data => {
            console.log(data.id);
            setMachineId(data.id);
            console.log(machineId)
        })
    }
    const get_shop_compare = (shopname) => {
        shop_query().then(data => setGetSp(data))

    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить заявку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Dropdown className='mt-4'>
                        <Dropdown.Toggle>{dropInv}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {err_list.map(list =>
                                <Dropdown.Item key={list.id} onClick={() => {
                                    setDropInv(list.inv_number);
                                    get_machine_compare(list.inv_number)
                                }}>{list.inv_number}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-4'>
                        <Dropdown.Toggle>{dropSP}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {err_list.map(list =>
                                <Dropdown.Item key={list.id} onClick={() => {
                                    setDropSP(list.name);
                                    get_shop_compare(list.name)
                                }}>{list.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateError;