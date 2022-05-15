import React from 'react';

const StoreTableBody = ({fields, color, ontarget}) => {
    const fettle = (fettle) => {
        if (fettle === 1)
            return 'Новая'
        if (fettle === 2)
            return 'Б/У'
    }

    const element_ontarget = (intarget) => {
        if (String(intarget) === color.target_id)
            return color.color
        else
            return ''
    }

    return (
        <tr style={{backgroundColor:`${element_ontarget(fields.id)}`}} onClick={(e) => {ontarget({target_id:`${fields.id}`, color:'#cc8d13'})}}>
            <th style={{textAlign: 'center'}}>{fields.m_title}</th>
            <th style={{fontWeight:'400'}}>{fields.title}</th>
            <th style={{textAlign: 'center', ontWeight:'400'}}>{fettle(fields.fettle)}</th>
            <th>{fields.availability}</th>
        </tr>
    );
};

export default StoreTableBody;