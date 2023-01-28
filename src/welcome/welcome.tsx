import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './registration/registration';
import Login from './login/login';


export default function Welcome() {
    return <div id="welcome">
            <h1 id='bookface'>Bookface</h1>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Registration />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
            <div id="maincont">
            <div className='planet-container'>
                <div className='night'></div>
                <div className='day'></div>
                <div className='clouds'></div>
                <div className='inner-shadow'></div>
            </div>
            </div>
        </div>
}

