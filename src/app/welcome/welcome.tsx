import './Welcome.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './registration/Registration';
import Login from './login/Login';
import { useEffect, useState } from 'react';
import { RootState, store } from "../chess/redux/store";
import { initSocket } from "../chess/socket/socket";
import { useDispatch, useSelector } from 'react-redux';
import { userIdState } from '../chess/redux/boardSlice';
import Gametype from '../gametype/Gametype';
import Chess from '../chess/Chess';
import PlayWithComputer from '../gametype/playwithcomputer/PlayWithComputer';


export default function Welcome() {
    const dispatch = useDispatch();
    const userIdValue = useSelector((state: RootState) =>state.board.userIdValue);
    
    const onlineU = useSelector((state: RootState) => state.messages.onlineUser);
    console.log('onlineU in Welcome: ', onlineU, userIdValue);

    const [fetchRan, setFetchRan] = useState(false);
    useEffect(() =>{
        fetch('/api/user/id.json')
        .then(res => res.json())
        .then(data => {
            if(data.userId){
                dispatch(userIdState(true))
                initSocket(store);
                setFetchRan(true);
            }
        })
    }, []);
    return <div id="welcome">
            {!userIdValue && <h1 id='chess-with-friends-text'>Chess with friends</h1>}

        {fetchRan && 
            <div id='login-and-register-divs'>
                    <Routes>
                        {!userIdValue && <Route path="/" element={<Registration />}></Route>}
                        {!userIdValue && <Route path="/login" element={<Login />}></Route>}
                        {userIdValue && <Route path="/chess" element={<Chess/>}></Route>}
                        {userIdValue && <Route path="/gametype" element={<Gametype/>}></Route>}
                        {userIdValue && <Route path="/login" element={<Navigate to="/gametype"/>}></Route>}
                        {userIdValue && <Route path="/computer" element={<PlayWithComputer/>}></Route>}
                        {!userIdValue && <Route path="*" element={<Navigate to="/"/>}/>}
                        {userIdValue && <Route path="*" element={<Navigate to="/gametype"/>}></Route>}
                    </Routes>
            </div>}   
    </div>
}

