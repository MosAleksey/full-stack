import React from 'react';
import {Container, Table} from "react-bootstrap";
import ErrorTableBody from "./errorTableBody";
import './style/table.css'

const ErrorTable = ({props}) => {
    return (
        <Container>
            <Table striped bordered hover style={{marginTop: '20px'}} className='errTable'>
                <thead>
                <tr>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Номер заявки</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Заголовок</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Инвентарный номер</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Оборудование</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Цех №</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Описание</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Дата</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Статус</th>
                </tr>
                </thead>
                <tbody>
                {props.map(fields =>
                    <ErrorTableBody fields={fields} key={fields.id}/>
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default ErrorTable;