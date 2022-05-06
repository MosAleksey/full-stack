import React, {useState} from 'react';
import './style/table.css';
import {useNavigate} from 'react-router-dom';



const MachineTableBody = (props) => {

    const navigate = useNavigate()
    return (

        <tr
            className='machineRow'
            style={{cursor:'pointer'}}
            onClick={() => navigate(`/machines/${props.fields.inv_number}`)}
        >
            <td style={{textAlign:'center'}}>{props.fields.inv_number}</td>
            <td style={{textAlign:'center'}}>{props.fields.t_name}</td>
            <td style={{textAlign:'center'}}>{props.fields.b_name}</td>
            <td style={{textAlign:'center'}}>@mdo</td>
            <td style={{textAlign:'center'}}>@mdo</td>
        </tr>

    );
};

export default MachineTableBody;