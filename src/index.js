import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import ErrorStore from "./contexts/errorStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Context.Provider value={{
            __error: new ErrorStore()
        }}>
            <App/>
        </Context.Provider>
    </BrowserRouter>
);

