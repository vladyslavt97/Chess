import { useState} from 'react';
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Registration() {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      console.log('whats the issue');
      
        fetch('/api/registration', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({firstname: firstname, lastname: lastname, email: email, password: password }),
        })
          .then((response) => 
            response.json())
          .then((data) => {
            console.log('hm', data);
            navigate('/login');
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }
  return (
    <div>
      <form onSubmit={handleSubmit} id="registration-form">
          <div>
              <span>Firstname: </span>
              <input name="firstname" 
              onChange={e => setFirstname(e.target.value)} 
              />
              <b className='mandatory-field'>*</b>
          </div>
          <div>
              <span>Lastname: </span>
              <input name="lastname" 
              onChange={e => setLastname(e.target.value)} 
              />
              <b className='mandatory-field'>*</b>
          </div>
          <div>
              <span>Email: </span>
              <input name="email" 
              onChange={e => setEmail(e.target.value)} 
              />
              <b className='mandatory-field'>*</b>
          </div>
          <div>
              <span>Password: </span>
              <input type="password" name="password" 
              onChange={e => setPassword(e.target.value)} 
              />
              <b className='mandatory-field'>*</b>
          </div>
          <button id='register-btn'>Register</button>
        <h3> Already Registered? Then <Link to="/login">LOGIN</Link></h3>
      </form>
  </div>
  )
}
