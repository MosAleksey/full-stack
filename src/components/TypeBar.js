import React, {useState} from 'react';
import {Button, ListGroup} from "react-bootstrap";
import {type} from "@testing-library/user-event/dist/type";

const TypeBar = ({props, filter}) => {

    const [resType, setResType] = useState([])
    // console.log(resType.id)
    const resetfilter = () => {
        setResType([])
        filter(null)
    }

    return (
        <div>
        <ListGroup style={{marginTop:'20px'}}>
            {props.map(type =>
            <ListGroup.Item
                active={type.id === resType.id}
                style={{cursor:'pointer'}}
                key={type.id}
                onClick={(e) => {setResType(type); filter(type.type_id)}}
            >
                {type.t_name}
            </ListGroup.Item>
            )}
        </ListGroup>
            <Button className="mt-2" variant="outline-danger" onClick={resetfilter}>
                Сбросить фильтр
            </Button>
        </div>
    );
};

export default TypeBar;