import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { userIdState } from '../../gametype/chess/redux/boardSlice';


export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        fetch('/api/login/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((response) => 
                response.json())
            .then((data) => {
                dispatch(userIdState(true))
                navigate('/gametype');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

  return <div>
            <form onSubmit={handleSubmit} id="login-form">
                <div>
                    <span>Email: </span>
                    <input name="email" onChange={e => setEmail(e.target.value)}/>
                    <b className='mandatory-field'>*</b>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    <b className='mandatory-field'>*</b>
                </div>
                <button type='submit' id='login-btn'>Login</button><br />
                <h3> You might want to <Link to="/">Register</Link> first...</h3>
            </form>
        </div>
}
