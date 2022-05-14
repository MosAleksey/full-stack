import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

const ErrorTableBody = ({fields}) => {

    const status_color = () => {
        let color = ''
        if (fields.status == 1)
            color = '#D53838'
        if (fields.status == 3)
            color = '#FFD966'
        if (fields.status == 4)
            color = '#289a56'
        if (fields.status == 2)
            color = '#66ddff'
        return color
    }
    const status_value = (value) => {
        if (value == '1')
            return 'Новая'
        if (value == '2')
            return 'Осмотрено'
        if (value == '3')
            return 'В работе'
        if (value == '4')
            return 'Завершено'
    }

    const status_display = () => {
        let display = ''
        if (!fields.explanatory)
            display = 'none'
        return display
    }

    const navigate = useNavigate()

    return (
        <tr onClick={() => navigate(`/errors/${fields.id}`)}>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{fields.id}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{fields.title}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{fields.inv_number}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{fields.m_title}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{fields.name}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{fields.description}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{(String(fields.date).slice(0, -14))}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: `${status_color()}`
            }}>{status_value(fields.status)}</td>
            <td style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                // backgroundColor: `${status_color()}`
            }}><FontAwesomeIcon style={{color:'green', display: `${status_display()}`, cursor: 'pointer'}} icon={faCircleCheck} /></td>
        </tr>
    );
};

export default ErrorTableBody;



