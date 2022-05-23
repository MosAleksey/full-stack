import React from 'react';
import {Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const StatisticTable = ({errors_archive}) => {
    const navigate = useNavigate()

    return (

        <Table striped bordered hover className='mt-3'>
            <thead>
            <tr>
                <th>Номер заявки</th>
                <th>Заголовок</th>
                <th>Инвентарный номер</th>
                <th>Оборудование</th>
                <th>Цех №</th>
                <th>Описание</th>
                <th>Дата подачи заявки</th>
            </tr>
            </thead>
            <tbody>
            {errors_archive.map(element =>
                <tr key = {element.id}
                    onClick={() => navigate(`/errors/${element.id}`)}
                    style={{backgroundColor:'#289a56', cursor:'pointer'}}
                >
                    <td>{element.id}</td>
                    <td>{element.title}</td>
                    <td>{element.inv_number}</td>
                    <td>{element.m_title}</td>
                    <td>{element.name}</td>
                    <td>{element.description}</td>
                    <td>{(String(element.date).slice(0, -14))}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default StatisticTable;