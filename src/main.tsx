import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

//socket
import { initSocket } from "./app/socket/socket";

//redux
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import Welcome from './welcome/Welcome';


// initSocket(store); 
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
//   .render(
//   <Provider store={store}>
//         <App />
//     </Provider>
// )
//
const main = document.getElementById('root');
if (main){
    const root = createRoot(main);
    fetch('/api/user/id.json')
        .then(res => res.json())
        .then(data => {
            if (data.userId) {
                //setup the socket NOW!!!
                //once we are signed in - we trigger the connection to the socket
                initSocket(store); //we are calling the function from socket.js to setup the connecting with the socket
                root.render(<Provider store={store}>
                    <App />
                </Provider>
                );
            } else {
                root.render(<Welcome />);
            }
        })
}