import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/ConfigureStore';
import reportWebVitals from './reportWebVitals';

import App from './App.jsx';
import ConfigureStore from "./redux/ConfigureStore";

const ProviderComponent = () => {
    const store = ConfigureStore();
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <ProviderComponent/>
    </React.StrictMode>,
    document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
