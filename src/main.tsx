import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './app/App'
import './index.css'

//socket
import { initSocket } from "./app/socket/socket";

//redux
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/redux/store";
import Welcome from './welcome/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const main = document.getElementById('root');
if (main){
    const root = createRoot(main);
    fetch('/api/user/id.json')
        .then(res => res.json())
        .then(data => {
            if (data.userId) {
                initSocket(store);
                root.render(<Provider store={store}>
                    <BrowserRouter>
                        <Routes>   
                            <Route path="/" element= {<App />}/>
                        </Routes>
                    </BrowserRouter>
                </Provider>
                );
            } else {
                root.render(<Welcome />);
            }
        })
}