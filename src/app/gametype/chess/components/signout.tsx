import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import './signout.css'
import { userIdState } from '../redux/boardSlice';


export function Signout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        fetch('/api/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('data:', data)
            dispatch(userIdState(false))
            navigate('/');
        })
        .catch(err => {
            console.log('er: ', err);
        });
    }        
    return <div>
        <img src="/signout.png" alt="empty" id="signout" width="30px" onClick={signOut}/>
    </div>
}