import React, {useContext, useEffect} from 'react';
import NavBar from "../components/NavBar";
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {error__query} from "../components/queries/error__query";

const AboutPage = observer(() => {
    const {__error} = useContext(Context)

    useEffect(()=>{
        error__query().then(data => __error.setError(data))
    },[])

    return (
        <div>
            <NavBar/>
            <Container>
                {__error.data_Error.map(res=>
                    <div>{res.title}</div>
                )}
            </Container>
        </div>
    );
});

export default AboutPage;