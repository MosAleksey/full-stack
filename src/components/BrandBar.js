import React, {useState} from 'react';
import {Button, ListGroup} from "react-bootstrap";


const BrandBar = ({props}) => {

    const [resBrand, setResBrand] = useState([])

    const resetfilter = () => {
        setResBrand([])
    }
    return (
        <div>
            <ListGroup style={{marginTop: '20px'}}>
                {props.map(brand =>
                    <ListGroup.Item
                        active={brand.id === resBrand.id}
                        style={{cursor: 'pointer'}}
                        key={brand.id}
                        onClick={(e) => setResBrand(brand)}
                    >
                        {brand.b_name}
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Button className="mt-2" variant="outline-danger" onClick={resetfilter}>
                Сбросить фильтр
            </Button>
        </div>
    );
};

export default BrandBar;