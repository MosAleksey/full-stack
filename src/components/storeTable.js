import React, {useContext, useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {store__query} from "./queries/store_query";
import StoreTableBody from "./storeTableBody";

const StoreTable = observer(({inTarget, update}) => {
    const {__machine} = useContext(Context)
    useEffect(()=>{
        store__query().then(data => __machine.setStore(data))
    }, [update])

    const [target, setTarget] =useState({target_id:'', color:''})
    const change_element = (element) => {
            setTarget(element)
            inTarget(element.target_id)
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