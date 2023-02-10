import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        console.log('clicked');
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
                console.log("all good. Go to app page->", data);
                navigate('/chess', { replace: true });
                navigate(0);
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
