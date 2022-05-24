import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {error__query__update__add} from "../queries/error__query";

const UpdateErrorExplan = ({show, onHide, error_id, status}) => {

    const [expl, setExpl] = useState({explanatory: null})

    const addExplError = () => {
       const formData = new FormData ()
        formData.append('explanatory', expl.explanatory)
        error__query__update__add(error_id, formData).then(()=>status(true))
    }

    const selectFiles = e => {
        setExpl({...expl, explanatory: e.target.files[0]})
    }

    return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить объяснительную записку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="file" onChange={selectFiles}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={()=> {
                        addExplError();
                        onHide()
                    }}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default UpdateErrorExplan;