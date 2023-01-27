import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

//socket
import { initSocket } from "./socket/socket";

//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";


initSocket(store); 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(<Provider store={store}>
        <App />
    </Provider>
)