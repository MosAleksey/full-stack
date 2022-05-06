import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import DataBase_context from "./context";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <DataBase_context.Provider value={}>
            <App/>
        </DataBase_context.Provider>
    </BrowserRouter>
);

