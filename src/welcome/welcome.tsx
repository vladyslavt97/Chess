import './Welcome.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './registration/Registration';
import Login from './login/Login';


export default function Welcome() {
    return <div id="welcome">
            <h1 id='chess-with-friends-text'>Chess with friends</h1>
            <div id='login-and-register-divs'>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Registration />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
}

