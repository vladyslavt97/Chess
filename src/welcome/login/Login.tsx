import {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (evt: any) => {
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
                console.log("all good. Go to app page..?", data);
                location.replace('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

  return <div>
            <form onSubmit={handleSubmit} id="registration-form">
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
                <button type='submit'>Login</button><br />
                <h3> You might want to <Link to="/" id='login'>Register</Link> first...</h3><br />
            </form>
        </div>
}
