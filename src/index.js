import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CategoryContextProvider from "./Context/Category/CategoryContextProvider";
import UserContextProvider from './Context/User/UserContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserContextProvider>
            <CategoryContextProvider>
                    <App /> 
            </CategoryContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);

