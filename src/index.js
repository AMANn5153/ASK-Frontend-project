import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === "production") disableReactDevTools()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
        <App />
    </Provider>
);

