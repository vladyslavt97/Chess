import { useState} from 'react';
// import { Validation } from '../components/validation';
import { Link } from 'react-router-dom';

export default function Registration() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (evt: any) => {
      evt.preventDefault();
        fetch('/registration/', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({firstname: firstname, lastname: lastname, email: email, password: password }),
        })
          .then((response) => 
            response.json())
          .then((data) => {
            console.log("success: ", data, 'and show ErrorNOT!!');
            if(data.validation === true){
                console.log('generate the error. Validation failed!');
                // setState({validation: true});
            } else {
                console.log("Should go to the Login page");
                location.replace('/login');
            }
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
          <button>Register</button>
        <h3> Already Registered? Then <Link to="/login">LOGIN</Link></h3>
      </form>
  </div>
  )
}
