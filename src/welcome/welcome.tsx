import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './registration/Registration';
import Login from './login/Login';


export default function Welcome() {
    return <div id="welcome">
            <h1 id='bookface'>Chess with friends</h1>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Registration />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
}

