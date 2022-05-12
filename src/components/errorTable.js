import React, {useContext} from 'react';
import {Container, Table} from "react-bootstrap";
import ErrorTableBody from "./errorTableBody";
import './style/table.css'
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const ErrorTable = observer(() => {
    const {__error} = useContext(Context)

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
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Объяснительная</th>
                </tr>
                </thead>
                <tbody>
                {__error.data_Error.map(element =>
                    <ErrorTableBody fields={element} key={element.id}/>
                )}
                </tbody>
            </Table>
        </Container>
    );
});

export default ErrorTable;