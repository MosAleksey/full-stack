import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import ErrorStore from "./contexts/errorStore";
import UserStore from "./contexts/userStore";
import ShopStore from "./contexts/shopStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Context.Provider value={{
            __error: new ErrorStore(),
            __user: new UserStore(),
            __shop: new ShopStore()
        }}>
            <App/>
        </Context.Provider>
    </BrowserRouter>
);

