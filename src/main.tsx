import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // root.render(<Provider store={store}>
  //                   <App />
  //               </Provider>
  // );
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
