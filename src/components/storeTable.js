import React, {useContext, useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {store_query} from "./queries/store_query";
import StoreTableBody from "./storeTableBody";

const StoreTable = observer(() => {
    const {__machine} = useContext(Context)
    useEffect(()=>{
        store_query().then(data => __machine.setStore(data))
    }, [])

    const [target, setTarget] =useState({target_id:'', color:''})
    const [changeVisible, setChangeVisible] = useState(false)
    const [createVisible, setCreateVisible] = useState(false)
    const change_element = (element) => {
            setTarget(element)
    }
    return (
        <Container>
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
                {__machine.store_Data.map(element =>
                    <StoreTableBody color={target} ontarget={change_element} fields={element} key={element.id}/>
                )}
                </tbody>
            </Table>
        </Container>
    );
});

export default StoreTable;