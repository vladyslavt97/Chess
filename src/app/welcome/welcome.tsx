import './Welcome.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './registration/Registration';
import Login from './login/Login';
import { useEffect, useState } from 'react';
import Chess from '../chess/Chess';
import { store } from "../chess/redux/store";
import { initSocket } from "../chess/socket/socket";


export default function Welcome() {
    const [userId, setUserId] = useState<boolean>(false);
    useEffect(() =>{
        fetch('/api/user/id.json')
        .then(res => res.json())
        .then(data => {
            if (data.userId) {
                initSocket(store);
                setUserId(true)
            } else {
                
            }
        })
    })

    return <div id="welcome">
            <h1 id='chess-with-friends-text'>Chess with friends</h1>
            
            <div id='login-and-register-divs'>
                    <Routes>
                        {!userId && <Route path="/" element={<Registration />}></Route>}
                        {!userId && <Route path="/login" element={<Login />}></Route>}
                        {userId && <Route path="/chess" element={<Chess />}></Route>}
                    </Routes>
            </div>
        </div>
}

