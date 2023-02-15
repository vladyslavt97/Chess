import './Welcome.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './registration/Registration';
import Login from './login/Login';
import { useEffect, useState } from 'react';
import Chess from '../chess/Chess';
import { RootState, store } from "../chess/redux/store";
import { initSocket } from "../chess/socket/socket";
import { useDispatch, useSelector } from 'react-redux';
import { userIdState } from '../chess/redux/boardSlice';


export default function Welcome() {
    const dispatch = useDispatch();
    const userIdValue = useSelector((state: RootState) =>state.board.userIdValue);
    console.log('userIdValue: ', userIdValue);
    
    useEffect(() =>{
        fetch('/api/user/id.json')
        .then(res => res.json())
        .then(data => {
            if(data.userId){
                dispatch(userIdState(true))
                initSocket(store);
            }
        })
    })
    console.log('userid', userIdValue);
    
    return <div id="welcome">
            {!userIdValue && <h1 id='chess-with-friends-text'>Chess with friends</h1>}
            
        <div id='login-and-register-divs'>
                <Routes>
                    {!userIdValue && <Route path="/" element={<Registration />}></Route>}
                    {!userIdValue && <Route path="/login" element={<Login />}></Route>}
                    {!userIdValue && <Route path="*" element={<Navigate to="/"/>}/>}
                    {userIdValue && <Route path="/chess" element={<Chess/>}></Route>}
                    {userIdValue && <Route path="/login" element={<Navigate to="/chess"/>}></Route>}
                    {userIdValue && <Route path="/" element={<Navigate to="/chess"/>}></Route>}
                </Routes>
        </div>
    </div>
}

