import React, {useState} from 'react';
import {Container, Table} from "react-bootstrap";
import MachineTableBody from "./machineTableBody";

const MachineTable = ({props}) => {

    return (
        <Container>
        <Table striped bordered hover style={{marginTop:'20px'}}>
            <thead>
            <tr>
                <th style={{textAlign:'center'}}>Инвентарный номер</th>
                <th style={{textAlign:'center'}}>Тип оборудования</th>
                <th style={{textAlign:'center'}}>Производитель</th>
                <th style={{textAlign:'center'}}>Модель</th>
                <th style={{textAlign:'center'}}>Год ввода в эксплуатацию</th>
            </tr>
            </thead>
            <tbody>
            {props.map(fields =>
            <MachineTableBody fields={fields} key={fields.id}/>
            )}
            </tbody>
        </Table>
        </Container>
    );
};

export default MachineTable;