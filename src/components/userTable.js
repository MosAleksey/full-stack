import React, {useContext} from 'react';
import {Container, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UserTableBody from "./userTableBody";

const UserTable = observer(() => {
    const {__user} = useContext(Context)
    return (
        <div>
            <Container>
                <Table striped bordered hover style={{marginTop: '20px'}}>
                    <thead>
                    <tr>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Табельный номер</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>ФИО</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>email</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Цех №</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Должность</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {__user.data_User.map(element =>
                        <UserTableBody fields={element} key={element.personal_number}/>
                    )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
});

export default UserTable;