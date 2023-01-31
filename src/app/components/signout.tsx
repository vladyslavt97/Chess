import { useNavigate } from 'react-router-dom';
import './signout.css'

export function Signout() {
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
            navigate("/");
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }        
    return <div>
                <img src="/signout.png" alt="empty" id="signout" width="30px" onClick={signOut}/>
            </div>
}