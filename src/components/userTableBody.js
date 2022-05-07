import React from 'react';

const UserTableBody = ({fields}) => {

    const status_work = (status_work) => {
        if (!status_work)
            return 'nothing'
    }
    return (
            <tr>
                <td style={{textAlign:'center'}}>{fields.personal_number}</td>
                <td style={{textAlign:'center'}}>{fields.second_name} {fields.first_name}</td>
                <td style={{textAlign:'center'}}>{fields.email}</td>
                <td style={{textAlign:'center'}}>{fields.name}</td>
                <td style={{textAlign:'center'}}>{fields.function_title}</td>
                <td style={{textAlign:'center'}}>{status_work()}</td>
            </tr>
    );
};

export default UserTableBody;