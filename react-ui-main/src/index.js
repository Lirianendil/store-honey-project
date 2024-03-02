import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {Provider} from "react-redux";
import store from './store';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
